// Supabase Edge Function: ADS-B Flight Data Fetcher
// Fetches live flight data from OpenSky Network

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { bounds } = await req.json();
    
    // OpenSky Network API (free, no auth required for basic)
    const url = `https://opensky-network.org/api/states/all?` +
      `lamin=${bounds.minLat}&lamax=${bounds.maxLat}&` +
      `lomin=${bounds.minLon}&lomax=${bounds.maxLon}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenSky API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform OpenSky format to our format
    // OpenSky states: [icao24, callsign, origin_country, time_position, time_velocity, 
    //                  longitude, latitude, altitude, on_ground, velocity, heading, ...]
    const flights = (data.states || []).map(state => ({
      icao24: state[0],
      callsign: state[1]?.trim() || 'N/A',
      origin_country: state[2],
      longitude: state[5],
      latitude: state[6],
      altitude: state[7] ? Math.round(state[7]) : null,
      velocity: state[9] ? Math.round(state[9] * 1.852) : null, // Convert knots to km/h
      heading: state[10] ? Math.round(state[10]) : null,
      on_ground: state[8],
      type: guessAircraftType(state[1]?.trim(), state[7])
    })).filter(f => f.latitude && f.longitude); // Only valid positions
    
    return new Response(
      JSON.stringify({ flights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function guessAircraftType(callsign, altitude) {
  if (!callsign) return 'Unknown';
  
  // Military indicators
  if (callsign.startsWith('RCH') || callsign.startsWith('C')) return 'Military Transport';
  if (callsign.startsWith('HOOK') || callsign.startsWith('SENTRY')) return 'Military Surveillance';
  if (callsign.startsWith('VIP')) return 'Government';
  
  // Commercial
  if (callsign.match(/^[A-Z]{3}/)) return 'Commercial';
  
  // General aviation
  if (altitude && altitude < 5000) return 'General Aviation';
  
  return 'Unknown';
}

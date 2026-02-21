// Supabase Client Configuration
// Real-time database for AIWARSCANNER

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lcoqrkpdrymeogiruxsi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjb3Fya3BkcnltZW9naXJ1eHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODk0NDIsImV4cCI6MjA4NTc2NTQ0Mn0.iUZ82nflWwiJ_oP8tpT3zZNSY3td8TBOi-aALFZczcs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Schema (to be created in Supabase):
/*

-- News Table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  source TEXT NOT NULL,
  category TEXT CHECK (category IN ('military', 'diplomacy', 'analysis', 'intelligence', 'general')),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Military Assets Table
CREATE TABLE military_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  country TEXT NOT NULL,
  lat DECIMAL(10, 6),
  lon DECIMAL(10, 6),
  status TEXT,
  details TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight Tracking Table (ADS-B)
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  callsign TEXT,
  icao24 TEXT,
  lat DECIMAL(10, 6),
  lon DECIMAL(10, 6),
  altitude INTEGER,
  velocity DECIMAL(10, 2),
  heading INTEGER,
  aircraft_type TEXT,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime
ALTER TABLE news REPLICA IDENTITY FULL;
ALTER TABLE military_assets REPLICA IDENTITY FULL;
ALTER TABLE flights REPLICA IDENTITY FULL;

-- Create realtime publication
CREATE PUBLICATION supabase_realtime FOR TABLE news, military_assets, flights;

*/

// News Functions
export async function fetchNewsFromSupabase(limit = 20) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching news:', error);
    return null;
  }
  
  return data?.map(item => ({
    title: item.title,
    url: item.url,
    source: item.source,
    category: item.category,
    time: timeAgo(item.published_at),
    publishedAt: item.published_at
  })) || null;
}

// Subscribe to real-time news
export function subscribeToNews(callback) {
  return supabase
    .channel('news-changes')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'news' },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}

// Military Assets Functions
export async function fetchAssetsFromSupabase() {
  const { data, error } = await supabase
    .from('military_assets')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching assets:', error);
    return null;
  }
  
  return data;
}

// Flight Tracking Functions
export async function fetchActiveFlights(bounds = null) {
  let query = supabase
    .from('flights')
    .select('*')
    .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // Last 5 minutes
  
  if (bounds) {
    query = query
      .gte('lat', bounds.minLat)
      .lte('lat', bounds.maxLat)
      .gte('lon', bounds.minLon)
      .lte('lon', bounds.maxLon);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching flights:', error);
    return null;
  }
  
  return data;
}

// Insert news (for RSS aggregator)
export async function insertNews(newsItems) {
  const { data, error } = await supabase
    .from('news')
    .upsert(newsItems, { 
      onConflict: 'url',
      ignoreDuplicates: true 
    });
  
  if (error) {
    console.error('Error inserting news:', error);
    return false;
  }
  
  return true;
}

// Insert/update flight data
export async function updateFlightData(flights) {
  const { error } = await supabase
    .from('flights')
    .upsert(flights, { 
      onConflict: 'icao24',
      ignoreDuplicates: false 
    });
  
  if (error) {
    console.error('Error updating flights:', error);
    return false;
  }
  
  return true;
}

// Helper function
function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// RSS Aggregator Function (runs every 5 minutes)
export async function runRSSAggregator() {
  const RSS_FEEDS = [
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { name: 'Reuters', url: 'https://www.reutersagency.com/feed/?taxonomy=markets' },
    { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
  ];
  
  const KEYWORDS = ['iran', 'us', 'military', 'strike', 'war', 'nuclear', 'hormuz'];
  
  for (const feed of RSS_FEEDS) {
    try {
      // Fetch via Supabase Edge Function (bypasses CORS)
      const { data, error } = await supabase.functions.invoke('rss-fetch', {
        body: { url: feed.url }
      });
      
      if (error || !data) continue;
      
      // Filter relevant news
      const relevant = data.items.filter(item => {
        const text = (item.title + ' ' + item.description).toLowerCase();
        return KEYWORDS.some(k => text.includes(k));
      });
      
      // Insert to database
      await insertNews(relevant.map(item => ({
        title: item.title,
        url: item.link,
        source: feed.name,
        category: categorize(item),
        published_at: new Date(item.pubDate).toISOString()
      })));
      
    } catch (err) {
      console.error(`Failed to process ${feed.name}:`, err);
    }
  }
}

function categorize(item) {
  const text = (item.title + ' ' + item.description).toLowerCase();
  if (text.includes('military') || text.includes('strike')) return 'military';
  if (text.includes('diplomatic') || text.includes('deal')) return 'diplomacy';
  if (text.includes('analysis')) return 'analysis';
  return 'general';
}

// ADS-B Flight Data Aggregator
export async function fetchADSBData() {
  // Fetch from ADS-B Exchange or OpenSky
  const BOUNDS = {
    minLat: 10,
    maxLat: 42,
    minLon: 25,
    maxLon: 75
  };
  
  try {
    // Using Supabase Edge Function to fetch ADS-B data
    const { data, error } = await supabase.functions.invoke('adsb-fetch', {
      body: { bounds: BOUNDS }
    });
    
    if (error || !data) return false;
    
    // Update flight data
    await updateFlightData(data.map(flight => ({
      callsign: flight.callsign?.trim(),
      icao24: flight.icao24,
      lat: flight.latitude,
      lon: flight.longitude,
      altitude: flight.altitude,
      velocity: flight.velocity,
      heading: flight.heading,
      aircraft_type: flight.type,
      last_seen: new Date().toISOString()
    })));
    
    return true;
  } catch (err) {
    console.error('ADSB fetch failed:', err);
    return false;
  }
}

export default supabase;

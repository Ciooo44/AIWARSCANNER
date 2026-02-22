import { useEffect, useRef, useState } from 'react';

// OpenSky Network API - Free, no key required
const OPENSKY_API_URL = 'https://opensky-network.org/api/states/all';

export default function LiveFlightRadar() {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flights, setFlights] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  // Load Leaflet
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || leafletMap.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [28.5, 52.0],
      zoom: 6,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: true,
    });

    leafletMap.current = map;

    // Dark theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, [isLoaded]);

  // Fetch flights from OpenSky Network
  useEffect(() => {
    if (!isLoaded) return;

    const fetchFlights = async () => {
      try {
        // Bounding box for Middle East theater
        // lamin, lamax, lomin, lomax
        const url = `${OPENSKY_API_URL}?lamin=10&lamax=42&lomin=25&lomax=75`;
        
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`OpenSky API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Transform OpenSky data format
        // states: [icao24, callsign, origin_country, time_position, time_velocity, 
        //          longitude, latitude, altitude, on_ground, velocity, heading, ...]
        if (data && data.states) {
          const processedFlights = data.states
            .filter(state => state[6] && state[5]) // Has lat/lon
            .map(state => {
              const callsign = (state[1] || '').trim();
              const country = state[2] || '';
              const lat = state[6];
              const lon = state[5];
              const altitude = state[7]; // meters
              const velocity = state[9]; // m/s
              const heading = state[10];
              const onGround = state[8];
              
              // Detect military flights
              const isMilitary = detectMilitary(callsign, country);
              
              return {
                icao24: state[0],
                callsign: callsign || 'Unknown',
                country: country,
                lat: lat,
                lon: lon,
                altitude: altitude ? Math.round(altitude * 3.28084) : null, // Convert to feet
                velocity: velocity ? Math.round(velocity * 3.6) : null, // Convert to km/h
                heading: heading ? Math.round(heading) : null,
                onGround: onGround,
                isMilitary: isMilitary,
                aircraftType: guessAircraftType(callsign, altitude, country)
              };
            });
          
          setFlights(processedFlights);
          setLastUpdate(new Date().toISOString());
          setError(null);
        }
        
      } catch (err) {
        console.error('OpenSky API error:', err);
        setError('Using demo data - API unavailable');
        // Fallback to demo data
        useDemoData();
      }
    };

    const detectMilitary = (callsign, country) => {
      if (!callsign) return false;
      const milPrefixes = ['RCH', 'HOOK', 'REACH', 'SAM', 'SPAR', 'CARGO', 'GRIM', 'DRACO', 'KING'];
      return milPrefixes.some(prefix => callsign.startsWith(prefix));
    };

    const guessAircraftType = (callsign, altitude, country) => {
      if (!callsign) return 'Unknown';
      if (callsign.startsWith('RCH')) return 'C-17/C-5';
      if (callsign.startsWith('HOOK')) return 'E-3 AWACS';
      if (callsign.startsWith('REACH')) return 'KC-135/KC-10';
      if (callsign.startsWith('SAM')) return 'C-130';
      if (altitude && altitude > 10000) return 'Commercial Jet';
      return 'Unknown';
    };

    const useDemoData = () => {
      // Demo military flights in the region
      setFlights([
        { callsign: 'RCH452', icao24: 'ae1234', lat: 25.25, lon: 51.60, altitude: 32000, velocity: 850, heading: 45, isMilitary: true, aircraftType: 'C-17', country: 'United States' },
        { callsign: 'HOOK01', icao24: 'ae5678', lat: 26.5, lon: 56.3, altitude: 28000, velocity: 750, heading: 180, isMilitary: true, aircraftType: 'E-3 AWACS', country: 'United States' },
        { callsign: 'REACH789', icao24: 'ae9012', lat: 24.0, lon: 50.5, altitude: 35000, velocity: 900, heading: 90, isMilitary: true, aircraftType: 'KC-135', country: 'United States' },
        { callsign: 'QTR123', icao24: '06a123', lat: 25.2, lon: 51.6, altitude: 38000, velocity: 850, heading: 270, isMilitary: false, aircraftType: 'Commercial', country: 'Qatar' },
        { callsign: 'UAE456', icao24: '896123', lat: 24.4, lon: 54.5, altitude: 36000, velocity: 820, heading: 135, isMilitary: false, aircraftType: 'Commercial', country: 'UAE' },
      ]);
      setLastUpdate(new Date().toISOString());
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [isLoaded]);

  // Update markers
  useEffect(() => {
    if (!leafletMap.current || !isLoaded) return;
    const L = window.L;
    const map = leafletMap.current;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    flights.forEach(flight => {
      if (!flight.lat || !flight.lon) return;

      const color = flight.isMilitary ? '#ff1744' : flight.callsign?.startsWith('K') ? '#ffd600' : '#00e676';
      const size = flight.isMilitary ? 24 : 20;

      const marker = L.marker([flight.lat, flight.lon], {
        icon: L.divIcon({
          className: 'flight-marker',
          html: `
            <div style="
              width: ${size}px; height: ${size}px;
              background: ${color};
              border: 2px solid #fff;
              border-radius: 50%;
              transform: rotate(${flight.heading || 0}deg);
              box-shadow: 0 0 10px ${color}80;
              display: flex; align-items: center; justify-content: center;
            ">
              <div style="
                width: 0; height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-bottom: 8px solid #fff;
              "></div>
            </div>
          `,
          iconSize: [size, size],
          iconAnchor: [size/2, size/2]
        })
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'JetBrains Mono', monospace; min-width: 220px;">
          <div style="background: #0d1117; color: #e6edf3; padding: 12px; border-radius: 8px; border: 1px solid #30363d;">
            <div style="font-weight: bold; color: ${color}; margin-bottom: 8px; font-size: 14px;">
              ${flight.isMilitary ? '🎖️ ' : ''}${flight.callsign}
            </div>
            <div style="font-size: 11px; color: #8b949e; line-height: 1.6;">
              Country: ${flight.country}<br/>
              ${flight.aircraftType ? `Type: ${flight.aircraftType}<br/>` : ''}
              Alt: ${flight.altitude ? Math.round(flight.altitude) : 'N/A'} ft<br/>
              Spd: ${flight.velocity ? Math.round(flight.velocity) : 'N/A'} km/h<br/>
              HDG: ${flight.heading || 'N/A'}°<br/>
              ICAO: ${flight.icao24}<br/>
              ${flight.onGround ? '🛬 On Ground' : '✈️ Airborne'}
            </div>
          </div>
        </div>
      `);

      markersRef.current.push(marker);
    });
  }, [flights, isLoaded]);

  if (!isLoaded) {
    return (
      <div style={{ width: "100%", height: "400px", background: "#030810", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
        <span style={{ color: "#8b949e" }}>Loading Flight Radar...</span>
      </div>
    );
  }

  return (
    <div style={{ background: "#0d1117", padding: 16, borderBottom: "1px solid #1a2332" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
            ✈️ LIVE FLIGHT RADAR — OPENSKY NETWORK
          </div>
          {lastUpdate && (
            <div style={{ fontSize: 9, color: error ? "#ff6d00" : "#00e676", marginTop: 2 }}>
              {error ? `⚠️ ${error}` : `Tracking ${flights.length} aircraft • ${new Date(lastUpdate).toLocaleTimeString()}`}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10 }}>
          <span style={{ color: "#ff1744" }}>🔴 Military</span>
          <span style={{ color: "#ffd600" }}>🟢 Tanker</span>
          <span style={{ color: "#00e676" }}>✈️ Commercial</span>
        </div>
      </div>
      
      <div 
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: 8, border: "1px solid #1a2332" }}
      />
      
      <style>{`
        .flight-marker { background: transparent !important; border: none !important; }
        .leaflet-popup-content-wrapper { background: #0d1117 !important; border: 1px solid #30363d !important; }
        .leaflet-popup-tip { background: #0d1117 !important; }
      `}</style>
    </div>
  );
}

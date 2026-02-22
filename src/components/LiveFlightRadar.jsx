import { useEffect, useRef, useState } from 'react';

// FlightRadar24 API Configuration
const FR24_API_URL = 'https://fr24api.flightradar24.com/api/v1/live/flight-positions/full';

// Your provided API tokens
const FR24_MAIN_TOKEN = '019c846f-5ffb-7087-93f7-945392cf441c';
const FR24_MAIN_SECRET = 'yPFfAXqKrhUCXySAfGQXwYB7q6RJg0456p5fGJxaf38209a4';

const FR24_SANDBOX_TOKEN = '019c846d-2f31-705b-9ff1-83ec145a5b88';
const FR24_SANDBOX_SECRET = 'qhFfkMEtw7yE0yqJK0x6fb1QY0YpKjHpXuZ2T0Tccc41fcd3';

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

  // Fetch flights from FlightRadar24 API
  useEffect(() => {
    if (!isLoaded) return;

    const fetchFlights = async () => {
      try {
        // Bounding box for Middle East theater
        const bounds = {
          north: 42.0,
          south: 10.0,
          east: 75.0,
          west: 25.0
        };

        const response = await fetch(
          `${FR24_API_URL}?bounds=${bounds.north},${bounds.south},${bounds.east},${bounds.west}`,
          {
            headers: {
              'Authorization': `Bearer ${FR24_MAIN_TOKEN}|${FR24_MAIN_SECRET}`,
              'Accept': 'application/json',
              'Accept-Version': 'v1'
            }
          }
        );

        if (!response.ok) {
          // Try sandbox token if main fails
          const sandboxResponse = await fetch(
            `${FR24_API_URL}?bounds=${bounds.north},${bounds.south},${bounds.east},${bounds.west}`,
            {
              headers: {
                'Authorization': `Bearer ${FR24_SANDBOX_TOKEN}|${FR24_SANDBOX_SECRET}`,
                'Accept': 'application/json',
                'Accept-Version': 'v1'
              }
            }
          );
          
          if (!sandboxResponse.ok) {
            throw new Error(`API Error: ${response.status}`);
          }
          
          const data = await sandboxResponse.json();
          processFlightData(data);
          return;
        }

        const data = await response.json();
        processFlightData(data);
        
      } catch (err) {
        console.error('FlightRadar24 API error:', err);
        setError('Using demo data - API limit reached');
        // Fallback to demo data
        useDemoData();
      }
    };

    const processFlightData = (data) => {
      if (data && data.data) {
        const processedFlights = data.data.map(flight => ({
          callsign: flight.callsign || flight.registration || 'Unknown',
          icao24: flight.hex,
          lat: flight.lat,
          lon: flight.lon,
          altitude: flight.altitude,
          velocity: flight.speed,
          heading: flight.track,
          aircraft_type: flight.aircraft_type || flight.type,
          registration: flight.registration,
          origin: flight.origin,
          destination: flight.destination,
          airline: flight.airline
        }));
        
        setFlights(processedFlights);
        setLastUpdate(new Date().toISOString());
        setError(null);
      }
    };

    const useDemoData = () => {
      // Demo military flights in the region
      setFlights([
        { callsign: 'RCH452', lat: 25.25, lon: 51.60, altitude: 32000, velocity: 850, heading: 45, aircraft_type: 'C-17', origin: 'Al Udeid', destination: 'Incirlik' },
        { callsign: 'HOOK01', lat: 26.5, lon: 56.3, altitude: 28000, velocity: 750, heading: 180, aircraft_type: 'E-3', origin: 'Prince Sultan', destination: 'Gulf' },
        { callsign: 'REACH789', lat: 24.0, lon: 50.5, altitude: 35000, velocity: 900, heading: 90, aircraft_type: 'KC-135', origin: 'Al Udeid', destination: 'Arabian Sea' },
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

      // Military indicators
      const isMilitary = flight.callsign?.match(/^(RCH|HOOK|REACH|SAM|SPAR|CARGO)/);
      const isTanker = flight.aircraft_type?.includes('KC-') || flight.callsign?.includes('REACH');
      const isAWACS = flight.aircraft_type?.includes('E-3') || flight.callsign?.includes('HOOK');
      
      const color = isMilitary ? '#ff1744' : isTanker ? '#ffd600' : '#00e676';
      const size = isMilitary ? 24 : 20;

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
              ${isMilitary ? '🎖️ ' : ''}${flight.callsign}
            </div>
            <div style="font-size: 11px; color: #8b949e; line-height: 1.6;">
              ${flight.aircraft_type ? `Type: ${flight.aircraft_type}<br/>` : ''}
              Alt: ${flight.altitude ? Math.round(flight.altitude) : 'N/A'} ft<br/>
              Spd: ${flight.velocity ? Math.round(flight.velocity) : 'N/A'} km/h<br/>
              HDG: ${flight.heading || 'N/A'}°<br/>
              ${flight.origin ? `From: ${flight.origin}<br/>` : ''}
              ${flight.destination ? `To: ${flight.destination}<br/>` : ''}
              ${flight.registration ? `Reg: ${flight.registration}<br/>` : ''}
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
            ✈️ LIVE FLIGHT RADAR — FLIGHTRADAR24 API
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

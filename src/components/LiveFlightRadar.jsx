import { useEffect, useRef, useState } from 'react';
import { supabase } from '../data/supabase.js';

export default function LiveFlightRadar() {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flights, setFlights] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

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

  // Fetch flights from Supabase
  useEffect(() => {
    if (!isLoaded) return;

    const fetchFlights = async () => {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .gte('last_seen', new Date(Date.now() - 10 * 60 * 1000).toISOString())
        .limit(50);

      if (!error && data) {
        setFlights(data);
        setLastUpdate(new Date().toISOString());
      }
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

      const isMilitary = flight.callsign?.match(/^[A-Z]{3}/);
      const color = isMilitary ? '#ff1744' : '#00e676';

      const marker = L.marker([flight.lat, flight.lon], {
        icon: L.divIcon({
          className: 'flight-marker',
          html: `
            <div style="
              width: 20px; height: 20px;
              background: ${color};
              border: 2px solid #fff;
              border-radius: 50%;
              transform: rotate(${flight.heading || 0}deg);
              box-shadow: 0 0 10px ${color}80;
            ">
              <div style="
                width: 0; height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-bottom: 8px solid #fff;
                margin: 3px auto;
              "></div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: monospace; min-width: 200px;">
          <div style="background: #0d1117; color: #e6edf3; padding: 10px; border-radius: 6px;">
            <div style="font-weight: bold; color: ${color}; margin-bottom: 5px;">
              ${flight.callsign || 'Unknown'}
            </div>
            <div style="font-size: 11px; color: #8b949e;">
              ${isMilitary ? '🎖️ Military' : '✈️ Commercial'}<br/>
              Alt: ${flight.altitude ? Math.round(flight.altitude) : 'N/A'} ft<br/>
              Spd: ${flight.velocity ? Math.round(flight.velocity) : 'N/A'} km/h<br/>
              HDG: ${flight.heading || 'N/A'}°<br/>
              Type: ${flight.aircraft_type || 'Unknown'}
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
            ✈️ LIVE FLIGHT RADAR — ADS-B TRACKING
          </div>
          {lastUpdate && (
            <div style={{ fontSize: 9, color: "#00e676", marginTop: 2 }}>
              Tracking {flights.length} aircraft • Updated: {new Date(lastUpdate).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10 }}>
          <span style={{ color: "#ff1744" }}>🔴 Military</span>
          <span style={{ color: "#00e676" }}>🟢 Commercial</span>
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

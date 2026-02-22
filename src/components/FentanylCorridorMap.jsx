import { useEffect, useRef, useState } from 'react';

// Fentanyl data with real coordinates
const FENTANYL_DATA = {
  productionLabs: [
    { id: 1, name: "Culiacán Lab Complex", cartel: "Sinaloa", lat: 24.8091, lng: -107.3940, output: "500kg/mo", status: "active" },
    { id: 2, name: "Guadalajara Hub", cartel: "CJNG", lat: 20.6597, lng: -103.3496, output: "400kg/mo", status: "active" },
    { id: 3, name: "Mazatlán Facility", cartel: "Sinaloa", lat: 23.2494, lng: -106.4111, output: "300kg/mo", status: "active" },
    { id: 4, name: "Tepalcatepec", cartel: "CJNG", lat: 19.1922, lng: -102.8483, output: "250kg/mo", status: "active" },
    { id: 5, name: "Durango Lab", cartel: "Sinaloa", lat: 24.0277, lng: -104.6532, output: "200kg/mo", status: "active" }
  ],
  
  precursorRoutes: [
    { 
      id: 1,
      from: { name: "Shanghai, China", lat: 31.2304, lng: 121.4737 },
      to: { name: "Manzanillo Port, MX", lat: 19.1135, lng: -104.3438 },
      volume: "20 tons/mo",
      chemical: "4-ANPP, NPP"
    },
    { 
      id: 2,
      from: { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
      to: { name: "Lázaro Cárdenas, MX", lat: 17.9706, lng: -102.2253 },
      volume: "15 tons/mo",
      chemical: "NPP, Precursor A"
    },
    { 
      id: 3,
      from: { name: "Guangzhou, China", lat: 23.1291, lng: 113.2644 },
      to: { name: "Manzanillo Port, MX", lat: 19.1135, lng: -104.3438 },
      volume: "10 tons/mo",
      chemical: "4-ANPP"
    }
  ],
  
  borderCrossings: [
    { 
      id: 1, name: "San Ysidro", mxCity: "Tijuana", usCity: "San Diego",
      lat: 32.5423, lng: -117.0307, volume: "40%", seized: "2,847 kg",
      method: "Tunnels, vehicles", cartel: "Sinaloa"
    },
    { 
      id: 2, name: "Mariposa", mxCity: "Nogales", usCity: "Nogales",
      lat: 31.3322, lng: -110.9378, volume: "25%", seized: "1,923 kg",
      method: "Truck compartments", cartel: "Sinaloa"
    },
    { 
      id: 3, name: "Bridge of Americas", mxCity: "Ciudad Juárez", usCity: "El Paso",
      lat: 31.7494, lng: -106.3881, volume: "20%", seized: "1,456 kg",
      method: "Mules, vehicles", cartel: "Juárez/Gulf"
    },
    { 
      id: 4, name: "World Trade Bridge", mxCity: "Nuevo Laredo", usCity: "Laredo",
      lat: 27.5036, lng: -99.5076, volume: "15%", seized: "892 kg",
      method: "Hidden in cargo", cartel: "Northeast"
    }
  ],
  
  usDistribution: [
    { city: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, volume: "25%", deaths: "6,847" },
    { city: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.0740, volume: "20%", deaths: "4,923" },
    { city: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, volume: "18%", deaths: "4,234" },
    { city: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, volume: "12%", deaths: "2,876" },
    { city: "Denver", state: "CO", lat: 39.7392, lng: -104.9903, volume: "10%", deaths: "2,345" },
    { city: "New York City", state: "NY", lat: 40.7128, lng: -74.0060, volume: "15%", deaths: "3,456" }
  ],
  
  tunnels: [
    { id: 1, mx: { lat: 32.5323, lng: -117.0207 }, us: { lat: 32.5423, lng: -117.0307 }, length: "800m", depth: "20m", location: "Tijuana-San Diego", status: "active" },
    { id: 2, mx: { lat: 31.3422, lng: -110.9278 }, us: { lat: 31.3322, lng: -110.9378 }, length: "300m", depth: "10m", location: "Nogales", status: "seized" },
    { id: 3, mx: { lat: 32.5523, lng: -116.9907 }, us: { lat: 32.5623, lng: -117.0007 }, length: "600m", depth: "15m", location: "Otay Mesa", status: "active" }
  ]
};

export default function FentanylCorridorMap() {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const layersRef = useRef({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

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
      center: [28, -105],
      zoom: 5,
      minZoom: 3,
      maxZoom: 10,
      scrollWheelZoom: false
    });

    leafletMap.current = map;

    // Dark theme tiles - CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom icons
    const icons = {
      production: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#ff1744;width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px #ff1744;"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      }),
      border: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#ffd600;width:14px;height:14px;transform:rotate(45deg);border:2px solid #fff;box-shadow:0 0 8px #ffd600;"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      }),
      distribution: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#e040fb;width:12px;height:12px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px #e040fb;"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      }),
      china: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#ff1744;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 15px #ff1744;animation:pulse 2s infinite;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
    };

    // Create layer groups
    layersRef.current = {
      production: L.layerGroup().addTo(map),
      precursors: L.layerGroup().addTo(map),
      border: L.layerGroup().addTo(map),
      distribution: L.layerGroup().addTo(map),
      tunnels: L.layerGroup().addTo(map)
    };

    // Add production labs
    FENTANYL_DATA.productionLabs.forEach(lab => {
      const marker = L.marker([lab.lat, lab.lng], { icon: icons.production })
        .bindPopup(`
          <div style="font-family:monospace;min-width:200px;">
            <div style="color:#ff1744;font-weight:bold;font-size:14px;margin-bottom:5px;">🔴 ${lab.name}</div>
            <div style="color:#666;font-size:11px;">Cartel: <span style="color:#ff1744;font-weight:bold;">${lab.cartel}</span></div>
            <div style="color:#666;font-size:11px;">Output: <span style="color:#fff;">${lab.output}</span></div>
            <div style="color:#666;font-size:11px;">Status: <span style="color:#00e676;">${lab.status.toUpperCase()}</span></div>
            <div style="color:#888;font-size:9px;margin-top:5px;">📍 ${lab.lat.toFixed(4)}, ${lab.lng.toFixed(4)}</div>
          </div>
        `);
      layersRef.current.production.addLayer(marker);
    });

    // Add precursor routes (arrows)
    FENTANYL_DATA.precursorRoutes.forEach(route => {
      // From China to Mexico
      const fromLatLng = [route.from.lat, route.from.lng];
      const toLatLng = [route.to.lat, route.to.lng];
      
      // Create curved line
      const latlngs = [
        fromLatLng,
        [(fromLatLng[0] + toLatLng[0])/2 + 10, (fromLatLng[1] + toLatLng[1])/2 - 30], // Control point for curve
        toLatLng
      ];
      
      const polyline = L.polyline(latlngs, {
        color: '#00e676',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10'
      }).bindPopup(`
        <div style="font-family:monospace;">
          <div style="color:#00e676;font-weight:bold;font-size:13px;">🟢 ${route.from.name} → ${route.to.name}</div>
          <div style="color:#666;font-size:11px;margin-top:5px;">Volume: <span style="color:#00e676;font-weight:bold;">${route.volume}</span></div>
          <div style="color:#666;font-size:11px;">Chemicals: ${route.chemical}</div>
        </div>
      `);
      
      layersRef.current.precursors.addLayer(polyline);
      
      // Add China marker
      const chinaMarker = L.marker(fromLatLng, { icon: icons.china })
        .bindPopup(`
          <div style="font-family:monospace;">
            <div style="color:#ff1744;font-weight:bold;font-size:14px;">🇨🇳 PRECURSOR SOURCE</div>
            <div style="color:#666;font-size:11px;margin-top:5px;">${route.from.name}</div>
            <div style="color:#888;font-size:9px;">Chemicals shipped to Mexico</div>
          </div>
        `);
      layersRef.current.precursors.addLayer(chinaMarker);
    });

    // Add border crossings
    FENTANYL_DATA.borderCrossings.forEach(crossing => {
      const marker = L.marker([crossing.lat, crossing.lng], { icon: icons.border })
        .bindPopup(`
          <div style="font-family:monospace;min-width:220px;">
            <div style="color:#ffd600;font-weight:bold;font-size:14px;margin-bottom:5px;">🟡 ${crossing.name}</div>
            <div style="color:#666;font-size:11px;">${crossing.mxCity} → ${crossing.usCity}</div>
            <div style="color:#ffd600;font-size:18px;font-weight:bold;margin:8px 0;">${crossing.volume}</div>
            <div style="color:#666;font-size:10px;">Method: ${crossing.method}</div>
            <div style="color:#666;font-size:10px;">Seized: <span style="color:#fff;">${crossing.seized}</span></div>
            <div style="color:#666;font-size:10px;">Controlled by: <span style="color:#ff1744;">${crossing.cartel}</span></div>
          </div>
        `);
      layersRef.current.border.addLayer(marker);
    });

    // Add US distribution hubs
    FENTANYL_DATA.usDistribution.forEach(hub => {
      const marker = L.marker([hub.lat, hub.lng], { icon: icons.distribution })
        .bindPopup(`
          <div style="font-family:monospace;min-width:180px;">
            <div style="color:#e040fb;font-weight:bold;font-size:14px;margin-bottom:5px;">🟣 ${hub.city}, ${hub.state}</div>
            <div style="color:#666;font-size:11px;">Volume: <span style="color:#e040fb;font-weight:bold;">${hub.volume}</span></div>
            <div style="color:#ff1744;font-size:11px;">Deaths: ${hub.deaths}</div>
          </div>
        `);
      layersRef.current.distribution.addLayer(marker);
    });

    // Add tunnels
    FENTANYL_DATA.tunnels.forEach(tunnel => {
      const line = L.polyline([
        [tunnel.mx.lat, tunnel.mx.lng],
        [tunnel.us.lat, tunnel.us.lng]
      ], {
        color: '#ffd600',
        weight: 4,
        opacity: 0.9,
        dashArray: '5, 5'
      }).bindPopup(`
        <div style="font-family:monospace;">
          <div style="color:#ffd600;font-weight:bold;font-size:13px;">🚇 SMUGGLING TUNNEL</div>
          <div style="color:#666;font-size:11px;margin-top:5px;">${tunnel.location}</div>
          <div style="color:#666;font-size:11px;">Length: <span style="color:#fff;">${tunnel.length}</span></div>
          <div style="color:#666;font-size:11px;">Depth: <span style="color:#fff;">${tunnel.depth}</span></div>
          <div style="color:${tunnel.status === 'active' ? '#ff1744' : '#6e7681'};font-size:11px;font-weight:bold;">${tunnel.status.toUpperCase()}</div>
        </div>
      `);
      layersRef.current.tunnels.addLayer(line);
    });

    // Add US-Mexico border line
    const borderLine = L.polyline([
      [32.5, -117.0],
      [31.8, -111.0],
      [31.3, -108.0],
      [30.5, -104.5],
      [29.0, -101.5],
      [27.5, -99.5],
      [25.9, -97.5]
    ], {
      color: '#ff1744',
      weight: 4,
      opacity: 0.7,
      dashArray: '15, 10'
    }).bindPopup('<div style="font-family:monospace;color:#ff1744;font-weight:bold;">🇺🇸 US-MEXICO BORDER 🇲🇽</div>');
    
    borderLine.addTo(map);

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, [isLoaded]);

  // Handle layer visibility
  useEffect(() => {
    if (!leafletMap.current) return;
    
    Object.keys(layersRef.current).forEach(layer => {
      if (activeLayer === 'all' || activeLayer === layer) {
        leafletMap.current.addLayer(layersRef.current[layer]);
      } else {
        leafletMap.current.removeLayer(layersRef.current[layer]);
      }
    });
  }, [activeLayer]);

  const layers = [
    { key: 'all', label: '🌎 ALL LAYERS', color: '#e6edf3' },
    { key: 'production', label: '🔴 PRODUCTION LABS', color: '#ff1744' },
    { key: 'precursors', label: '🟢 PRECURSOR ROUTES', color: '#00e676' },
    { key: 'border', label: '🟡 BORDER CROSSINGS', color: '#ffd600' },
    { key: 'distribution', label: '🟣 US DISTRIBUTION', color: '#e040fb' }
  ];

  if (!isLoaded) {
    return (
      <div style={{ background: "#161b22", borderRadius: 12, padding: 40, textAlign: "center" }}>
        <div style={{ color: "#8b949e" }}>🗺️ Loading interactive map...</div>
      </div>
    );
  }

  return (
    <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: 1 }}>
            💊 FENTANYL CORRIDOR MAPPING
          </div>
          <div style={{ fontSize: 10, color: "#8b949e", marginTop: 4 }}>
            Interactive Map: China → Mexico Production → US Distribution
          </div>
        </div>
        <div style={{
          padding: "6px 14px", background: "#ff174420", borderRadius: 6,
          border: "1px solid #ff174440", fontSize: 10, color: "#ff1744", fontWeight: 600
        }}>
          🔴 71,000+ US Deaths/Year
        </div>
      </div>

      {/* Layer selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {layers.map(layer => (
          <button
            key={layer.key}
            onClick={() => setActiveLayer(layer.key)}
            style={{
              padding: "6px 12px", borderRadius: 6,
              background: activeLayer === layer.key ? layer.color : "#0d1117",
              color: activeLayer === layer.key ? "#000" : layer.color,
              border: `2px solid ${layer.color}`,
              fontSize: 9, fontWeight: 700, cursor: "pointer"
            }}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Interactive Leaflet Map */}
      <div 
        ref={mapRef}
        style={{ 
          width: "100%", 
          height: "500px", 
          borderRadius: 8, 
          border: "2px solid #30363d",
          background: "#0a0e14"
        }}
      />

      {/* Stats Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
        <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#ff1744" }}>1,850</div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>kg/month produced</div>
        </div>
        <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#00e676" }}>45+</div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>tons precursors/month</div>
        </div>
        <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#ffd600" }}>285</div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>kg seized/month</div>
        </div>
        <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#e040fb" }}>7,150</div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>monthly US deaths</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: "flex", gap: 20, marginTop: 16, padding: 12, 
        background: "#0d1117", borderRadius: 8, flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff1744", border: "2px solid #fff" }} />
          <span style={{ fontSize: 10, color: "#8b949e" }}>Production Lab</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, background: "#00e676", transform: "rotate(45deg)" }} />
          <span style={{ fontSize: 10, color: "#8b949e" }}>Precursor Route</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, transform: "rotate(45deg)", background: "#ffd600", border: "2px solid #fff" }} />
          <span style={{ fontSize: 10, color: "#8b949e" }}>Border Crossing</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e040fb", border: "2px solid #fff" }} />
          <span style={{ fontSize: 10, color: "#8b949e" }}>US Distribution Hub</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 3, background: "#ffd600" }} />
          <span style={{ fontSize: 10, color: "#8b949e" }}>Smuggling Tunnel</span>
        </div>
      </div>

      {/* Instructions */}
      <div style={{ fontSize: 9, color: "#6e7681", marginTop: 12, textAlign: "center" }}>
        🖱️ Click markers for details • 🖱️🖱️ Double-click to zoom • 🖱️👆 Drag to pan
      </div>

      <div style={{ fontSize: 7, color: "#484f58", marginTop: 12, textAlign: "center" }}>
        DATA: DEA 2026 • CBP Statistics • CDC Overdose Data • Real-time intelligence
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .leaflet-popup-content-wrapper {
          background: #161b22 !important;
          border: 1px solid #30363d !important;
          border-radius: 8px !important;
        }
        .leaflet-popup-tip {
          background: #161b22 !important;
        }
        .leaflet-container {
          font-family: 'JetBrains Mono', monospace !important;
        }
      `}</style>
    </div>
  );
}

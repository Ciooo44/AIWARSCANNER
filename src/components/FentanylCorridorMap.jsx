import { useState } from 'react';

// Fentanyl Trafficking Corridor Data
const FENTANYL_DATA = {
  productionCenters: [
    { name: "Culiacán Lab Complex", cartel: "Sinaloa", lat: 24.8, lon: -107.4, output: "500kg/month", status: "ACTIVE" },
    { name: "Guadalajara Hub", cartel: "CJNG", lat: 20.7, lon: -103.3, output: "400kg/month", status: "ACTIVE" },
    { name: "Mazatlán Facility", cartel: "Sinaloa", lat: 23.2, lon: -106.4, output: "300kg/month", status: "ACTIVE" },
    { name: "Tepalcatepec", cartel: "CJNG", lat: 19.2, lon: -102.8, output: "250kg/month", status: "ACTIVE" }
  ],
  
  precursorRoutes: [
    { from: "Shanghai, China", to: "Manzanillo Port", type: "sea", volume: "20 tons/month", color: "#00e676" },
    { from: "Hong Kong", to: "Lázaro Cárdenas", type: "sea", volume: "15 tons/month", color: "#00e676" },
    { from: "Guangzhou", to: "Manzanillo", type: "container", volume: "10 tons/month", color: "#2979ff" }
  ],
  
  borderCrossings: [
    { name: "Tijuana-San Diego", crossing: "San Ysidro", volume: "40%", method: "Tunnel + Vehicle", controlledBy: "Sinaloa" },
    { name: "Nogales", crossing: "Mariposa", volume: "25%", method: "Truck compartments", controlledBy: "Sinaloa" },
    { name: "Ciudad Juárez-El Paso", crossing: "Bridge of the Americas", volume: "20%", method: "Mules + Vehicle", controlledBy: "Juárez/Gulf" },
    { name: "Nuevo Laredo-Laredo", crossing: "World Trade Bridge", volume: "15%", method: "Hidden in cargo", controlledBy: "Northeast" }
  ],
  
  tunnels: [
    { location: "Tijuana-San Diego", length: "800m", discovered: "2024", status: "ACTIVE" },
    { location: "Nogales", length: "300m", discovered: "2025", status: "SEIZED" },
    { location: "Otay Mesa", length: "600m", discovered: "2025", status: "ACTIVE" },
    { location: "Naco", length: "200m", discovered: "2024", status: "SEIZED" }
  ],
  
  usDistribution: [
    { city: "Los Angeles", volume: "25%", hub: "Primary", lat: 34.0, lon: -118.2 },
    { city: "Phoenix", volume: "20%", hub: "Secondary", lat: 33.4, lon: -112.0 },
    { city: "Chicago", volume: "18%", hub: "Distribution", lat: 41.8, lon: -87.6 },
    { city: "New York City", volume: "15%", hub: "Major Hub", lat: 40.7, lon: -74.0 },
    { city: "Houston", volume: "12%", hub: "Secondary", lat: 29.7, lon: -95.3 },
    { city: "Denver", volume: "10%", hub: "Mountain Hub", lat: 39.7, lon: -104.9 }
  ]
};

// SVG Map Component
function FentanylMap({ selectedLayer }) {
  const width = 600;
  const height = 400;
  
  // Coordinate conversion (rough approximation for visualization)
  const latLonToXY = (lat, lon) => {
    const x = ((lon + 125) / 50) * width;
    const y = ((35 - lat) / 30) * height;
    return { x, y };
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", background: "#0a0e14" }}>
      {/* Ocean */}
      <rect width={width} height={height} fill="#0a1628" />
      
      {/* Mexico land area */}
      <path 
        d={`M ${latLonToXY(32, -117).x} ${latLonToXY(32, -117).y}
            L ${latLonToXY(22, -105).x} ${latLonToXY(22, -105).y}
            L ${latLonToXY(14, -92).x} ${latLonToXY(14, -92).y}
            L ${latLonToXY(32, -86).x} ${latLonToXY(32, -86).y}
            Z`} 
        fill="#1a2332" stroke="#30363d" strokeWidth="1"
      />
      
      {/* US land area */}
      <path 
        d={`M ${latLonToXY(49, -125).x} ${latLonToXY(49, -125).y}
            L ${latLonToXY(49, -100).x} ${latLonToXY(49, -100).y}
            L ${latLonToXY(25, -80).x} ${latLonToXY(25, -80).y}
            L ${latLonToXY(25, -120).x} ${latLonToXY(25, -120).y}
            Z`} 
        fill="#161b22" stroke="#30363d" strokeWidth="1"
      />
      
      {/* US-Mexico border line */}
      <line 
        x1={latLonToXY(32, -117).x} y1={latLonToXY(32, -117).y}
        x2={latLonToXY(25, -97).x} y2={latLonToXY(25, -97).y}
        stroke="#ff1744" strokeWidth="2" strokeDasharray="5,3"
      />
      
      {/* Precursor routes from China */}
      {(selectedLayer === 'all' || selectedLayer === 'precursors') && (
        <>
          {/* Pacific route */}
          <path 
            d={`M 50 ${height/3} Q 200 ${height/4} ${latLonToXY(19, -104).x} ${latLonToXY(19, -104).y}`}
            fill="none" stroke="#00e676" strokeWidth="2" opacity="0.8"
            markerEnd="url(#arrow-green)"
          />
          <text x={120} y={height/3 - 10} fill="#00e676" fontSize="8">Shanghai → Manzanillo</text>
          
          {/* Secondary route */}
          <path 
            d={`M 60 ${height/3 + 30} Q 200 ${height/3} ${latLonToXY(18, -102).x} ${latLonToXY(18, -102).y}`}
            fill="none" stroke="#2979ff" strokeWidth="2" opacity="0.8"
          />
          <text x={100} y={height/3 + 50} fill="#2979ff" fontSize="8">Hong Kong → Lázaro Cárdenas</text>
        </>
      )}
      
      {/* Production centers */}
      {(selectedLayer === 'all' || selectedLayer === 'production') && FENTANYL_DATA.productionCenters.map((center, i) => {
        const pos = latLonToXY(center.lat, center.lon);
        return (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r="6" fill="#ff1744" opacity="0.8">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={pos.x + 8} y={pos.y + 3} fill="#ff8a80" fontSize="7">{center.name}</text>
          </g>
        );
      })}
      
      {/* Border crossings */}
      {(selectedLayer === 'all' || selectedLayer === 'border') && FENTANYL_DATA.borderCrossings.map((crossing, i) => {
        const pos = latLonToXY(32 - i * 2, -117 + i * 8);
        return (
          <g key={i}>
            <rect x={pos.x - 4} y={pos.y - 4} width="8" height="8" fill="#ffd600" />
            <line x1={pos.x} y1={pos.y} x2={pos.x} y2={pos.y - 25} stroke="#ffd600" strokeWidth="1" />
            <text x={pos.x - 20} y={pos.y - 30} fill="#ffd600" fontSize="7">{crossing.name}</text>
            <text x={pos.x - 20} y={pos.y - 22} fill="#ffaa00" fontSize="6">{crossing.volume}</text>
          </g>
        );
      })}
      
      {/* US Distribution hubs */}
      {(selectedLayer === 'all' || selectedLayer === 'distribution') && FENTANYL_DATA.usDistribution.map((hub, i) => {
        const pos = latLonToXY(hub.lat, hub.hub);
        return (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r="4" fill="#e040fb" />
            <text x={pos.x + 6} y={pos.y + 2} fill="#d580ff" fontSize="7">{hub.city} ({hub.volume})</text>
          </g>
        );
      })}
      
      {/* Legend */}
      <g transform={`translate(10, ${height - 80})`}>
        <rect x="-5" y="-5" width="120" height="75" fill="#161b22" rx="4" opacity="0.9" />
        <text x="0" y="5" fill="#e6edf3" fontSize="8" fontWeight="bold">LEGEND</text>
        <circle cx="5" cy="18" r="4" fill="#ff1744" />
        <text x="12" y="21" fill="#8b949e" fontSize="7">Production Lab</text>
        <line x1="2" y1="30" x2="12" y2="30" stroke="#00e676" strokeWidth="2" />
        <text x="14" y="32" fill="#8b949e" fontSize="7">Precursor Route</text>
        <rect x="2" y="40" width="6" height="6" fill="#ffd600" />
        <text x="12" y="46" fill="#8b949e" fontSize="7">Border Crossing</text>
        <circle cx="5" cy="58" r="3" fill="#e040fb" />
        <text x="12" y="61" fill="#8b949e" fontSize="7">US Distribution</text>
      </g>
      
      {/* Title */}
      <text x={width/2} y="20" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="bold">
        FENTANYL TRAFFICKING CORRIDORS 2026
      </text>
    </svg>
  );
}

export default function FentanylCorridorMap() {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedCrossing, setSelectedCrossing] = useState(null);

  const layers = [
    { key: 'all', label: '🌎 ALL', color: '#e6edf3' },
    { key: 'production', label: '🔴 PRODUCTION', color: '#ff1744' },
    { key: 'precursors', label: '🟢 PRECURSORS', color: '#00e676' },
    { key: 'border', label: '🟡 BORDER', color: '#ffd600' },
    { key: 'distribution', label: '🟣 DISTRIBUTION', color: '#e040fb' }
  ];

  return (
    <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>
            💊 FENTANYL CORRIDOR MAPPING
          </div>
          <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>
            Production → Precursors → Border → Distribution
          </div>
        </div>
        <div style={{
          padding: "4px 10px", background: "#ff174420", borderRadius: 4,
          border: "1px solid #ff174440", fontSize: 9, color: "#ff1744"
        }}>
          🔴 71,000+ US Deaths/Year
        </div>
      </div>

      {/* Layer selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {layers.map(layer => (
          <button
            key={layer.key}
            onClick={() => setSelectedLayer(layer.key)}
            style={{
              padding: "4px 10px", borderRadius: 4,
              background: selectedLayer === layer.key ? layer.color : "#0d1117",
              color: selectedLayer === layer.key ? "#000" : layer.color,
              border: `1px solid ${layer.color}`,
              fontSize: 8, fontWeight: 600, cursor: "pointer"
            }}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #30363d", marginBottom: 12 }}>
        <FentanylMap selectedLayer={selectedLayer} />
      </div>

      {/* Border crossings detail */}
      <div style={{ 
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
        marginBottom: 12
      }}>
        {FENTANYL_DATA.borderCrossings.map((crossing, i) => (
          <div 
            key={i}
            onClick={() => setSelectedCrossing(selectedCrossing === i ? null : i)}
            style={{
              padding: "8px 10px", background: "#0d1117", borderRadius: 6,
              border: "1px solid #1a2332", cursor: "pointer",
              borderLeft: `3px solid ${selectedCrossing === i ? "#ffd600" : "transparent"}`
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, color: "#e6edf3", fontWeight: 500 }}>{crossing.name}</span>
              <span style={{ fontSize: 10, color: "#ffd600", fontWeight: 700 }}>{crossing.volume}</span>
            </div>
            {selectedCrossing === i && (
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #1a2332" }}>
                <div style={{ fontSize: 8, color: "#8b949e" }}>Crossing: <span style={{ color: "#e6edf3" }}>{crossing.crossing}</span></div>
                <div style={{ fontSize: 8, color: "#8b949e" }}>Method: <span style={{ color: "#e6edf3" }}>{crossing.method}</span></div>
                <div style={{ fontSize: 8, color: "#8b949e" }}>Controlled by: <span style={{ color: "#ff1744" }}>{crossing.controlledBy}</span></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tunnels */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 6, fontWeight: 600 }}>
          🚇 SMUGGLING TUNNELS
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FENTANYL_DATA.tunnels.map((tunnel, i) => (
            <div key={i} style={{
              padding: "6px 10px", background: "#0d1117", borderRadius: 4,
              border: "1px solid #1a2332", fontSize: 8
            }}>
              <span style={{ color: tunnel.status === "ACTIVE" ? "#ff1744" : "#6e7681" }}>●</span>
              <span style={{ color: "#e6edf3", marginLeft: 4 }}>{tunnel.location}</span>
              <span style={{ color: "#8b949e", marginLeft: 4 }}>({tunnel.length})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Precursor stats */}
      <div style={{
        padding: 10, background: "#0d1117", borderRadius: 6, border: "1px solid #1a2332"
      }}>
        <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 6, fontWeight: 600 }}>
          📦 PRECURSOR CHEMICAL FLOW
        </div>
        <div style={{ fontSize: 9, color: "#8b949e", lineHeight: 1.6 }}>
          <strong style={{ color: "#00e676" }}>China → Mexico:</strong> 45+ tons/month of fentanyl precursors (4-ANPP, NPP)<br/>
          <strong style={{ color: "#2979ff" }}>Primary Ports:</strong> Manzanillo (Colima), Lázaro Cárdenas (Michoacán)<br/>
          <strong style={{ color: "#ffd600" }}>Border Crossings:</strong> Tijuana handles 40% of all fentanyl entering US<br/>
          <strong style={{ color: "#e040fb" }}>US Distribution:</strong> LA (25%), Phoenix (20%), Chicago (18%), NYC (15%)
        </div>
      </div>

      {/* Sources */}
      <div style={{ fontSize: 7, color: "#484f58", marginTop: 10, textAlign: "center" }}>
        SOURCES: DEA 2026 Report • CBP Statistics • Justice Department • Mexican Government Data
      </div>
    </div>
  );
}

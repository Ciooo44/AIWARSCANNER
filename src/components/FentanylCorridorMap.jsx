import { useState, useEffect } from 'react';

// Fentanyl Trafficking Corridor Data
const FENTANYL_DATA = {
  productionCenters: [
    { name: "Culiacán", cartel: "Sinaloa", lat: 24.8, lon: -107.4, output: "500kg/mo", status: "active" },
    { name: "Guadalajara", cartel: "CJNG", lat: 20.7, lon: -103.3, output: "400kg/mo", status: "active" },
    { name: "Mazatlán", cartel: "Sinaloa", lat: 23.2, lon: -106.4, output: "300kg/mo", status: "active" },
    { name: "Tepalcatepec", cartel: "CJNG", lat: 19.2, lon: -102.8, output: "250kg/mo", status: "active" },
    { name: "Durango", cartel: "Sinaloa", lat: 24.0, lon: -104.7, output: "200kg/mo", status: "active" }
  ],
  
  precursorRoutes: [
    { 
      id: 1,
      name: "Pacific Route A",
      from: { name: "Shanghai", lat: 31.2, lon: 121.5, country: "CN" },
      to: { name: "Manzanillo", lat: 19.1, lon: -104.3, country: "MX" },
      volume: "20 tons/mo",
      method: "Container ships",
      color: "#00e676"
    },
    { 
      id: 2,
      name: "Pacific Route B", 
      from: { name: "Hong Kong", lat: 22.3, lon: 114.2, country: "CN" },
      to: { name: "Lázaro Cárdenas", lat: 18.0, lon: -102.2, country: "MX" },
      volume: "15 tons/mo",
      method: "Cargo vessels",
      color: "#00e676"
    },
    { 
      id: 3,
      name: "Alternate Route",
      from: { name: "Guangzhou", lat: 23.1, lon: 113.3, country: "CN" },
      to: { name: "Manzanillo", lat: 19.1, lon: -104.3, country: "MX" },
      volume: "10 tons/mo",
      method: "Hidden cargo",
      color: "#2979ff"
    }
  ],
  
  borderCrossings: [
    { 
      name: "San Ysidro", 
      mxCity: "Tijuana", 
      usCity: "San Diego",
      lat: 32.5, lon: -117.0,
      volume: "40%", 
      fentanylSeized: "2,847 kg (2025)",
      method: "Tunnels, vehicles", 
      controlledBy: "Sinaloa Cartel",
      status: "active"
    },
    { 
      name: "Mariposa", 
      mxCity: "Nogales", 
      usCity: "Nogales",
      lat: 31.3, lon: -110.9,
      volume: "25%", 
      fentanylSeized: "1,923 kg (2025)",
      method: "Truck compartments", 
      controlledBy: "Sinaloa Cartel",
      status: "active"
    },
    { 
      name: "Bridge of Americas", 
      mxCity: "Ciudad Juárez", 
      usCity: "El Paso",
      lat: 31.7, lon: -106.4,
      volume: "20%", 
      fentanylSeized: "1,456 kg (2025)",
      method: "Mules, vehicles", 
      controlledBy: "Juárez/Gulf Cartel",
      status: "contested"
    },
    { 
      name: "World Trade Bridge", 
      mxCity: "Nuevo Laredo", 
      usCity: "Laredo",
      lat: 27.5, lon: -99.5,
      volume: "15%", 
      fentanylSeized: "892 kg (2025)",
      method: "Hidden in cargo", 
      controlledBy: "Northeast Cartel",
      status: "active"
    }
  ],
  
  tunnels: [
    { id: 1, mxLocation: "Tijuana", usLocation: "San Diego", length: "800m", depth: "20m", discovered: "2024", status: "active", discoveredBy: "Intel" },
    { id: 2, mxLocation: "Otay Mesa", usLocation: "San Diego", length: "600m", depth: "15m", discovered: "2025", status: "active", discoveredBy: "Routine inspection" },
    { id: 3, mxLocation: "Nogales", usLocation: "Nogales", length: "300m", depth: "10m", discovered: "2025", status: "seized", discoveredBy: "Ground-penetrating radar" },
    { id: 4, mxLocation: "Naco", usLocation: "Bisbee", length: "200m", depth: "8m", discovered: "2024", status: "seized", discoveredBy: "Anonymous tip" },
    { id: 5, mxLocation: "Mexicali", usLocation: "Calexico", length: "450m", depth: "12m", discovered: "2025", status: "active", discoveredBy: "Ongoing surveillance" }
  ],
  
  usDistribution: [
    { city: "Los Angeles", state: "CA", volume: "25%", lat: 34.0, lon: -118.2, hub: "Primary", seized2025: "3,420 kg", deaths2025: "6,847" },
    { city: "Phoenix", state: "AZ", volume: "20%", lat: 33.4, lon: -112.0, hub: "Secondary", seized2025: "2,891 kg", deaths2025: "4,923" },
    { city: "Chicago", state: "IL", volume: "18%", lat: 41.8, lon: -87.6, hub: "Distribution", seized2025: "2,456 kg", deaths2025: "4,234" },
    { city: "New York City", state: "NY", volume: "15%", lat: 40.7, lon: -74.0, hub: "Major Hub", seized2025: "1,987 kg", deaths2025: "3,456" },
    { city: "Houston", state: "TX", volume: "12%", lat: 29.7, lon: -95.3, hub: "Secondary", seized2025: "1,654 kg", deaths2025: "2,876" },
    { city: "Denver", state: "CO", volume: "10%", lat: 39.7, lon: -104.9, hub: "Mountain Hub", seized2025: "1,234 kg", deaths2025: "2,345" }
  ],
  
  // Monthly flow data in kg
  monthlyFlow: {
    production: 1850, // kg produced in Mexico
    seized: 285, // kg seized at border
    usDeaths: 7150 // monthly overdose deaths
  }
};

// Interactive SVG Map Component
function InteractiveCorridorMap({ 
  selectedLayer, 
  hoveredItem, 
  setHoveredItem,
  selectedTunnel,
  setSelectedTunnel 
}) {
  const width = 800;
  const height = 500;
  
  // Coordinate conversion (Mercator-like approximation)
  const latLonToXY = (lat, lon) => {
    // Focus on North America region
    const x = ((lon + 130) / 60) * width; // -130 to -70 longitude
    const y = ((50 - lat) / 40) * height; // 10 to 50 latitude
    return { x: Math.max(0, Math.min(width, x)), y: Math.max(0, Math.min(height, y)) };
  };

  // Check if coordinates are visible in our view
  const isVisible = (lat, lon) => {
    return lat >= 10 && lat <= 50 && lon >= -130 && lon <= -70;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", background: "#0a0e14", borderRadius: 8 }}>
      <defs>
        {/* Glow filters */}
        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Markers */}
        <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#00e676" />
        </marker>
        <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff1744" />
        </marker>
      </defs>
      
      {/* Ocean background */}
      <rect width={width} height={height} fill="#0a1628" />
      
      {/* Country backgrounds - Mexico */}
      <path 
        d={`M ${latLonToXY(32, -117).x} ${latLonToXY(32, -117).y}
            L ${latLonToXY(32, -108).x} ${latLonToXY(32, -108).y}
            L ${latLonToXY(22, -97).x} ${latLonToXY(22, -97).y}
            L ${latLonToXY(14, -92).x} ${latLonToXY(14, -92).y}
            L ${latLonToXY(22, -105).x} ${latLonToXY(22, -105).y}
            L ${latLonToXY(32, -117).x} ${latLonToXY(32, -117).y}`}
        fill="#1a2332" 
        stroke="#30363d" 
        strokeWidth="1"
        opacity="0.8"
      />
      
      {/* Country backgrounds - US */}
      <path 
        d={`M ${latLonToXY(49, -125).x} ${latLonToXY(49, -125).y}
            L ${latLonToXY(49, -100).x} ${latLonToXY(49, -100).y}
            L ${latLonToXY(25, -80).x} ${latLonToXY(25, -80).y}
            L ${latLonToXY(25, -97).x} ${latLonToXY(25, -97).y}
            L ${latLonToXY(32, -117).x} ${latLonToXY(32, -117).y}
            L ${latLonToXY(49, -125).x} ${latLonToXY(49, -125).y}`}
        fill="#161b22" 
        stroke="#30363d" 
        strokeWidth="1"
        opacity="0.8"
      />
      
      {/* Country labels */}
      <text x={latLonToXY(24, -102).x} y={latLonToXY(24, -102).y} fill="#6e7681" fontSize="14" fontWeight="bold" opacity="0.5">MEXICO</text>
      <text x={latLonToXY(40, -110).x} y={latLonToXY(40, -110).y} fill="#6e7681" fontSize="14" fontWeight="bold" opacity="0.5">UNITED STATES</text>
      
      {/* US-Mexico border - highlighted */}
      <path
        d={`M ${latLonToXY(32, -117).x} ${latLonToXY(32, -117).y}
            Q ${latLonToXY(31, -111).x} ${latLonToXY(31, -111).y} ${latLonToXY(31, -108).x} ${latLonToXY(31, -108).y}
            L ${latLonToXY(29, -104).x} ${latLonToXY(29, -104).y}
            L ${latLonToXY(27, -100).x} ${latLonToXY(27, -100).y}
            L ${latLonToXY(25, -97).x} ${latLonToXY(25, -97).y}`}
        fill="none"
        stroke="#ff1744"
        strokeWidth="3"
        strokeDasharray="10,5"
        filter="url(#glow-red)"
        opacity="0.9"
      />
      <text x={latLonToXY(28, -107).x} y={latLonToXY(28, -107).y} fill="#ff1744" fontSize="8" fontWeight="bold">US-MEXICO BORDER</text>
      
      {/* Precursor routes from China */}
      {(selectedLayer === 'all' || selectedLayer === 'precursors') && (
        <>
          {FENTANYL_DATA.precursorRoutes.map((route, i) => {
            const from = latLonToXY(route.from.lat, route.from.lon);
            const to = latLonToXY(route.to.lat, route.to.lon);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 50; // Arc curve
            
            const isHovered = hoveredItem === `route-${route.id}`;
            
            return (
              <g key={i}>
                {/* Route line with curve */}
                <path 
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  fill="none" 
                  stroke={route.color} 
                  strokeWidth={isHovered ? "4" : "2"}
                  opacity={isHovered ? "1" : "0.7"}
                  filter="url(#glow-green)"
                  markerEnd={`url(#arrowhead-${route.color === '#00e676' ? 'green' : 'red'})`}
                  style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={() => setHoveredItem(`route-${route.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                />
                {/* Route label on hover */}
                {isHovered && (
                  <g>
                    <rect x={midX - 60} y={midY - 25} width="120" height="40" fill="#161b22" rx="4" opacity="0.95" />
                    <text x={midX} y={midY - 10} textAnchor="middle" fill="#e6edf3" fontSize="8" fontWeight="bold">{route.name}</text>
                    <text x={midX} y={midY + 2} textAnchor="middle" fill={route.color} fontSize="7">{route.volume}</text>
                    <text x={midX} y={midY + 12} textAnchor="middle" fill="#8b949e" fontSize="6">{route.method}</text>
                  </g>
                )}
              </g>
            );
          })}
          
          {/* China origin label */}
          <g>
            <circle cx={latLonToXY(35, 120).x} cy={latLonToXY(35, 120).y} r="8" fill="#ff1744" opacity="0.8">
              <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={latLonToXY(35, 120).x} y={latLonToXY(35, 120).y - 15} textAnchor="middle" fill="#e6edf3" fontSize="9" fontWeight="bold">CHINA</text>
            <text x={latLonToXY(35, 120).x} y={latLonToXY(35, 120).y + 20} textAnchor="middle" fill="#00e676" fontSize="7">Precursor Source</text>
          </g>
        </>
      )}
      
      {/* Production centers in Mexico */}
      {(selectedLayer === 'all' || selectedLayer === 'production') && FENTANYL_DATA.productionCenters.map((center, i) => {
        const pos = latLonToXY(center.lat, center.lon);
        const isHovered = hoveredItem === `prod-${i}`;
        
        return (
          <g key={i} style={{ cursor: 'pointer' }}>
            {/* Pulse animation ring */}
            <circle cx={pos.x} cy={pos.y} r={isHovered ? "12" : "8"} fill="none" stroke="#ff1744" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Main circle */}
            <circle 
              cx={pos.x} 
              cy={pos.y} 
              r={isHovered ? "8" : "6"} 
              fill="#ff1744"
              filter="url(#glow-red)"
              onMouseEnter={() => setHoveredItem(`prod-${i}`)}
              onMouseLeave={() => setHoveredItem(null)}
            />
            {/* Label */}
            <text x={pos.x + 10} y={pos.y} fill="#ff8a80" fontSize="8" fontWeight="500">{center.name}</text>
            {/* Tooltip on hover */}
            {isHovered && (
              <g>
                <rect x={pos.x + 5} y={pos.y - 35} width="100" height="45" fill="#161b22" rx="4" stroke="#ff1744" strokeWidth="1" />
                <text x={pos.x + 55} y={pos.y - 22} textAnchor="middle" fill="#e6edf3" fontSize="8" fontWeight="bold">{center.name} Lab</text>
                <text x={pos.x + 55} y={pos.y - 12} textAnchor="middle" fill="#ff1744" fontSize="7">{center.cartel}</text>
                <text x={pos.x + 55} y={pos.y - 2} textAnchor="middle" fill="#8b949e" fontSize="7">{center.output}</text>
              </g>
            )}
          </g>
        );
      })}
      
      {/* Border crossings */}
      {(selectedLayer === 'all' || selectedLayer === 'border') && FENTANYL_DATA.borderCrossings.map((crossing, i) => {
        const pos = latLonToXY(crossing.lat, crossing.lon);
        const isHovered = hoveredItem === `border-${i}`;
        
        return (
          <g key={i} style={{ cursor: 'pointer' }}>
            {/* Diamond shape for border */}
            <polygon 
              points={`${pos.x},${pos.y - (isHovered ? 10 : 7)} ${pos.x + (isHovered ? 10 : 7)},${pos.y} ${pos.x},${pos.y + (isHovered ? 10 : 7)} ${pos.x - (isHovered ? 10 : 7)},${pos.y}`}
              fill="#ffd600"
              stroke="#ffaa00"
              strokeWidth="1"
              filter={isHovered ? "url(#glow-green)" : ""}
              onMouseEnter={() => setHoveredItem(`border-${i}`)}
              onMouseLeave={() => setHoveredItem(null)}
            />
            {/* Percentage label */}
            <text x={pos.x} y={pos.y + 20} textAnchor="middle" fill="#ffd600" fontSize="8" fontWeight="bold">{crossing.volume}</text>
            {/* Tooltip */}
            {isHovered && (
              <g>
                <rect x={pos.x + 15} y={pos.y - 50} width="130" height="65" fill="#161b22" rx="4" stroke="#ffd600" strokeWidth="1" />
                <text x={pos.x + 80} y={pos.y - 35} textAnchor="middle" fill="#e6edf3" fontSize="8" fontWeight="bold">{crossing.name}</text>
                <text x={pos.x + 80} y={pos.y - 23} textAnchor="middle" fill="#ffd600" fontSize="7">Volume: {crossing.volume}</text>
                <text x={pos.x + 80} y={pos.y - 13} textAnchor="middle" fill="#8b949e" fontSize="6">{crossing.mxCity} → {crossing.usCity}</text>
                <text x={pos.x + 80} y={pos.y - 3} textAnchor="middle" fill="#8b949e" fontSize="6">Method: {crossing.method}</text>
                <text x={pos.x + 80} y={pos.y + 7} textAnchor="middle" fill="#ff1744" fontSize="6">Controlled: {crossing.controlledBy}</text>
              </g>
            )}
          </g>
        );
      })}
      
      {/* US Distribution hubs */}
      {(selectedLayer === 'all' || selectedLayer === 'distribution') && FENTANYL_DATA.usDistribution.map((hub, i) => {
        const pos = latLonToXY(hub.lat, hub.hub);
        const isHovered = hoveredItem === `hub-${i}`;
        
        return (
          <g key={i} style={{ cursor: 'pointer' }}>
            {/* Hub circle - size based on volume */}
            <circle 
              cx={pos.x} 
              cy={pos.y} 
              r={isHovered ? "10" : "5"} 
              fill="#e040fb"
              opacity={isHovered ? "1" : "0.8"}
              filter={isHovered ? "url(#glow-green)" : ""}
              onMouseEnter={() => setHoveredItem(`hub-${i}`)}
              onMouseLeave={() => setHoveredItem(null)}
            />
            {/* City label */}
            <text x={pos.x + 8} y={pos.y + 3} fill="#d580ff" fontSize="7">{hub.city}</text>
            {/* Tooltip */}
            {isHovered && (
              <g>
                <rect x={pos.x + 10} y={pos.y - 55} width="110" height="70" fill="#161b22" rx="4" stroke="#e040fb" strokeWidth="1" />
                <text x={pos.x + 65} y={pos.y - 40} textAnchor="middle" fill="#e6edf3" fontSize="8" fontWeight="bold">{hub.city}, {hub.state}</text>
                <text x={pos.x + 65} y={pos.y - 28} textAnchor="middle" fill="#e040fb" fontSize="7">Volume: {hub.volume}</text>
                <text x={pos.x + 65} y={pos.y - 18} textAnchor="middle" fill="#8b949e" fontSize="6">Type: {hub.hub}</text>
                <text x={pos.x + 65} y={pos.y - 8} textAnchor="middle" fill="#8b949e" fontSize="6">Seized: {hub.seized2025}</text>
                <text x={pos.x + 65} y={pos.y + 2} textAnchor="middle" fill="#ff1744" fontSize="6">Deaths: {hub.deaths2025}</text>
              </g>
            )}
          </g>
        );
      })}
      
      {/* Smuggling tunnels */}
      {selectedTunnel !== null && (
        <>
          {FENTANYL_DATA.tunnels.filter(t => t.id === selectedTunnel).map((tunnel, i) => {
            const mxPos = latLonToXY(32 - (tunnel.id * 0.5), -117 + (tunnel.id * 2));
            const usPos = latLonToXY(32.5 - (tunnel.id * 0.5), -117 + (tunnel.id * 2));
            
            return (
              <g key={i}>
                {/* Tunnel line */}
                <line x1={mxPos.x} y1={mxPos.y} x2={usPos.x} y2={usPos.y} 
                  stroke="#ffd600" strokeWidth="4" strokeDasharray="5,3" opacity="0.8" />
                {/* Underground indicator */}
                <text x={(mxPos.x + usPos.x) / 2} y={(mxPos.y + usPos.y) / 2 - 5} 
                  textAnchor="middle" fill="#ffd600" fontSize="7" fontWeight="bold">
                  TUNNEL: {tunnel.length}
                </text>
                <text x={(mxPos.x + usPos.x) / 2} y={(mxPos.y + usPos.y) / 2 + 5} 
                  textAnchor="middle" fill="#8b949e" fontSize="6">
                  Depth: {tunnel.depth}
                </text>
              </g>
            );
          })}
        </>
      )}
      
      {/* Legend */}
      <g transform={`translate(10, ${height - 130})`}>
        <rect x="-5" y="-5" width="140" height="125" fill="#161b22" rx="4" opacity="0.95" stroke="#30363d" strokeWidth="1" />
        <text x="0" y="10" fill="#e6edf3" fontSize="10" fontWeight="bold">MAP LEGEND</text>
        
        <circle cx="5" cy="25" r="5" fill="#ff1744" />
        <text x="15" y="28" fill="#8b949e" fontSize="8">Production Lab</text>
        
        <line x1="2" y1="40" x2="12" y2="40" stroke="#00e676" strokeWidth="2" />
        <text x="15" y="43" fill="#8b949e" fontSize="8">Precursor Route</text>
        
        <polygon points="5,52 10,57 5,62 0,57" fill="#ffd600" />
        <text x="15" y="60" fill="#8b949e" fontSize="8">Border Crossing</text>
        
        <circle cx="5" cy="72" r="4" fill="#e040fb" />
        <text x="15" y="75" fill="#8b949e" fontSize="8">US Distribution</text>
        
        <line x1="2" y1="85" x2="12" y2="85" stroke="#ffd600" strokeWidth="3" strokeDasharray="3,2" />
        <text x="15" y="88" fill="#8b949e" fontSize="8">Smuggling Tunnel</text>
        
        <line x1="2" y1="100" x2="12" y2="100" stroke="#ff1744" strokeWidth="2" strokeDasharray="5,3" />
        <text x="15" y="103" fill="#8b949e" fontSize="8">US-Mexico Border</text>
      </g>
      
      {/* Stats overlay */}
      <g transform={`translate(${width - 160}, 10)`}>
        <rect x="0" y="0" width="150" height="80" fill="#161b22" rx="4" opacity="0.95" stroke="#ff1744" strokeWidth="1" />
        <text x="75" y="18" textAnchor="middle" fill="#e6edf3" fontSize="9" fontWeight="bold">MONTHLY IMPACT</text>
        <text x="10" y="35" fill="#ff1744" fontSize="8">Production:</text>
        <text x="140" y="35" textAnchor="end" fill="#ff1744" fontSize="10" fontWeight="bold">{FENTANYL_DATA.monthlyFlow.production} kg</text>
        <text x="10" y="50" fill="#ffd600" fontSize="8">Seized:</text>
        <text x="140" y="50" textAnchor="end" fill="#ffd600" fontSize="10" fontWeight="bold">{FENTANYL_DATA.monthlyFlow.seized} kg</text>
        <text x="10" y="68" fill="#e040fb" fontSize="8">US Deaths:</text>
        <text x="140" y="68" textAnchor="end" fill="#e040fb" fontSize="10" fontWeight="bold">{FENTANYL_DATA.monthlyFlow.usDeaths.toLocaleString()}</text>
      </g>
      
      {/* Title */}
      <text x={width/2} y="25" textAnchor="middle" fill="#e6edf3" fontSize="12" fontWeight="bold">
        FENTANYL TRAFFICKING CORRIDORS: CHINA → MEXICO → USA
      </text>
      <text x={width/2} y="40" textAnchor="middle" fill="#8b949e" fontSize="8">
        Interactive visualization of the fentanyl supply chain and distribution network
      </text>
    </svg>
  );
}

export default function FentanylCorridorMap() {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedTunnel, setSelectedTunnel] = useState(null);
  const [selectedCrossing, setSelectedCrossing] = useState(null);

  const layers = [
    { key: 'all', label: '🌎 ALL', color: '#e6edf3', desc: 'Complete trafficking network' },
    { key: 'precursors', label: '🟢 PRECURSORS', color: '#00e676', desc: 'China → Mexico chemical shipments' },
    { key: 'production', label: '🔴 PRODUCTION', color: '#ff1744', desc: 'Cartel lab locations in Mexico' },
    { key: 'border', label: '🟡 BORDER', color: '#ffd600', desc: 'Smuggling crossing points' },
    { key: 'distribution', label: '🟣 DISTRIBUTION', color: '#e040fb', desc: 'US hub cities' }
  ];

  return (
    <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: 1 }}>
            💊 FENTANYL CORRIDOR MAPPING
          </div>
          <div style={{ fontSize: 10, color: "#8b949e", marginTop: 4 }}>
            China Precursors → Mexico Production → US Distribution
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
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {layers.map(layer => (
          <button
            key={layer.key}
            onClick={() => setSelectedLayer(layer.key)}
            style={{
              padding: "6px 12px", borderRadius: 6,
              background: selectedLayer === layer.key ? layer.color : "#0d1117",
              color: selectedLayer === layer.key ? "#000" : layer.color,
              border: `2px solid ${layer.color}`,
              fontSize: 9, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {layer.label}
          </button>
        ))}
      </div>
      
      {/* Layer description */}
      <div style={{ fontSize: 9, color: "#6e7681", marginBottom: 12, fontStyle: "italic" }}>
        {layers.find(l => l.key === selectedLayer)?.desc}
      </div>

      {/* Interactive Map */}
      <div style={{ borderRadius: 8, overflow: "hidden", border: "2px solid #30363d", marginBottom: 16 }}>
        <InteractiveCorridorMap 
          selectedLayer={selectedLayer}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          selectedTunnel={selectedTunnel}
          setSelectedTunnel={setSelectedTunnel}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left column: Border crossings */}
        <div>
          <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600, marginBottom: 10 }}>
            🛂 BORDER CROSSING DETAILS
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {FENTANYL_DATA.borderCrossings.map((crossing, i) => (
              <div 
                key={i}
                onClick={() => setSelectedCrossing(selectedCrossing === i ? null : i)}
                onMouseEnter={() => setHoveredItem(`border-${i}`)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: "10px 12px", background: "#0d1117", borderRadius: 6,
                  border: "1px solid #1a2332", cursor: "pointer",
                  borderLeft: `4px solid ${selectedCrossing === i ? "#ffd600" : "#1a2332"}`,
                  transition: "all 0.2s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#e6edf3", fontWeight: 600 }}>{crossing.name}</div>
                    <div style={{ fontSize: 8, color: "#6e7681" }}>{crossing.mxCity} → {crossing.usCity}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, color: "#ffd600", fontWeight: 700 }}>{crossing.volume}</div>
                    <div style={{ fontSize: 7, color: "#6e7681" }}>of total flow</div>
                  </div>
                </div>
                {selectedCrossing === i && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a2332" }}>
                    <div style={{ display: "grid", gap: 4 }}>
                      <div style={{ fontSize: 8, color: "#8b949e" }}>Seized 2025: <span style={{ color: "#ffd600" }}>{crossing.fentanylSeized}</span></div>
                      <div style={{ fontSize: 8, color: "#8b949e" }}>Method: <span style={{ color: "#e6edf3" }}>{crossing.method}</span></div>
                      <div style={{ fontSize: 8, color: "#8b949e" }}>Controlled by: <span style={{ color: "#ff1744" }}>{crossing.controlledBy}</span></div>
                      <div style={{ fontSize: 8, color: "#8b949e" }}>Status: <span style={{ color: crossing.status === 'active' ? '#00e676' : '#ff6d00' }}>{crossing.status.toUpperCase()}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Tunnels & Stats */}
        <div>
          <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600, marginBottom: 10 }}>
            🚇 SMUGGLING TUNNELS
          </div>
          <div style={{ display: "grid", gap: 6, marginBottom: 16 }}>
            {FENTANYL_DATA.tunnels.map((tunnel, i) => (
              <div 
                key={i}
                onClick={() => setSelectedTunnel(selectedTunnel === tunnel.id ? null : tunnel.id)}
                style={{
                  padding: "8px 10px", background: "#0d1117", borderRadius: 4,
                  border: "1px solid #1a2332", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  borderLeft: `3px solid ${tunnel.status === 'active' ? '#ffd600' : '#6e7681'}`
                }}
              >
                <div>
                  <div style={{ fontSize: 9, color: "#e6edf3" }}>{tunnel.mxLocation} → {tunnel.usLocation}</div>
                  <div style={{ fontSize: 7, color: "#8b949e" }}>{tunnel.length} • {tunnel.depth} deep</div>
                </div>
                <div style={{ 
                  fontSize: 7, padding: "2px 6px", borderRadius: 3,
                  background: tunnel.status === 'active' ? '#ffd60020' : '#6e768120',
                  color: tunnel.status === 'active' ? '#ffd600' : '#6e7681'
                }}>
                  {tunnel.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Precursor flow */}
          <div style={{ 
            padding: 12, background: "#0d1117", borderRadius: 6, border: "1px solid #1a2332"
          }}>
            <div style={{ fontSize: 10, color: "#e6edf3", fontWeight: 600, marginBottom: 8 }}>
              📦 PRECURSOR CHEMICAL FLOW
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {FENTANYL_DATA.precursorRoutes.map((route, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 8, color: "#8b949e" }}>
                    <span style={{ color: route.color }}>●</span> {route.from.name} → {route.to.name}
                  </div>
                  <div style={{ fontSize: 8, color: "#e6edf3", fontWeight: 500 }}>{route.volume}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* US Distribution summary */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600, marginBottom: 10 }}>
          🇺🇸 US DISTRIBUTION HUBS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {FENTANYL_DATA.usDistribution.map((hub, i) => (
            <div key={i} style={{
              padding: "10px", background: "#0d1117", borderRadius: 6,
              border: "1px solid #1a2332", textAlign: "center"
            }}>
              <div style={{ fontSize: 10, color: "#e6edf3", fontWeight: 600 }}>{hub.city}</div>
              <div style={{ fontSize: 8, color: "#6e7681" }}>{hub.state}</div>
              <div style={{ fontSize: 14, color: "#e040fb", fontWeight: 700, margin: "4px 0" }}>{hub.volume}</div>
              <div style={{ fontSize: 7, color: "#ff1744" }}>{hub.deaths2025} deaths</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ fontSize: 7, color: "#484f58", marginTop: 16, textAlign: "center" }}>
        DATA SOURCES: DEA 2026 Fentanyl Trafficking Report • CBP Seizure Statistics • CDC Overdose Data • Mexican Government Intelligence
      </div>
    </div>
  );
}

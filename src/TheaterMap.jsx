import { useState, useRef, useEffect } from "react";
import { US_NAVAL_ASSETS, US_BASES, IRAN_ASSETS } from "./data";

// Enhanced country paths with more detail
const COUNTRIES = [
  // Iran - detailed outline
  { 
    name: "Iran", 
    path: "M 465,120 L 475,115 490,110 510,108 530,112 550,120 565,135 575,155 580,180 575,210 565,235 550,255 530,265 510,260 490,250 470,240 455,225 445,205 440,185 445,165 455,145 460,130 Z",
    fill: "url(#iranGradient)", 
    stroke: "#ff1744", 
    strokeWidth: 2.5,
    highlight: true
  },
  // Iraq
  { 
    name: "Iraq", 
    path: "M 415,155 L 435,148 450,152 460,165 465,185 462,205 450,220 435,228 420,225 410,215 405,200 408,180 412,165 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Saudi Arabia - large
  { 
    name: "Saudi Arabia", 
    path: "M 360,230 L 400,225 430,232 455,240 475,255 485,285 480,315 465,345 435,365 395,375 355,370 325,350 310,320 315,285 330,255 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Turkey
  { 
    name: "Turkey", 
    path: "M 310,85 L 340,78 380,82 420,88 450,95 465,105 470,120 460,135 440,145 415,150 385,148 355,140 330,125 315,105 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Syria
  { 
    name: "Syria", 
    path: "M 365,140 L 390,135 410,142 415,160 410,178 395,188 375,190 362,182 358,165 360,150 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Jordan
  { 
    name: "Jordan", 
    path: "M 355,195 L 375,193 395,198 402,215 395,230 378,238 362,235 352,220 350,205 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Israel/Palestine
  { 
    name: "Israel", 
    path: "M 345,175 L 355,170 362,180 360,200 355,210 348,205 342,190 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Lebanon
  { 
    name: "Lebanon", 
    path: "M 365,165 L 375,162 378,175 375,185 368,188 362,180 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 0.5
  },
  // Kuwait
  { 
    name: "Kuwait", 
    path: "M 438,212 L 455,208 462,218 458,230 445,232 435,225 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 0.5
  },
  // Qatar
  { 
    name: "Qatar", 
    path: "M 495,248 L 510,242 518,252 515,268 502,272 492,262 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 0.5
  },
  // Bahrain
  { 
    name: "Bahrain", 
    path: "M 485,240 L 495,237 500,245 498,255 488,255 482,248 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 0.5
  },
  // UAE
  { 
    name: "UAE", 
    path: "M 510,260 L 540,250 555,258 560,275 555,290 540,295 525,290 515,278 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Oman
  { 
    name: "Oman", 
    path: "M 540,255 L 570,242 590,250 600,275 595,305 580,330 560,340 540,325 530,300 532,275 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Yemen
  { 
    name: "Yemen", 
    path: "M 420,325 L 460,315 495,318 515,335 510,360 490,378 460,385 430,378 410,360 408,340 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Egypt
  { 
    name: "Egypt", 
    path: "M 295,180 L 335,175 360,185 375,210 378,245 370,285 355,320 335,350 310,365 285,355 270,320 265,280 270,240 280,205 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Pakistan
  { 
    name: "Pakistan", 
    path: "M 580,145 L 620,125 665,130 690,155 685,195 670,230 645,255 610,265 585,250 575,220 578,185 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
  // Afghanistan
  { 
    name: "Afghanistan", 
    path: "M 565,105 L 605,95 645,100 670,120 675,145 660,160 625,155 590,145 568,130 560,115 Z",
    fill: "#0d1117", 
    stroke: "#3d444d", 
    strokeWidth: 1
  },
];

// Water bodies with better styling
const WATERS = [
  { name: "Persian Gulf", path: "M 455,220 L 475,205 495,210 515,220 530,235 540,255 535,275 520,285 505,280 490,265 475,250 465,235 Z", highlight: true },
  { name: "Gulf of Oman", path: "M 545,245 L 580,230 610,240 620,265 610,290 585,300 560,295 545,280 Z" },
  { name: "Arabian Sea", path: "M 450,370 L 520,350 600,330 680,340 750,360 800,400 800,500 700,500 600,480 520,450 460,420 Z" },
  { name: "Red Sea", path: "M 310,190 L 340,185 360,210 370,250 375,295 370,340 360,380 345,400 330,385 325,345 320,295 315,245 312,210 Z", highlight: true },
  { name: "Mediterranean", path: "M 260,105 L 320,98 360,108 385,130 380,155 355,168 315,172 275,165 245,150 250,125 Z" },
  { name: "Caspian Sea", path: "M 485,75 L 520,68 545,85 555,115 550,145 535,160 510,155 495,135 485,105 Z" },
  { name: "Strait of Hormuz", path: "M 525,238 L 545,232 555,245 550,265 530,270 520,258 Z", critical: true },
];

// Major cities
const CITIES = [
  { name: "Tehran", lat: 35.7, lon: 51.4, country: "Iran", type: "capital" },
  { name: "Baghdad", lat: 33.3, lon: 44.4, country: "Iraq", type: "capital" },
  { name: "Riyadh", lat: 24.7, lon: 46.7, country: "Saudi", type: "capital" },
  { name: "Abu Dhabi", lat: 24.5, lon: 54.4, country: "UAE", type: "capital" },
  { name: "Doha", lat: 25.3, lon: 51.2, country: "Qatar", type: "capital" },
  { name: "Muscat", lat: 23.6, lon: 58.4, country: "Oman", type: "capital" },
  { name: "Kuwait City", lat: 29.4, lon: 48.0, country: "Kuwait", type: "capital" },
  { name: "Jerusalem", lat: 31.8, lon: 35.2, country: "Israel", type: "capital" },
  { name: "Damascus", lat: 33.5, lon: 36.3, country: "Syria", type: "capital" },
  { name: "Amman", lat: 31.9, lon: 35.9, country: "Jordan", type: "capital" },
  { name: "Cairo", lat: 30.0, lon: 31.2, country: "Egypt", type: "capital" },
  { name: "Ankara", lat: 39.9, lon: 32.9, country: "Turkey", type: "capital" },
  { name: "Islamabad", lat: 33.7, lon: 73.1, country: "Pakistan", type: "capital" },
  { name: "Kabul", lat: 34.5, lon: 69.2, country: "Afghanistan", type: "capital" },
  { name: "Sana'a", lat: 15.4, lon: 44.2, country: "Yemen", type: "capital" },
];

// Distance rings (km)
const RANGE_RINGS = [
  { center: [35.7, 51.4], radius: 150, label: "150km" }, // Tehran
  { center: [26.5, 56.3], radius: 100, label: "Hormuz" }, // Strait
];

const MAP_BOUNDS = { minLat: 10, maxLat: 42, minLon: 25, maxLon: 75 };
const WIDTH = 1000;
const HEIGHT = 650;

function project(lat, lon) {
  const x = ((lon - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * WIDTH;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * HEIGHT;
  return [x, y];
}

// Compass Rose Component
function CompassRose({ x, y, size = 60 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={size/2} fill="#0d1117" stroke="#30363d" strokeWidth="1" />
      {/* N */}
      <text x="0" y={-size/2 - 5} fill="#ff1744" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
      {/* Compass lines */}
      <line x1="0" y1={-size/2 + 5} x2="0" y2={size/2 - 5} stroke="#30363d" strokeWidth="1" />
      <line x1={-size/2 + 5} y1="0" x2={size/2 - 5} y2="0" stroke="#30363d" strokeWidth="1" />
      {/* Diagonal */}
      <line x1={-size/3} y1={-size/3} x2={size/3} y2={size/3} stroke="#1a2332" strokeWidth="0.5" />
      <line x1={size/3} y1={-size/3} x2={-size/3} y2={size/3} stroke="#1a2332" strokeWidth="0.5" />
      {/* Center */}
      <circle cx="0" cy="0" r="3" fill="#ff1744" />
    </g>
  );
}

// Scale Bar Component
function ScaleBar({ x, y }) {
  const barWidth = 100;
  const km = 500;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={barWidth} height="6" fill="#0d1117" stroke="#6e7681" strokeWidth="0.5" />
      <rect x="0" y="0" width={barWidth/2} height="6" fill="#6e7681" />
      <text x="0" y="18" fill="#6e7681" fontSize="8" fontFamily="monospace">0</text>
      <text x={barWidth/2} y="18" fill="#6e7681" fontSize="8" fontFamily="monospace">{km/2}km</text>
      <text x={barWidth} y="18" fill="#6e7681" fontSize="8" fontFamily="monospace" textAnchor="end">{km}km</text>
    </g>
  );
}

export default function TheaterMap({ onAssetSelect, activeLayer }) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleMouseEnter = (item, e, type = 'asset') => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name: item.name,
      details: item.details || "",
      type: type,
      extra: type === 'city' ? item.country : item.type
    });
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset.id);
    onAssetSelect?.(asset);
  };

  const showUS = activeLayer === "all" || activeLayer === "us";
  const showIran = activeLayer === "all" || activeLayer === "iran";

  useEffect(() => {
    // Pulse animation for critical assets
    const interval = setInterval(() => {
      // Trigger re-render for pulsing effects
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      position: "relative", 
      width: "100%", 
      overflow: "hidden", 
      background: "linear-gradient(180deg, #030810 0%, #0a1628 50%, #061224 100%)", 
      borderRadius: 12, 
      border: "2px solid #1a2332",
      boxShadow: "0 0 40px rgba(41, 121, 255, 0.1)"
    }}>
      {/* Map Header */}
      <div style={{
        position: "absolute",
        top: 12,
        left: 15,
        zIndex: 10,
        background: "rgba(13, 17, 23, 0.9)",
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #30363d",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#e6edf3", letterSpacing: 1 }}>
          🗺️ THEATER OF OPERATIONS — CENTCOM AOR
        </div>
        <div style={{ fontSize: 9, color: "#6e7681", marginTop: 2 }}>
          Lat: 10°N-42°N | Lon: 25°E-75°E
        </div>
      </div>

      <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          {/* Gradients */}
          <radialGradient id="iranGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1a0f0f" />
            <stop offset="50%" stopColor="#150a0a" />
            <stop offset="100%" stopColor="#0d0505" />
          </radialGradient>
          <radialGradient id="waterGradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#0a1a2e" />
            <stop offset="100%" stopColor="#061220" />
          </radialGradient>
          <radialGradient id="threatGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2979ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2979ff" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Grid pattern */}
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0a1525" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width={WIDTH} height={HEIGHT} fill="#030810" />
        
        {/* Grid Overlay */}
        <rect width={WIDTH} height={HEIGHT} fill="url(#grid)" />

        {/* Coordinate Lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={`coord-${i}`}>
            <line 
              x1={i * (WIDTH / 10)} y1={0} 
              x2={i * (WIDTH / 10)} y2={HEIGHT} 
              stroke="#0f1a2a" strokeWidth="0.3" opacity="0.5" 
            />
            <text 
              x={i * (WIDTH / 10)} y={HEIGHT - 5} 
              fill="#1a2a3a" fontSize="7" fontFamily="monospace" 
              textAnchor="middle"
            >
              {Math.round(25 + i * 5)}°E
            </text>
          </g>
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={`lat-${i}`}>
            <line 
              x1={0} y1={i * (HEIGHT / 8)} 
              x2={WIDTH} y2={i * (HEIGHT / 8)} 
              stroke="#0f1a2a" strokeWidth="0.3" opacity="0.5" 
            />
            <text 
              x={5} y={i * (HEIGHT / 8) + 10} 
              fill="#1a2a3a" fontSize="7" fontFamily="monospace"
            >
              {Math.round(42 - i * 4)}°N
            </text>
          </g>
        ))}

        {/* Water bodies */}
        {WATERS.map((w, i) => (
          <path 
            key={w.name} 
            d={w.path} 
            fill={w.critical ? "url(#waterGradient)" : "#061224"} 
            stroke={w.critical ? "#ff174440" : "#0a2040"} 
            strokeWidth={w.critical ? 2 : 0.5}
            opacity={w.highlight ? 0.9 : 0.7}
          >
            {w.critical && (
              <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            )}
          </path>
        ))}

        {/* Strait of Hormuz Critical Zone */}
        <path 
          d="M 525,235 L 545,228 560,240 555,260 540,268 525,258 Z" 
          fill="#ff174420" 
          stroke="#ff1744" 
          strokeWidth="2" 
          strokeDasharray="5,3"
        >
          <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
        </path>
        <text x="540" y="250" fill="#ff1744" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          ⚠ STRAIT OF HORMUZ
        </text>
        <text x="540" y="260" fill="#ff8a80" fontSize="6" fontFamily="monospace" textAnchor="middle">
          20% Global Oil Transit
        </text>

        {/* Countries */}
        {COUNTRIES.map(c => (
          <path 
            key={c.name} 
            d={c.path} 
            fill={c.fill} 
            stroke={hoveredCountry === c.name ? "#fff" : c.stroke} 
            strokeWidth={hoveredCountry === c.name ? 3 : c.strokeWidth}
            opacity={c.highlight ? 1 : hoveredCountry && hoveredCountry !== c.name ? 0.4 : 0.8}
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={() => setHoveredCountry(c.name)}
            onMouseLeave={() => setHoveredCountry(null)}
            filter={c.highlight ? "url(#glow)" : undefined}
          >
            {c.highlight && (
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            )}
          </path>
        ))}

        {/* Country Labels */}
        <text x="515" y="200" fill="#ff1744" fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold" letterSpacing="3" filter="url(#glow)">
          IRAN
        </text>
        <text x="435" y="195" fill="#556" fontSize="10" fontFamily="monospace" textAnchor="middle">IRAQ</text>
        <text x="430" y="300" fill="#556" fontSize="10" fontFamily="monospace" textAnchor="middle">SAUDI ARABIA</text>
        <text x="395" y="120" fill="#556" fontSize="10" fontFamily="monospace" textAnchor="middle">TURKEY</text>
        <text x="535" y="280" fill="#556" fontSize="9" fontFamily="monospace" textAnchor="middle">UAE</text>
        <text x="570" y="300" fill="#556" fontSize="9" fontFamily="monospace" textAnchor="middle">OMAN</text>

        {/* Cities */}
        {CITIES.map(city => {
          const [x, y] = project(city.lat, city.lon);
          return (
            <g key={city.name} onMouseEnter={(e) => handleMouseEnter(city, e, 'city')} onMouseLeave={() => setTooltip(null)}>
              <circle cx={x} cy={y} r="2.5" fill="#ffd600" opacity="0.6" />
              <text x={x + 5} y={y + 1} fill="#8b949e" fontSize="6" fontFamily="monospace" opacity="0.7">
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Threat Rings */}
        <circle 
          cx={project(35.7, 51.4)[0]} 
          cy={project(35.7, 51.4)[1]} 
          r="80" 
          fill="none" 
          stroke="#ff1744" 
          strokeWidth="0.5" 
          strokeDasharray="4,4" 
          opacity="0.3"
        >
          <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Iran Assets */}
        {showIran && IRAN_ASSETS.map(a => {
          const [x, y] = project(a.lat, a.lon);
          const isNuclear = a.type === "nuclear";
          const isChokepoint = a.type === "chokepoint";
          const isEconomic = a.type === "economic";
          const isSelected = selectedAsset === a.id;
          
          const markerColor = isNuclear ? "#ff1744" : isChokepoint ? "#ff6d00" : isEconomic ? "#ffd600" : "#e040fb";
          const markerSize = isNuclear ? 7 : isChokepoint ? 8 : 5;
          
          return (
            <g 
              key={a.id} 
              onClick={() => handleAssetClick(a)} 
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(a, e)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Glow effect */}
              {(isNuclear || isChokepoint || isSelected) && (
                <circle cx={x} cy={y} r={markerSize * 2} fill={`${markerColor}30`}>
                  <animate attributeName="r" values={`${markerSize * 1.5};${markerSize * 2.5};${markerSize * 1.5}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              
              {/* Main marker */}
              <circle 
                cx={x} 
                cy={y} 
                r={markerSize} 
                fill={markerColor} 
                stroke="#fff" 
                strokeWidth={isSelected ? 2 : 1}
                filter="url(#glow)"
              >
                {(isNuclear || isChokepoint) && (
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                )}
              </circle>
              
              {/* Icon for nuclear */}
              {isNuclear && (
                <text x={x} y={y + 1.5} fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">☢</text>
              )}
              
              {/* Label */}
              <text 
                x={x + markerSize + 3} 
                y={y + 2} 
                fill={markerColor} 
                fontSize={isNuclear ? "6.5" : "5.5"} 
                fontFamily="monospace"
                fontWeight={isNuclear ? "bold" : "normal"}
                opacity={hoveredCountry === "Iran" || !hoveredCountry ? 1 : 0.3}
              >
                {a.name.split("(")[0].split(" ").slice(0, 2).join(" ")}
              </text>
            </g>
          );
        })}

        {/* US Bases */}
        {showUS && US_BASES.map(b => {
          const [x, y] = project(b.lat, b.lon);
          const isSelected = selectedAsset === b.id;
          
          return (
            <g 
              key={b.id} 
              onClick={() => handleAssetClick(b)} 
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(b, e)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Base glow */}
              <circle cx={x} cy={y} r="10" fill="url(#blueGlow)" opacity={isSelected ? 1 : 0.6} />
              
              {/* Base marker - square for land bases */}
              <rect 
                x={x - 4} 
                y={y - 4} 
                width="8" 
                height="8" 
                fill="#2979ff" 
                stroke="#fff" 
                strokeWidth={isSelected ? 2 : 1}
                filter="url(#glow)" 
                rx="1"
                transform={isSelected ? `rotate(45, ${x}, ${y})` : undefined}
              />
              
              {/* Label */}
              <text 
                x={x + 10} 
                y={y + 3} 
                fill="#2979ff" 
                fontSize="5.5" 
                fontFamily="monospace"
                opacity={hoveredCountry && hoveredCountry !== b.country ? 0.3 : 1}
              >
                {b.name.split("(")[0].split("Air")[0].split("Camp")[0].split("NSA")[0].trim().slice(0, 14)}
              </text>
            </g>
          );
        })}

        {/* US Naval Assets */}
        {showUS && US_NAVAL_ASSETS.map(a => {
          const [x, y] = project(a.lat, a.lon);
          const isCarrier = a.type === "carrier";
          const isSub = a.type === "submarine";
          const isSelected = selectedAsset === a.id;
          
          const markerColor = isCarrier ? "#2979ff" : isSub ? "#7c4dff" : "#00b0ff";
          const markerSize = isCarrier ? 8 : isSub ? 4 : 4.5;
          
          return (
            <g 
              key={a.id} 
              onClick={() => handleAssetClick(a)} 
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(a, e)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Carrier has larger glow */}
              {isCarrier && (
                <circle cx={x} cy={y} r="22" fill="url(#blueGlow)">
                  <animate attributeName="r" values="18;26;18" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              
              {/* Main marker - circle for naval */}
              <circle 
                cx={x} 
                cy={y} 
                r={markerSize} 
                fill={markerColor} 
                stroke="#fff" 
                strokeWidth={isSelected ? 2 : isCarrier ? 1.5 : 1}
                filter="url(#glow)"
              />
              
              {/* Carrier label */}
              {isCarrier && (
                <text x={x} y={y + 1.5} fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CVN</text>
              )}
              
              {/* Submarine indicator */}
              {isSub && (
                <text x={x} y={y + 1} fill="#fff" fontSize="4" fontFamily="monospace" textAnchor="middle">SSGN</text>
              )}
              
              {/* Name label */}
              <text 
                x={x + (isCarrier ? 12 : 8)} 
                y={y + 3} 
                fill={markerColor} 
                fontSize={isCarrier ? "6.5" : "5"} 
                fontFamily="monospace" 
                fontWeight={isCarrier ? "bold" : "normal"}
              >
                {a.name.match(/USS ([A-Z].+?)(?:\s|$)/)?.[1]?.slice(0, 12) || a.name.slice(0, 10)}
              </text>
            </g>
          );
        })}

        {/* Compass Rose */}
        <CompassRose x={60} y={580} size={80} />

        {/* Scale Bar */}
        <ScaleBar x={850} y={620} />

        {/* Legend Box */}
        <g transform="translate(15, 480)">
          <rect x="0" y="0" width="160" height="140" fill="rgba(13, 17, 23, 0.95)" stroke="#30363d" strokeWidth="1" rx="6" />
          <text x="10" y="18" fill="#e6edf3" fontSize="9" fontFamily="monospace" fontWeight="bold">MAP LEGEND</text>
          
          {/* Legend items */}
          <g transform="translate(10, 30)">
            <rect x="0" y="0" width="8" height="8" fill="#2979ff" rx="1" />
            <text x="14" y="7" fill="#8b949e" fontSize="8" fontFamily="monospace">US Military Base</text>
          </g>
          <g transform="translate(10, 45)">
            <circle cx="4" cy="4" r="4" fill="#2979ff" />
            <text x="14" y="7" fill="#8b949e" fontSize="8" fontFamily="monospace">Carrier (CVN)</text>
          </g>
          <g transform="translate(10, 60)">
            <circle cx="4" cy="4" r="3" fill="#00b0ff" />
            <text x="14" y="7" fill="#8b949e" fontSize="8" fontFamily="monospace">Destroyer/Cruiser</text>
          </g>
          <g transform="translate(10, 75)">
            <circle cx="4" cy="4" r="4" fill="#ff1744" />
            <text x="14" y="7" fill="#8b949e" fontSize="8" fontFamily="monospace">Iran Nuclear Site</text>
          </g>
          <g transform="translate(10, 90)">
            <circle cx="4" cy="4" r="3" fill="#e040fb" />
            <text x="14" y="7" fill="#8b949e" fontSize="8" fontFamily="monospace">Iran Military</text>
          </g>
          <g transform="translate(10, 105)">
            <rect x="0" y="0" width="8" height="2" fill="#ff1744" />
            <text x="14" y="5" fill="#8b949e" fontSize="8" fontFamily="monospace">Strait of Hormuz</text>
          </g>
          <g transform="translate(10, 120)">
            <circle cx="4" cy="3" r="2.5" fill="#ffd600" />
            <text x="14" y="6" fill="#8b949e" fontSize="8" fontFamily="monospace">Capital City</text>
          </g>
        </g>

        {/* Active layer indicator */}
        <text x={WIDTH - 15} y={25} fill="#6e7681" fontSize="9" fontFamily="monospace" textAnchor="end">
          Layer: {activeLayer.toUpperCase()}
        </text>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: Math.min(tooltip.x + 15, WIDTH - 300),
          top: Math.max(tooltip.y - 60, 10),
          background: "rgba(13, 17, 23, 0.95)",
          border: "1px solid #30363d",
          borderRadius: 8,
          padding: "12px 16px",
          pointerEvents: "none",
          zIndex: 100,
          maxWidth: 320,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
        }}>
          <div style={{ 
            color: tooltip.type === 'city' ? "#ffd600" : "#e6edf3", 
            fontWeight: "bold", 
            marginBottom: 6,
            fontSize: 12,
            borderBottom: "1px solid #30363d",
            paddingBottom: 4
          }}>
            {tooltip.name}
            {tooltip.extra && (
              <span style={{ 
                color: "#6e7681", 
                fontWeight: "normal",
                marginLeft: 8,
                fontSize: 10
              }}>
                {tooltip.extra}
              </span>
            )}
          </div>
          <div style={{ color: "#8b949e", lineHeight: 1.5 }}>{tooltip.details}</div>
        </div>
      )}
    </div>
  );
}

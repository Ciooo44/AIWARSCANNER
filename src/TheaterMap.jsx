import { useState, useRef } from "react";
import { US_NAVAL_ASSETS, US_BASES, IRAN_ASSETS } from "./data";

// Simplified but recognizable country outlines for the MENA theater
const COUNTRIES = [
  { name: "Iran", path: "M 482,155 L 510,140 530,135 555,145 570,160 575,185 565,210 555,230 540,240 525,235 510,225 490,220 475,210 465,195 460,180 470,165 Z", fill: "#1a0a0a", stroke: "#ff1744", strokeWidth: 2 },
  { name: "Iraq", path: "M 420,155 L 450,145 465,155 475,170 475,210 465,225 445,230 430,220 420,200 410,180 415,165 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Saudi Arabia", path: "M 380,220 L 420,210 460,225 490,235 510,250 520,280 510,320 480,340 440,350 400,340 370,310 360,280 365,250 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "UAE", path: "M 520,255 L 540,250 550,260 545,275 530,275 520,265 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Oman", path: "M 540,250 L 560,240 575,250 580,280 570,310 555,320 540,310 530,290 530,275 545,275 550,260 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Qatar", path: "M 500,250 L 505,245 510,250 510,262 505,267 500,262 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Bahrain", path: "M 495,247 L 498,244 501,247 501,253 498,256 495,253 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Kuwait", path: "M 445,215 L 458,210 465,218 460,228 450,228 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Turkey", path: "M 320,105 L 360,95 400,100 440,105 460,115 470,130 450,140 420,145 390,140 360,130 330,120 315,115 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Syria", path: "M 380,135 L 410,130 425,140 420,155 410,170 390,175 375,170 370,155 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Israel", path: "M 362,165 L 370,160 375,170 373,190 368,195 362,185 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Jordan", path: "M 370,175 L 390,175 410,180 415,200 405,210 390,215 380,210 370,195 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Egypt", path: "M 310,175 L 340,170 360,180 365,200 360,230 345,260 320,280 300,270 290,240 295,210 305,190 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Pakistan", path: "M 575,160 L 610,140 650,145 670,165 665,195 650,220 630,235 600,240 580,230 570,210 575,185 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Afghanistan", path: "M 570,120 L 600,110 630,115 650,130 650,145 610,140 575,155 565,140 Z", fill: "#0a0a15", stroke: "#334" },
  { name: "Yemen", path: "M 420,310 L 460,300 500,305 520,320 510,340 480,355 450,360 425,345 415,330 Z", fill: "#0a0a15", stroke: "#334" },
];

const WATERS = [
  { name: "Persian Gulf", path: "M 460,225 L 475,215 490,220 510,230 520,245 515,260 500,265 490,255 480,240 470,230 Z" },
  { name: "Gulf of Oman", path: "M 540,240 L 560,235 580,245 575,260 560,265 545,260 Z" },
  { name: "Arabian Sea", path: "M 460,350 L 520,340 580,320 650,330 700,370 700,450 600,450 500,430 440,400 Z" },
  { name: "Red Sea", path: "M 310,180 L 330,175 345,195 355,230 360,260 355,300 340,340 325,360 315,340 320,300 325,260 320,220 310,195 Z" },
  { name: "Mediterranean", path: "M 200,100 L 280,95 320,100 370,110 380,130 365,155 340,165 300,170 260,160 220,145 200,130 Z" },
  { name: "Caspian Sea", path: "M 480,85 L 500,80 510,95 515,115 510,135 500,140 490,130 485,110 480,95 Z" },
  { name: "Indian Ocean", path: "M 580,380 L 700,360 800,380 800,500 650,500 550,460 Z" },
];

const COUNTRY_LABELS = [
  { name: "IRAN", x: 520, y: 190, size: 11, color: "#ff1744", bold: true },
  { name: "IRAQ", x: 440, y: 185, size: 8, color: "#556" },
  { name: "SAUDI ARABIA", x: 440, y: 290, size: 8, color: "#556" },
  { name: "TURKEY", x: 390, y: 120, size: 8, color: "#556" },
  { name: "PAKISTAN", x: 620, y: 185, size: 8, color: "#556" },
  { name: "OMAN", x: 560, y: 290, size: 7, color: "#556" },
  { name: "YEMEN", x: 460, y: 335, size: 7, color: "#556" },
  { name: "UAE", x: 535, y: 268, size: 6, color: "#556" },
  { name: "QATAR", x: 508, y: 258, size: 5, color: "#556" },
  { name: "KUWAIT", x: 455, y: 222, size: 5, color: "#556" },
  { name: "SYRIA", x: 395, y: 155, size: 7, color: "#556" },
  { name: "ISRAEL", x: 365, y: 180, size: 6, color: "#556" },
  { name: "EGYPT", x: 320, y: 230, size: 7, color: "#556" },
  { name: "AFGHAN.", x: 610, y: 130, size: 6, color: "#556" },
];

const MAP_BOUNDS = { minLat: -10, maxLat: 42, minLon: 15, maxLon: 80 };
const WIDTH = 900;
const HEIGHT = 550;

function project(lat, lon) {
  const x = ((lon - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * WIDTH;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * HEIGHT;
  return [x, y];
}

export default function TheaterMap({ onAssetSelect, activeLayer }) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (item, e) => {
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name: item.name,
      details: item.details || "",
    });
  };

  const showUS = activeLayer === "all" || activeLayer === "us";
  const showIran = activeLayer === "all" || activeLayer === "iran";

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", background: "#030810", borderRadius: 8, border: "1px solid #1a2332" }}>
      <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <radialGradient id="threatGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2979ff" stopOpacity="0.4" />
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
        </defs>

        {/* Grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * (WIDTH / 20)} y1={0} x2={i * (WIDTH / 20)} y2={HEIGHT} stroke="#0a1525" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * (HEIGHT / 15)} x2={WIDTH} y2={i * (HEIGHT / 15)} stroke="#0a1525" strokeWidth="0.5" />
        ))}

        {/* Waters */}
        {WATERS.map(w => (
          <path key={w.name} d={w.path} fill="#061224" stroke="#0a2040" strokeWidth="0.5" opacity="0.8" />
        ))}

        {/* Countries */}
        {COUNTRIES.map(c => (
          <path key={c.name} d={c.path} fill={c.fill} stroke={c.stroke} strokeWidth={c.strokeWidth || 0.8} opacity={c.name === "Iran" ? 1 : 0.7} />
        ))}

        {/* Strait of Hormuz danger zone */}
        <path d="M 530,238 L 545,235 550,245 540,252 530,248 Z" fill="#ff174430" stroke="#ff1744" strokeWidth="1.5" strokeDasharray="4,2">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </path>
        <text x="537" y="243" fill="#ff1744" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity="0.8">HORMUZ</text>

        {/* Threat radius */}
        <circle cx={project(26.575, 56.25)[0]} cy={project(26.575, 56.25)[1]} r="40" fill="none" stroke="#ff1744" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4">
          <animate attributeName="r" values="35;50;35" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Country labels */}
        {COUNTRY_LABELS.map(l => (
          <text key={l.name} x={l.x} y={l.y} fill={l.color} fontSize={l.size} fontFamily="monospace" textAnchor="middle" fontWeight={l.bold ? "bold" : "normal"} letterSpacing="2">{l.name}</text>
        ))}

        {/* Carrier transit route (Ford → Arabian Sea) */}
        {showUS && (
          <line
            x1={project(34.5, 20.0)[0]} y1={project(34.5, 20.0)[1]}
            x2={project(22.5, 62.0)[0]} y2={project(22.5, 62.0)[1]}
            stroke="#2979ff" strokeWidth="1" strokeDasharray="6,4" opacity="0.3"
          >
            <animate attributeName="strokeDashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
          </line>
        )}

        {/* Iran Assets */}
        {showIran && IRAN_ASSETS.map(a => {
          const [x, y] = project(a.lat, a.lon);
          const isNuclear = a.type === "nuclear";
          const isChokepoint = a.type === "chokepoint";
          const isEconomic = a.type === "economic";
          const markerColor = isNuclear ? "#ff1744" : isChokepoint ? "#ff6d00" : isEconomic ? "#ffd600" : "#e040fb";
          return (
            <g key={a.id} onClick={() => onAssetSelect(a)} style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(a, e)} onMouseLeave={() => setTooltip(null)}>
              {isNuclear && <circle cx={x} cy={y} r="12" fill="url(#threatGlow)" />}
              {isChokepoint && (
                <circle cx={x} cy={y} r="15" fill="#ff174415">
                  <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={x} cy={y} r={isNuclear ? 5 : isChokepoint ? 6 : 4} fill={markerColor} stroke="#fff" strokeWidth="0.5" filter="url(#glow)">
                {(isNuclear || isChokepoint) && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />}
              </circle>
              <text x={x + 8} y={y + 3} fill={markerColor} fontSize="5.5" fontFamily="monospace">{a.name.split("(")[0].split(" ").slice(0, 2).join(" ")}</text>
            </g>
          );
        })}

        {/* US Bases */}
        {showUS && US_BASES.map(b => {
          const [x, y] = project(b.lat, b.lon);
          return (
            <g key={b.id} onClick={() => onAssetSelect(b)} style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(b, e)} onMouseLeave={() => setTooltip(null)}>
              <circle cx={x} cy={y} r="8" fill="url(#blueGlow)" />
              <rect x={x - 3.5} y={y - 3.5} width="7" height="7" fill="#2979ff" stroke="#fff" strokeWidth="0.5" filter="url(#glow)" rx="1" />
              <text x={x + 7} y={y + 3} fill="#2979ff" fontSize="5" fontFamily="monospace">{b.name.split("(")[0].split("Air")[0].split("Camp")[0].split("NSA")[0].trim().slice(0, 14)}</text>
            </g>
          );
        })}

        {/* US Naval Assets */}
        {showUS && US_NAVAL_ASSETS.map(a => {
          const [x, y] = project(a.lat, a.lon);
          const isCarrier = a.type === "carrier";
          const isSub = a.type === "submarine";
          const markerColor = isCarrier ? "#2979ff" : isSub ? "#7c4dff" : "#00b0ff";
          return (
            <g key={a.id} onClick={() => onAssetSelect(a)} style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleMouseEnter(a, e)} onMouseLeave={() => setTooltip(null)}>
              {isCarrier && (
                <circle cx={x} cy={y} r="18" fill="url(#blueGlow)">
                  <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={x} cy={y} r={isCarrier ? 6 : isSub ? 4 : 3.5} fill={markerColor} stroke="#fff" strokeWidth={isCarrier ? "1" : "0.5"} filter="url(#glow)" />
              {isCarrier && <text x={x} y={y + 1.5} fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CV</text>}
              <text x={x + (isCarrier ? 10 : 7)} y={y + 3} fill={markerColor} fontSize={isCarrier ? "5.5" : "4.5"} fontFamily="monospace" fontWeight={isCarrier ? "bold" : "normal"}>
                {a.name.match(/USS (\w+)/)?.[1] || a.name.slice(0, 10)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: Math.min(tooltip.x + 12, 700),
          top: Math.max(tooltip.y - 35, 5),
          background: "#0d1117ee",
          border: "1px solid #30363d",
          borderRadius: 6,
          padding: "8px 12px",
          pointerEvents: "none",
          zIndex: 100,
          maxWidth: 280,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          backdropFilter: "blur(8px)",
        }}>
          <div style={{ color: "#e6edf3", fontWeight: "bold", marginBottom: 3 }}>{tooltip.name}</div>
          <div style={{ color: "#8b949e", lineHeight: 1.4 }}>{tooltip.details}</div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useCallback } from "react";

// Satellite imagery analysis data from ISIS (Institute for Science and International Security)
// and open-source satellite providers — February 2026
const SATELLITE_SITES = [
  {
    id: "natanz",
    name: "Natanz Enrichment Facility",
    subtitle: "Pickaxe Mountain Underground Complex",
    lat: "33.724°N",
    lon: "51.727°E",
    beforeDate: "June 20, 2025",
    afterDate: "February 10, 2026",
    beforeLabel: "PRE-STRIKE",
    afterLabel: "RECONSTRUCTION",
    status: "ACTIVE — HARDENING",
    statusColor: "#ff6d00",
    description: "Fresh concrete visible at western and eastern tunnel entrances. Iran is hardening facility to withstand future airstrikes. Construction equipment and trucks on-site. Deep underground centrifuge halls believed operational.",
    findings: [
      { label: "Tunnel entrances", value: "Sealed with concrete", color: "#ff6d00" },
      { label: "Construction activity", value: "Heavy — ongoing", color: "#ff1744" },
      { label: "Centrifuge status", value: "Believed operational", color: "#ff1744" },
      { label: "Depth estimate", value: "~80-100m underground", color: "#ffd600" },
    ],
    // SVG visualization of before/after satellite view
    beforeScene: "damaged",
    afterScene: "hardened",
  },
  {
    id: "fordow",
    name: "Fordow Enrichment Plant",
    subtitle: "Built inside mountain near Qom",
    lat: "34.880°N",
    lon: "51.985°E",
    beforeDate: "June 20, 2025",
    afterDate: "February 8, 2026",
    beforeLabel: "PRE-STRIKE",
    afterLabel: "CURRENT STATUS",
    status: "ACTIVE — DEEP UNDERGROUND",
    statusColor: "#ff1744",
    description: "Fordow facility built deep inside a mountain proved more resilient to strikes. Enrichment to near weapons-grade (60%+) continues. IAEA inspectors report limited access. New air filtration systems detected.",
    findings: [
      { label: "Enrichment level", value: "~60% (near weapons-grade)", color: "#ff1744" },
      { label: "Mountain depth", value: "~80m under granite", color: "#ffd600" },
      { label: "IAEA access", value: "Restricted", color: "#ff6d00" },
      { label: "Strike damage", value: "Minimal — deep facility", color: "#00e676" },
    ],
    beforeScene: "mountain_pre",
    afterScene: "mountain_post",
  },
  {
    id: "parchin",
    name: "Parchin Military Complex",
    subtitle: "Taleghan 2 Site — SE of Tehran",
    lat: "35.522°N",
    lon: "51.773°E",
    beforeDate: "October 2024",
    afterDate: "January 24, 2026",
    beforeLabel: "POST-ISRAEL STRIKE",
    afterLabel: "CONCRETE SARCOPHAGUS",
    status: "REBUILT — CONCEALED",
    statusColor: "#ff6d00",
    description: "Iran completed a concrete sarcophagus around the Taleghan 2 site and is now covering it with soil. Satellite imagery shows complete reconstruction over strike damage. Purpose of original site disputed — possibly weaponization research.",
    findings: [
      { label: "Reconstruction", value: "Complete sarcophagus", color: "#ff1744" },
      { label: "Concealment", value: "Covered with soil", color: "#ff6d00" },
      { label: "Activity level", value: "Active construction", color: "#ff1744" },
      { label: "Original purpose", value: "Suspected weapons R&D", color: "#ffd600" },
    ],
    beforeScene: "parchin_pre",
    afterScene: "parchin_post",
  },
  {
    id: "isfahan",
    name: "Isfahan UCF",
    subtitle: "Uranium Conversion Facility",
    lat: "32.697°N",
    lon: "51.688°E",
    beforeDate: "June 20, 2025",
    afterDate: "February 2026",
    beforeLabel: "PRE-STRIKE",
    afterLabel: "TUNNEL SEALING",
    status: "HARDENING IN PROGRESS",
    statusColor: "#ff6d00",
    description: "Extensive engineering operation to seal tunnel openings. Iran accelerating fortification work. Facility converts yellowcake to UF6 gas for enrichment — critical upstream step in nuclear fuel cycle.",
    findings: [
      { label: "Tunnel sealing", value: "Extensive operation", color: "#ff6d00" },
      { label: "UF6 production", value: "Believed resumed", color: "#ff1744" },
      { label: "Fortification", value: "Accelerating", color: "#ff6d00" },
      { label: "Supply chains", value: "China bypass routes", color: "#ffd600" },
    ],
    beforeScene: "isfahan_pre",
    afterScene: "isfahan_post",
  },
  {
    id: "khorrambad",
    name: "Imam Ali Missile Base",
    subtitle: "Khorramabad — IRGC Missile Forces",
    lat: "33.487°N",
    lon: "48.355°E",
    beforeDate: "June 2025",
    afterDate: "January 5, 2026",
    beforeLabel: "POST-STRIKE DAMAGE",
    afterLabel: "REBUILT STRUCTURES",
    status: "PARTIALLY REBUILT",
    statusColor: "#ffd600",
    description: "Of 12 structures destroyed by Israel, 3 have been rebuilt, 1 repaired, and 3 are under construction. Iran's missile rebuild effort uses Chinese-supplied planetary mixers for solid fuel production. Est. 1,000-1,200 missiles remaining from pre-war 2,500.",
    findings: [
      { label: "Structures rebuilt", value: "3 of 12 destroyed", color: "#ffd600" },
      { label: "Under construction", value: "3 more in progress", color: "#ff6d00" },
      { label: "Missile inventory", value: "~1,000-1,200 (was 2,500)", color: "#ff1744" },
      { label: "Solid fuel capacity", value: "Impaired — China route", color: "#ffd600" },
    ],
    beforeScene: "missile_pre",
    afterScene: "missile_post",
  },
];

// SVG "satellite view" renderer — stylized top-down imagery
function SatelliteView({ scene, label, date }) {
  const scenes = {
    damaged: (
      <g>
        {/* Terrain */}
        <rect width="100%" height="100%" fill="#1a1c14" />
        <rect x="30" y="25" width="140" height="60" fill="#2a2c1e" rx="2" stroke="#444" strokeWidth="0.5" />
        <rect x="50" y="40" width="30" height="25" fill="#333020" stroke="#555" strokeWidth="0.5" />
        <rect x="100" y="35" width="40" height="30" fill="#333020" stroke="#555" strokeWidth="0.5" />
        {/* Strike damage craters */}
        <circle cx="65" cy="52" r="12" fill="#0a0a08" stroke="#ff174480" strokeWidth="1" />
        <circle cx="120" cy="50" r="15" fill="#0a0a08" stroke="#ff174480" strokeWidth="1" />
        <circle cx="90" cy="38" r="8" fill="#0a0a08" stroke="#ff174460" strokeWidth="0.5" />
        {/* Debris */}
        <rect x="55" y="45" width="4" height="3" fill="#444" transform="rotate(25,57,46)" />
        <rect x="110" y="42" width="5" height="2" fill="#444" transform="rotate(-15,112,43)" />
        {/* Roads */}
        <line x1="0" y1="90" x2="200" y2="85" stroke="#2a2a20" strokeWidth="2" />
        <line x1="100" y1="0" x2="95" y2="110" stroke="#2a2a20" strokeWidth="1.5" />
      </g>
    ),
    hardened: (
      <g>
        <rect width="100%" height="100%" fill="#1a1c14" />
        <rect x="30" y="25" width="140" height="60" fill="#2a2c1e" rx="2" stroke="#444" strokeWidth="0.5" />
        {/* Sealed tunnel entrances — bright concrete */}
        <rect x="45" y="38" width="20" height="20" fill="#8a8a7a" stroke="#aaa" strokeWidth="1" rx="1" />
        <rect x="95" y="33" width="25" height="25" fill="#8a8a7a" stroke="#aaa" strokeWidth="1" rx="1" />
        {/* Fresh concrete (bright) */}
        <rect x="47" y="40" width="16" height="16" fill="#b0b0a0" rx="1" />
        <rect x="97" y="35" width="21" height="21" fill="#b0b0a0" rx="1" />
        {/* Construction equipment */}
        <rect x="135" y="50" width="8" height="4" fill="#ffd600" rx="1" />
        <rect x="140" y="42" width="6" height="3" fill="#ff6d00" rx="1" />
        <circle cx="75" cy="65" r="2" fill="#ffd600" />
        {/* Trucks */}
        <rect x="60" y="72" width="6" height="3" fill="#666" />
        <rect x="80" y="70" width="5" height="3" fill="#666" />
        {/* Roads */}
        <line x1="0" y1="90" x2="200" y2="85" stroke="#2a2a20" strokeWidth="2" />
        <line x1="100" y1="0" x2="95" y2="110" stroke="#2a2a20" strokeWidth="1.5" />
        {/* NEW label */}
        <rect x="130" y="28" width="30" height="10" fill="#ff6d00" rx="2" opacity="0.8" />
        <text x="145" y="35" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700" fontFamily="monospace">NEW</text>
      </g>
    ),
    mountain_pre: (
      <g>
        <rect width="100%" height="100%" fill="#1c1e16" />
        {/* Mountain terrain */}
        <polygon points="40,90 100,20 160,90" fill="#2a2c20" stroke="#444" strokeWidth="0.5" />
        <polygon points="60,90 100,35 140,90" fill="#252720" stroke="#444" strokeWidth="0.3" />
        {/* Tunnel entrance */}
        <rect x="88" y="60" width="24" height="14" fill="#111" rx="2" stroke="#666" strokeWidth="0.5" />
        {/* Road to entrance */}
        <line x1="0" y1="80" x2="88" y2="67" stroke="#2a2a20" strokeWidth="2" />
      </g>
    ),
    mountain_post: (
      <g>
        <rect width="100%" height="100%" fill="#1c1e16" />
        <polygon points="40,90 100,20 160,90" fill="#2a2c20" stroke="#444" strokeWidth="0.5" />
        <polygon points="60,90 100,35 140,90" fill="#252720" stroke="#444" strokeWidth="0.3" />
        {/* Sealed entrance */}
        <rect x="85" y="58" width="30" height="18" fill="#7a7a6a" stroke="#aaa" strokeWidth="1" rx="2" />
        {/* Air filtration (new structure) */}
        <rect x="125" y="50" width="12" height="12" fill="#555" stroke="#777" strokeWidth="0.5" />
        <circle cx="131" cy="56" r="3" fill="none" stroke="#888" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="85" y2="67" stroke="#2a2a20" strokeWidth="2" />
        <rect x="130" y="42" width="25" height="8" fill="#ff1744" rx="2" opacity="0.7" />
        <text x="142" y="48" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="700" fontFamily="monospace">60% U</text>
      </g>
    ),
    parchin_pre: (
      <g>
        <rect width="100%" height="100%" fill="#1a1c14" />
        {/* Building footprints */}
        <rect x="40" y="30" width="50" height="40" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        <rect x="100" y="35" width="30" height="30" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        {/* Crater / strike damage */}
        <circle cx="65" cy="50" r="20" fill="#0a0a08" stroke="#ff174480" strokeWidth="1" />
        <circle cx="115" cy="50" r="12" fill="#0a0a08" stroke="#ff174460" strokeWidth="0.8" />
        <line x1="0" y1="80" x2="200" y2="78" stroke="#2a2a20" strokeWidth="1.5" />
      </g>
    ),
    parchin_post: (
      <g>
        <rect width="100%" height="100%" fill="#1c1e16" />
        {/* Concrete sarcophagus */}
        <rect x="30" y="25" width="80" height="55" fill="#8a8a7a" stroke="#bbb" strokeWidth="1.5" rx="3" />
        {/* Soil covering */}
        <rect x="35" y="30" width="70" height="45" fill="#3a3c2e" stroke="#555" strokeWidth="0.5" rx="2" />
        <rect x="40" y="35" width="60" height="35" fill="#2e3028" rx="1" />
        {/* Adjacent new structure */}
        <rect x="120" y="35" width="25" height="25" fill="#333" stroke="#555" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="200" y2="78" stroke="#2a2a20" strokeWidth="1.5" />
        <rect x="30" y="15" width="55" height="9" fill="#ff6d00" rx="2" opacity="0.7" />
        <text x="57" y="22" textAnchor="middle" fill="#fff" fontSize="5.5" fontWeight="700" fontFamily="monospace">CONCEALED</text>
      </g>
    ),
    isfahan_pre: (
      <g>
        <rect width="100%" height="100%" fill="#1a1c14" />
        <rect x="20" y="20" width="70" height="50" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        <rect x="100" y="25" width="60" height="40" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        {/* Tunnel entrance */}
        <ellipse cx="55" cy="45" rx="15" ry="8" fill="#111" stroke="#666" strokeWidth="0.5" />
        <ellipse cx="130" cy="45" rx="12" ry="7" fill="#111" stroke="#666" strokeWidth="0.5" />
        <line x1="0" y1="85" x2="200" y2="82" stroke="#2a2a20" strokeWidth="2" />
      </g>
    ),
    isfahan_post: (
      <g>
        <rect width="100%" height="100%" fill="#1c1e16" />
        <rect x="20" y="20" width="70" height="50" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        <rect x="100" y="25" width="60" height="40" fill="#2a2c1e" stroke="#444" strokeWidth="0.5" />
        {/* Sealed tunnels */}
        <ellipse cx="55" cy="45" rx="15" ry="8" fill="#8a8a7a" stroke="#aaa" strokeWidth="1" />
        <ellipse cx="130" cy="45" rx="12" ry="7" fill="#8a8a7a" stroke="#aaa" strokeWidth="1" />
        {/* Construction */}
        <rect x="75" y="55" width="8" height="4" fill="#ffd600" />
        <rect x="150" y="40" width="6" height="3" fill="#ffd600" />
        <line x1="0" y1="85" x2="200" y2="82" stroke="#2a2a20" strokeWidth="2" />
        <rect x="100" y="15" width="55" height="9" fill="#ff6d00" rx="2" opacity="0.7" />
        <text x="127" y="22" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="700" fontFamily="monospace">SEALING</text>
      </g>
    ),
    missile_pre: (
      <g>
        <rect width="100%" height="100%" fill="#1a1c14" />
        {/* Destroyed structures */}
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <rect x={25 + (i % 3) * 55} y={25 + Math.floor(i/3) * 35} width="40" height="25" fill="#0a0a08" stroke="#ff174460" strokeWidth="0.5" rx="1" />
            <line x1={30 + (i%3)*55} y1={30 + Math.floor(i/3)*35} x2={60 + (i%3)*55} y2={45 + Math.floor(i/3)*35} stroke="#ff174440" strokeWidth="0.5" />
            <line x1={60 + (i%3)*55} y1={30 + Math.floor(i/3)*35} x2={30 + (i%3)*55} y2={45 + Math.floor(i/3)*35} stroke="#ff174440" strokeWidth="0.5" />
          </g>
        ))}
        <line x1="0" y1="95" x2="200" y2="92" stroke="#2a2a20" strokeWidth="1.5" />
      </g>
    ),
    missile_post: (
      <g>
        <rect width="100%" height="100%" fill="#1c1e16" />
        {/* Rebuilt (green) */}
        {[0,1,2].map(i => (
          <rect key={`r${i}`} x={25 + i * 55} y={25} width="40" height="25" fill="#1a3a1a" stroke="#00e676" strokeWidth="0.8" rx="1" />
        ))}
        {/* Under construction (yellow) */}
        {[0,1,2].map(i => (
          <rect key={`c${i}`} x={25 + i * 55} y={60} width="40" height="25" fill="#2a2a10" stroke="#ffd600" strokeWidth="0.8" rx="1" strokeDasharray="3,2" />
        ))}
        {/* Remaining destroyed */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={`d${i}`} x={25 + (i%3)*55} y={25 + Math.floor(i/3)*35} width="4" height="4" fill="#ff1744" opacity="0.3" rx="1" />
        ))}
        <line x1="0" y1="95" x2="200" y2="92" stroke="#2a2a20" strokeWidth="1.5" />
      </g>
    ),
  };

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 200 110" style={{ width: "100%", height: "auto", borderRadius: 4, border: "1px solid #1a2332" }}>
        {scenes[scene] || <rect width="100%" height="100%" fill="#1a1c14" />}
        {/* Grid overlay */}
        <g opacity="0.08" stroke="#00ff00">
          {Array.from({length: 10}).map((_,i) => <line key={`v${i}`} x1={i*20} y1={0} x2={i*20} y2={110} strokeWidth="0.3" />)}
          {Array.from({length: 6}).map((_,i) => <line key={`h${i}`} x1={0} y1={i*20} x2={200} y2={i*20} strokeWidth="0.3" />)}
        </g>
        {/* Crosshair center */}
        <line x1="95" y1="50" x2="105" y2="50" stroke="#00ff0040" strokeWidth="0.5" />
        <line x1="100" y1="45" x2="100" y2="55" stroke="#00ff0040" strokeWidth="0.5" />
      </svg>
      {/* Label */}
      <div style={{
        position: "absolute", top: 4, left: 4,
        background: "#000000cc", padding: "2px 6px", borderRadius: 2,
        fontSize: 7, color: "#00ff00", fontFamily: "monospace", letterSpacing: 0.5,
      }}>
        {label} • {date}
      </div>
    </div>
  );
}

// Before/After Slider
function BeforeAfterSlider({ site }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, pos)));
  }, []);

  const handleMouseDown = () => { dragging.current = true; };
  const handleMouseUp = () => { dragging.current = false; };
  const handleMouseMove = (e) => { if (dragging.current) handleMove(e.clientX); };
  const handleTouchMove = (e) => { handleMove(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 4, cursor: "ew-resize", userSelect: "none" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After (full width behind) */}
      <div style={{ width: "100%" }}>
        <SatelliteView scene={site.afterScene} label={site.afterLabel} date={site.afterDate} />
      </div>
      {/* Before (clipped) */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: `${sliderPos}%`, height: "100%",
        overflow: "hidden",
      }}>
        <div style={{ width: containerRef.current ? containerRef.current.offsetWidth : 400 }}>
          <SatelliteView scene={site.beforeScene} label={site.beforeLabel} date={site.beforeDate} />
        </div>
      </div>
      {/* Slider line */}
      <div style={{
        position: "absolute", top: 0, left: `${sliderPos}%`, width: 2, height: "100%",
        background: "#ffffff", boxShadow: "0 0 6px rgba(255,255,255,0.5)",
        transform: "translateX(-1px)", zIndex: 10,
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, color: "#000", fontWeight: 700, boxShadow: "0 0 8px rgba(0,0,0,0.5)",
        }}>⇔</div>
      </div>
    </div>
  );
}

// Main Satellite Tracker Panel
export default function SatelliteTracker() {
  const [activeSite, setActiveSite] = useState(SATELLITE_SITES[0]);

  return (
    <div style={{ background: "#0d1117", padding: "12px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
          ◆ SATELLITE IMAGERY — NUCLEAR & MISSILE SITES
        </div>
        <div style={{ fontSize: 7, color: "#484f58" }}>
          SOURCE: ISIS / OPEN-SOURCE SATELLITE ANALYSIS
        </div>
      </div>

      {/* Site selector tabs */}
      <div style={{ display: "flex", gap: 3, marginBottom: 10, flexWrap: "wrap" }}>
        {SATELLITE_SITES.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSite(s)}
            style={{
              background: activeSite.id === s.id ? "#21262d" : "transparent",
              border: `1px solid ${activeSite.id === s.id ? s.statusColor : "transparent"}`,
              color: activeSite.id === s.id ? "#e6edf3" : "#6e7681",
              borderRadius: 3, padding: "3px 8px", fontSize: 8,
              fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5,
            }}
          >
            {s.id === "khorrambad" ? "IMAM ALI MISSILES" : s.id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Active site display */}
      <div className="sat-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Left: Before/After */}
        <div>
          <div style={{ fontSize: 9, color: "#8b949e", marginBottom: 4 }}>◄ DRAG TO COMPARE ►</div>
          <BeforeAfterSlider site={activeSite} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 7, color: "#ff174480" }}>◄ {activeSite.beforeLabel}</span>
            <span style={{ fontSize: 7, color: "#00e67680" }}>{activeSite.afterLabel} ►</span>
          </div>
        </div>

        {/* Right: Analysis */}
        <div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3" }}>{activeSite.name}</div>
            <div style={{ fontSize: 8, color: "#6e7681", marginTop: 2 }}>{activeSite.subtitle}</div>
            <div style={{ fontSize: 7, color: "#484f58", marginTop: 2 }}>{activeSite.lat}, {activeSite.lon}</div>
          </div>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: `${activeSite.statusColor}15`,
            border: `1px solid ${activeSite.statusColor}40`,
            borderRadius: 3, padding: "3px 8px", marginBottom: 8,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: activeSite.statusColor, animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 8, color: activeSite.statusColor, fontWeight: 600, letterSpacing: 0.5 }}>
              {activeSite.status}
            </span>
          </div>

          {/* Description */}
          <div style={{ fontSize: 8, color: "#8b949e", lineHeight: 1.5, marginBottom: 10 }}>
            {activeSite.description}
          </div>

          {/* Findings */}
          <div style={{ fontSize: 8, color: "#6e7681", letterSpacing: 0.5, marginBottom: 4 }}>KEY FINDINGS:</div>
          {activeSite.findings.map((f, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "3px 0",
              borderBottom: "1px solid #1a233250", fontSize: 8,
            }}>
              <span style={{ color: "#8b949e" }}>{f.label}</span>
              <span style={{ color: f.color, fontWeight: 600 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:700px) {
          .sat-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

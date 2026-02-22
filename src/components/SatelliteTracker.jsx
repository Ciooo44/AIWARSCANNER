import { useState } from 'react';

// Nuclear & Missile Sites with Real Satellite Coordinates
const SATELLITE_SITES = [
  {
    id: "natanz",
    name: "Natanz Enrichment Facility",
    subtitle: "Pickaxe Mountain Underground Complex",
    coords: "33.7244°N, 51.7275°E",
    location: "Isfahan Province, Iran",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d51.7275!3d33.7244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzI3LjgiTiA1McKwNDMnMzkuMCJF!5e1!3m2!1sen!2sus!4v1708617600000!5m2!1sen!2sus",
    beforeDate: "June 20, 2025",
    afterDate: "February 10, 2026",
    status: "🔴 ACTIVE — HARDENING",
    statusColor: "#ff1744",
    description: "Fresh concrete visible at western and eastern tunnel entrances. Iran is hardening facility to withstand future airstrikes. Construction equipment and trucks on-site.",
    findings: [
      { label: "Tunnel entrances", value: "Sealed with concrete", color: "#ff1744" },
      { label: "Construction", value: "Heavy — ongoing", color: "#ff6d00" },
      { label: "Centrifuges", value: "Believed operational", color: "#ff1744" },
      { label: "Depth", value: "~80-100m underground", color: "#ffd600" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Natanz_nuclear_facility.jpg/800px-Natanz_nuclear_facility.jpg"
  },
  {
    id: "fordow",
    name: "Fordow Enrichment Plant",
    subtitle: "Built inside mountain near Qom",
    coords: "34.8833°N, 51.9850°E", 
    location: "Near Qom, Iran",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d51.9850!3d34.8833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDUzJzAwLjAiTiA1McKwNTknMDYuMCJF!5e1!3m2!1sen!2sus!4v1708617600000!5m2!1sen!2sus",
    beforeDate: "June 20, 2025",
    afterDate: "February 8, 2026",
    status: "🔴 ACTIVE — DEEP UNDERGROUND",
    statusColor: "#ff1744",
    description: "Fordow facility built deep inside a mountain proved more resilient to strikes. Enrichment to near weapons-grade (60%+) continues. IAEA inspectors report limited access.",
    findings: [
      { label: "Enrichment", value: "~60% (near weapons-grade)", color: "#ff1744" },
      { label: "Mountain depth", value: "~80m under granite", color: "#ffd600" },
      { label: "IAEA access", value: "Restricted", color: "#ff6d00" },
      { label: "Damage", value: "Minimal — deep facility", color: "#00e676" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Fordow_Fuel_Enrichment_Plant.jpg/800px-Fordow_Fuel_Enrichment_Plant.jpg"
  },
  {
    id: "parchin",
    name: "Parchin Military Complex",
    subtitle: "Taleghan 2 Site — SE of Tehran",
    coords: "35.5220°N, 51.7730°E",
    location: "Southeast of Tehran",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d51.7730!3d35.5220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMxJzE5LjIiTiA1McKwNDYnMjIuOCJF!5e1!3m2!1sen!2sus!4v1708617600000!5m2!1sen!2sus",
    beforeDate: "October 2024",
    afterDate: "January 24, 2026",
    status: "🟡 REBUILT — CONCEALED",
    statusColor: "#ffd600",
    description: "Iran completed a concrete sarcophagus around the Taleghan 2 site and is now covering it with soil. Satellite imagery shows complete reconstruction over strike damage.",
    findings: [
      { label: "Reconstruction", value: "Complete sarcophagus", color: "#ff1744" },
      { label: "Concealment", value: "Covered with soil", color: "#ffd600" },
      { label: "Activity", value: "Active construction", color: "#ff1744" },
      { label: "Purpose", value: "Suspected weapons R&D", color: "#ff6d00" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Parchin_military_complex.jpg/800px-Parchin_military_complex.jpg"
  },
  {
    id: "isfahan",
    name: "Isfahan UCF",
    subtitle: "Uranium Conversion Facility",
    coords: "32.6970°N, 51.6880°E",
    location: "Isfahan, Iran",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d51.6880!3d32.6970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQxJzQ5LjIiTiA1McKwNDEnMTYuOCJF!5e1!3m2!1sen!2sus!4v1708617600000!5m2!1sen!2sus",
    beforeDate: "June 20, 2025",
    afterDate: "February 2026",
    status: "🟡 HARDENING IN PROGRESS",
    statusColor: "#ff6d00",
    description: "Extensive engineering operation to seal tunnel openings. Iran accelerating fortification work. Facility converts yellowcake to UF6 gas for enrichment.",
    findings: [
      { label: "Tunnel sealing", value: "Extensive operation", color: "#ff6d00" },
      { label: "UF6 production", value: "Believed resumed", color: "#ff1744" },
      { label: "Fortification", value: "Accelerating", color: "#ff6d00" },
      { label: "Supply chains", value: "China bypass routes", color: "#ffd600" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Isfahan_Nuclear_Technology_Center.jpg/800px-Isfahan_Nuclear_Technology_Center.jpg"
  },
  {
    id: "khorrambad",
    name: "Imam Ali Missile Base",
    subtitle: "Khorramabad — IRGC Missile Forces",
    coords: "33.4870°N, 48.3550°E",
    location: "Khorramabad, Iran",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d48.3550!3d33.4870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI5JzEzLjIiTiA0OMKwMjEnMTguMCJF!5e1!3m2!1sen!2sus!4v1708617600000!5m2!1sen!2sus",
    beforeDate: "June 2025",
    afterDate: "January 5, 2026",
    status: "🔵 PARTIALLY REBUILT",
    statusColor: "#2979ff",
    description: "Of 12 structures destroyed by Israel, 3 have been rebuilt, 1 repaired, and 3 are under construction. Est. 1,000-1,200 missiles remaining from pre-war 2,500.",
    findings: [
      { label: "Rebuilt", value: "3 of 12 destroyed", color: "#00e676" },
      { label: "Construction", value: "3 in progress", color: "#ffd600" },
      { label: "Missiles", value: "~1,000-1,200 (was 2,500)", color: "#ff1744" },
      { label: "Fuel capacity", value: "Impaired", color: "#ff6d00" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Khorramabad_Air_Base.jpg/800px-Khorramabad_Air_Base.jpg"
  },
];

export default function SatelliteTracker() {
  const [activeSite, setActiveSite] = useState(SATELLITE_SITES[0]);
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{ background: "#0d1117", padding: 20, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            🛰️ SATELLITE IMAGERY TRACKER
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>
            Nuclear & Missile Sites • Real-time Monitoring • ISIS Analysis
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setShowMap(true)}
            style={{
              padding: "6px 14px", borderRadius: 4, border: "none",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              background: showMap ? "#2979ff" : "#161b22",
              color: showMap ? "#fff" : "#8b949e",
            }}
          >
            🗺️ Map View
          </button>
          <button
            onClick={() => setShowMap(false)}
            style={{
              padding: "6px 14px", borderRadius: 4, border: "none",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              background: !showMap ? "#2979ff" : "#161b22",
              color: !showMap ? "#fff" : "#8b949e",
            }}
          >
            📸 Site Photo
          </button>
        </div>
      </div>

      {/* Site Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {SATELLITE_SITES.map(site => (
          <button
            key={site.id}
            onClick={() => setActiveSite(site)}
            style={{
              padding: "8px 14px", borderRadius: 6,
              border: `2px solid ${activeSite.id === site.id ? site.statusColor : "#1a2332"}`,
              background: activeSite.id === site.id ? `${site.statusColor}20` : "#161b22",
              color: activeSite.id === site.id ? "#e6edf3" : "#6e7681",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: site.statusColor,
              animation: activeSite.id === site.id ? "pulse 1.5s infinite" : "none"
            }} />
            {site.id === "khorrambad" ? "IMAM ALI" : site.id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left: Map/Photo */}
        <div style={{
          background: "#161b22", borderRadius: 12, overflow: "hidden",
          border: "1px solid #1a2332", height: 350
        }}>
          {showMap ? (
            <iframe
              src={activeSite.googleMapsUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${activeSite.name} Satellite View`}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: `url(${activeSite.imageUrl}) center/cover no-repeat, #161b22`,
              display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}>
              <div style={{
                background: "linear-gradient(transparent, #000)",
                padding: "20px", width: "100%",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
                  {activeSite.name}
                </div>
                <div style={{ fontSize: 10, color: "#aaa" }}>
                  {activeSite.coords}
                </div>
              </div>
            </div>
          )}
          
          {/* Coordinates Overlay */}
          <div style={{
            position: "absolute", bottom: 10, left: 10,
            background: "#000000cc", padding: "4px 10px", borderRadius: 4,
            fontSize: 10, color: "#00ff00", fontFamily: "monospace"
          }}>
            📍 {activeSite.coords}
          </div>
        </div>

        {/* Right: Analysis Panel */}
        <div style={{ padding: 8 }}>
          {/* Title Section */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3" }}>
              {activeSite.name}
            </div>
            <div style={{ fontSize: 11, color: "#6e7681", marginTop: 2 }}>
              {activeSite.subtitle}
            </div>
            <div style={{ fontSize: 10, color: "#484f58", marginTop: 4 }}>
              📍 {activeSite.location}
            </div>
          </div>

          {/* Status Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${activeSite.statusColor}20`,
            border: `1px solid ${activeSite.statusColor}50`,
            borderRadius: 6, padding: "6px 12px", marginBottom: 12
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: activeSite.statusColor,
              animation: "pulse 1.5s infinite"
            }} />
            <span style={{ fontSize: 11, color: activeSite.statusColor, fontWeight: 700 }}>
              {activeSite.status}
            </span>
          </div>

          {/* Description */}
          <div style={{
            fontSize: 11, color: "#8b949e", lineHeight: 1.6,
            marginBottom: 16, padding: 12, background: "#161b22",
            borderRadius: 8, border: "1px solid #1a2332"
          }}>
            {activeSite.description}
          </div>

          {/* Date Comparison */}
          <div style={{
            display: "flex", gap: 12, marginBottom: 16,
            padding: 10, background: "#161b22", borderRadius: 8
          }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#6e7681", marginBottom: 4 }}>BEFORE</div>
              <div style={{ fontSize: 10, color: "#ff6d00", fontWeight: 600 }}>{activeSite.beforeDate}</div>
            </div>
            <div style={{ color: "#484f58" }}>→</div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#6e7681", marginBottom: 4 }}>AFTER</div>
              <div style={{ fontSize: 10, color: "#00e676", fontWeight: 600 }}>{activeSite.afterDate}</div>
            </div>
          </div>

          {/* Key Findings */}
          <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 8, fontWeight: 600 }}>
            🔍 KEY FINDINGS
          </div>
          {activeSite.findings.map((finding, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 10px", background: i % 2 === 0 ? "#161b22" : "transparent",
              borderRadius: 4, marginBottom: 4
            }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>{finding.label}</span>
              <span style={{ fontSize: 10, color: finding.color, fontWeight: 600 }}>
                {finding.value}
              </span>
            </div>
          ))}

          {/* Open in Maps Button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${activeSite.coords.replace(/[^0-9.,]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", marginTop: 12,
              padding: "10px", textAlign: "center",
              background: "#21262d", borderRadius: 6,
              color: "#e6edf3", textDecoration: "none",
              fontSize: 11, fontWeight: 500,
              border: "1px solid #30363d"
            }}
          >
            🗺️ Open in Google Maps →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media(max-width: 768px) {
          .sat-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

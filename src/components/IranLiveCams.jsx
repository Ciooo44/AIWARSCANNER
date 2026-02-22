import { useState } from 'react';

const IRAN_CAMS = [
  { id: 'Tehran', name: 'Tehran City Live', url: 'https://www.youtube.com/embed/-zGuR1qVKrU?autoplay=0&mute=1', location: 'Tehran, Iran' },
];

export default function IranLiveCams() {
  const [activeCam, setActiveCam] = useState(IRAN_CAMS[0]);

  return (
    <div style={{ background: "#0d1117", padding: 16, borderBottom: "1px solid #1a2332" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
          🇮🇷 IRAN LIVE CAMERAS
        </div>
        <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>
          Real-time street cameras from Iran
        </div>
      </div>

      {/* Camera Selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {IRAN_CAMS.map(cam => (
          <button
            key={cam.id}
            onClick={() => setActiveCam(cam)}
            style={{
              padding: "6px 12px",
              fontSize: 10,
              background: activeCam.id === cam.id ? "#ff1744" : "#21262d",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {cam.name}
          </button>
        ))}
      </div>

      {/* Video Player */}
      <div style={{ 
        position: "relative", 
        paddingBottom: "56.25%", 
        height: 0,
        borderRadius: 8,
        overflow: "hidden"
      }}>
        <iframe
          src={activeCam.url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: 8
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div style={{ 
        marginTop: 8,
        padding: "8px 12px",
        background: "#161b22",
        borderRadius: 4,
        fontSize: 10,
        color: "#8b949e"
      }}>
        📍 {activeCam.location} • Live Stream
      </div>
    </div>
  );
}

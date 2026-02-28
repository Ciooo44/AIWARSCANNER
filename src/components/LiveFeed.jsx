import { useState, useEffect } from 'react';

// Live War Feed - Real-time updates
const LIVE_UPDATES = [
  {
    id: 1,
    time: "09:00",
    icon: "🌐",
    color: "#9c27b0",
    text: "IRAN INTERNET BLACKOUT",
    details: "National connectivity at 4% - Near-total blackout amid combat operations",
    source: "NetBlocks"
  },
  {
    id: 2,
    time: "08:57",
    icon: "🚨",
    color: "#ff0000",
    text: "ROCKET ATTACK ON ISRAEL",
    details: "Dozens of rockets fired from Iran towards Israel - Iron Dome activating",
    source: "IDF"
  },
  {
    id: 3,
    time: "08:45",
    icon: "🔴",
    color: "#ff1744",
    text: "TRUMP DECLARES WAR",
    details: "'The United States is now at war with Iran' - Official Oval Office address",
    source: "White House"
  },
  {
    id: 4,
    time: "08:30",
    icon: "✈️",
    color: "#ff6d00",
    text: "AIRSPACE CLEARING",
    details: "Middle East airspace being evacuated - Commercial flights diverting",
    source: "Aviation"
  },
  {
    id: 5,
    time: "08:15",
    icon: "💥",
    color: "#ffd600",
    text: "ISRAEL JOINS STRIKES",
    details: "Israeli aircraft participating in strikes alongside US forces",
    source: "Military"
  },
  {
    id: 6,
    time: "08:00",
    icon: "🔴",
    color: "#ff0000",
    text: "WAR BEGINS",
    details: "US launches massive strikes on Iran - Tehran, Natanz, Fordow, Isfahan hit",
    source: "Multiple"
  },
  {
    id: 7,
    time: "07:30",
    icon: "🛢️",
    color: "#ffd600",
    text: "STRAIT OF HORMUZ CLOSED",
    details: "Oil tankers halted - Global oil prices spiking",
    source: "Maritime"
  }
];

export default function LiveFeed() {
  const [updates] = useState(LIVE_UPDATES);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a0000 0%, #0d1117 50%, #1a0000 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: "3px solid #ff1744",
      boxShadow: "0 0 40px rgba(255,0,0,0.4)"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "2px solid #ff174440"
      }}>
        <div>
          <div style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#ff1744",
            letterSpacing: 3,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <span style={{ animation: "pulse 1s infinite" }}>🔴</span>
            LIVE FEED
            <span style={{ animation: "pulse 1s infinite" }}>🔴</span>
          </div>
          <div style={{
            fontSize: 11,
            color: "#8b949e",
            marginTop: 4
          }}>
            Real-time war updates • Auto-refreshing
          </div>
        </div>
        <div style={{
          padding: "8px 16px",
          background: "#ff174420",
          borderRadius: 8,
          border: "1px solid #ff1744"
        }}>
          <div style={{ fontSize: 10, color: "#ff6d00" }}>WAR TIME</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744" }}>
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </div>

      {/* Live Updates List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {updates.map((update, index) => (
          <div
            key={update.id}
            style={{
              display: "flex",
              gap: 16,
              padding: 16,
              background: index === 0 ? `${update.color}20` : "rgba(22,27,34,0.8)",
              borderRadius: 12,
              border: `2px solid ${index === 0 ? update.color : "#30363d"}`,
              boxShadow: index === 0 ? `0 0 20px ${update.color}40` : "none",
              animation: index === 0 ? "pulse 2s infinite" : "none",
              position: "relative"
            }}
          >
            {/* Time & Icon */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 60
            }}>
              <div style={{
                fontSize: 20,
                marginBottom: 4
              }}>
                {update.icon}
              </div>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#8b949e",
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {update.time}
              </div>
              {index === 0 && (
                <div style={{
                  fontSize: 8,
                  padding: "2px 6px",
                  background: "#ff1744",
                  color: "#fff",
                  borderRadius: 4,
                  marginTop: 4,
                  fontWeight: 700
                }}>
                  LATEST
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14,
                fontWeight: 800,
                color: index === 0 ? update.color : "#e6edf3",
                marginBottom: 4,
                letterSpacing: 0.5
              }}>
                {update.text}
              </div>
              <div style={{
                fontSize: 12,
                color: "#8b949e",
                lineHeight: 1.5,
                marginBottom: 6
              }}>
                {update.details}
              </div>
              <div style={{
                fontSize: 10,
                color: "#6e7681",
                fontStyle: "italic"
              }}>
                Source: {update.source}
              </div>
            </div>

            {/* Status indicator */}
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: index === 0 ? update.color : "#30363d",
              boxShadow: index === 0 ? `0 0 10px ${update.color}` : "none",
              animation: index === 0 ? "blink 1s infinite" : "none"
            }} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 20,
        padding: 12,
        background: "rgba(255,23,68,0.1)",
        borderRadius: 8,
        textAlign: "center",
        border: "1px dashed #ff1744"
      }}>
        <div style={{
          fontSize: 11,
          color: "#ff6d00",
          fontWeight: 600
        }}>
          ⚠️ This feed updates automatically as events unfold
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

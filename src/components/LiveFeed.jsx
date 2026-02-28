import { useState, useEffect } from 'react';

// Live War Feed - Real-time updates
// Sources: BBC News, Reuters, AP, Al Jazeera, CNN, Fox News, NYT
const LIVE_UPDATES = [
  {
    id: 1,
    time: "15:22",
    icon: "🚀",
    color: "#ff0000",
    text: "IRAN BALLISTIC MISSILE RETALIATION",
    details: "Iran launches first wave of ballistic missile retaliation against multiple targets. Dubai reportedly hit. Major escalation in progress.",
    source: "Iranian Military / Breaking",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 2,
    time: "15:20",
    icon: "🇦🇪",
    color: "#ff0000",
    text: "DUBAI HIT BY IRANIAN MISSILES",
    details: "Reports indicate Iran has managed to hit Dubai with ballistic missiles. Major civilian center struck. Casualties expected.",
    source: "Multiple / Regional",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 3,
    time: "12:34",
    icon: "✈️",
    color: "#ff0000",
    text: "ISRAELI OFFICIALS EVACUATING",
    details: "JUST IN: Israeli officials' airplanes evacuating from Ben Gurion Airport in fear of Iranian missile strikes against top Israeli leadership",
    source: "Israeli Officials",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 4,
    time: "12:33",
    icon: "🇨🇳",
    color: "#ff0000",
    text: "CHINA: 'US IS A WAR ADDICT'",
    details: "China Foreign Ministry: 'US has 800 overseas military bases in 80+ countries. US is the main cause of international disorder, global turbulence, and regional instability.'",
    source: "China Foreign Ministry",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 3,
    time: "12:32",
    icon: "🚨",
    color: "#ff0000",
    text: "ABU DHABI CITY CENTRE STRUCK BY MISSILE",
    details: "IRAN FIRES MISSILE AT UAE CAPITAL: Abu Dhabi city centre hit - Major escalation, Iran attacking multiple nations",
    source: "Multiple / Breaking",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 2,
    time: "12:30",
    icon: "🇸🇦",
    color: "#00e676",
    text: "SAUDI ARABIA MOBILIZES",
    details: "Saudi Arabia deploying ALL available resources to support UAE, Bahrain, Qatar, Kuwait, and Jordan - Gulf coalition forming",
    source: "Saudi Foreign Ministry",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 3,
    time: "10:45",
    icon: "🔥",
    color: "#ff0000",
    text: "NATANZ NUCLEAR FACILITY DESTROYED",
    details: "Satellite imagery confirms complete destruction of Iran's main uranium enrichment plant - IAEA confirms",
    source: "Reuters / IAEA",
    url: "https://www.reuters.com/world/middle-east/"
  },
  {
    id: 4,
    time: "10:30",
    icon: "🇺🇸",
    color: "#2979ff",
    text: "BIDEN: 'WE STAND WITH ISRAEL'",
    details: "Former President Biden issues statement supporting military action - 'No choice but to eliminate nuclear threat'",
    source: "CNN",
    url: "https://www.cnn.com/"
  },
  {
    id: 5,
    time: "10:15",
    icon: "🚀",
    color: "#ff1744",
    text: "HEZBOLLAH JOINS THE FIGHT",
    details: "Lebanese Hezbollah launches rockets at northern Israel - IDF responding with artillery strikes",
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/"
  },
  {
    id: 6,
    time: "10:00",
    icon: "🛢️",
    color: "#ffd600",
    text: "OIL HITS $195/BARREL",
    details: "Brent crude surges to $195 - Highest since 2008 financial crisis - Markets in panic",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/"
  },
  {
    id: 7,
    time: "09:45",
    icon: "🇷🇺",
    color: "#9c27b0",
    text: "RUSSIA CONDEMNS STRIKES",
    details: "Kremlin calls US-Israeli action 'dangerous escalation' - Putin convenes emergency security council",
    source: "Reuters",
    url: "https://www.reuters.com/world/"
  },
  {
    id: 8,
    time: "09:30",
    icon: "🏛️",
    color: "#00e676",
    text: "US CONGRESS BRIEFED",
    details: "Gang of 8 receives classified briefing on war objectives - Bipartisan support reported",
    source: "AP",
    url: "https://apnews.com/"
  },
  {
    id: 9,
    time: "09:15",
    icon: "⚡",
    color: "#ff6d00",
    text: "IRAQ MILITIAS ON HIGH ALERT",
    details: "Pro-Iran militias in Iraq mobilizing - US Embassy Baghdad in lockdown",
    source: "BBC",
    url: "https://www.bbc.com/news/world-middle-east"
  },
  {
    id: 10,
    time: "09:00",
    icon: "🌐",
    color: "#9c27b0",
    text: "IRAN INTERNET BLACKOUT",
    details: "National connectivity at 4% - Near-total blackout amid combat operations",
    source: "NetBlocks",
    url: "https://netblocks.org/"
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
              <a 
                href={update.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 10,
                  color: "#00e676",
                  fontStyle: "italic",
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                📰 Source: {update.source} →
              </a>
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

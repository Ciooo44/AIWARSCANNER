import { useState } from 'react';

// War News Sources - Verified accounts and sources covering the Iran-Israel-US conflict
const NEWS_SOURCES = {
  official: [
    { name: "IDF", handle: "@IDF", platform: "X", url: "https://twitter.com/IDF", verified: true, type: "Official" },
    { name: "Israel PM Office", handle: "@IsraeliPM", platform: "X", url: "https://twitter.com/IsraeliPM", verified: true, type: "Official" },
    { name: "US Central Command", handle: "@CENTCOM", platform: "X", url: "https://twitter.com/CENTCOM", verified: true, type: "Official" },
    { name: "The White House", handle: "@WhiteHouse", platform: "X", url: "https://twitter.com/WhiteHouse", verified: true, type: "Official" },
    { name: "Iran Foreign Ministry", handle: "@IRIMFA_EN", platform: "X", url: "https://twitter.com/IRIMFA_EN", verified: true, type: "Official" },
  ],
  news: [
    { name: "Reuters", handle: "@Reuters", platform: "X", url: "https://twitter.com/Reuters", verified: true, type: "News" },
    { name: "BBC Breaking", handle: "@BBCBreaking", platform: "X", url: "https://twitter.com/BBCBreaking", verified: true, type: "News" },
    { name: "Al Jazeera", handle: "@AJEnglish", platform: "X", url: "https://twitter.com/AJEnglish", verified: true, type: "News" },
    { name: "CNN Breaking", handle: "@CNN", platform: "X", url: "https://twitter.com/CNN", verified: true, type: "News" },
    { name: "AP News", handle: "@AP", platform: "X", url: "https://twitter.com/AP", verified: true, type: "News" },
    { name: "Bloomberg", handle: "@business", platform: "X", url: "https://twitter.com/business", verified: true, type: "News" },
  ],
  osint: [
    { name: "OSINTdefender", handle: "@sentdefender", platform: "X", url: "https://twitter.com/sentdefender", verified: false, type: "OSINT" },
    { name: "War Monitor", handle: "@WarMonitors", platform: "X", url: "https://twitter.com/WarMonitors", verified: false, type: "OSINT" },
    { name: "Intel Crab", handle: "@IntelCrab", platform: "X", url: "https://twitter.com/IntelCrab", verified: true, type: "OSINT" },
    { name: "Flightradar24", handle: "@flightradar24", platform: "X", url: "https://twitter.com/flightradar24", verified: true, type: "OSINT" },
    { name: "NetBlocks", handle: "@netblocks", platform: "X", url: "https://twitter.com/netblocks", verified: true, type: "OSINT" },
    { name: "Big Serge", handle: "@Trollstoy88", platform: "X", url: "https://twitter.com/Trollstoy88", verified: false, type: "OSINT" },
  ],
  telegram: [
    { name: "War Monitor", handle: "@warmonitor1", platform: "Telegram", url: "https://t.me/warmonitor1", verified: false, type: "Telegram" },
    { name: "Intel Slava Z", handle: "@intelslava", platform: "Telegram", url: "https://t.me/intelslava", verified: false, type: "Telegram" },
    { name: "Middle East Spectator", handle: "@MEastSpectator", platform: "Telegram", url: "https://t.me/MEastSpectator", verified: false, type: "Telegram" },
    { name: "Iran Observer", handle: "@IranObserver0", platform: "Telegram", url: "https://t.me/IranObserver0", verified: false, type: "Telegram" },
  ],
  analysis: [
    { name: "CIT", handle: "@CITeam_en", platform: "X", url: "https://twitter.com/CITeam_en", verified: true, type: "Analysis" },
    { name: "IISS", handle: "@IISS_org", platform: "X", url: "https://twitter.com/IISS_org", verified: true, type: "Analysis" },
    { name: "RAND Corporation", handle: "@RANDCorporation", platform: "X", url: "https://twitter.com/RANDCorporation", verified: true, type: "Analysis" },
    { name: "Crisis Group", handle: "@CrisisGroup", platform: "X", url: "https://twitter.com/CrisisGroup", verified: true, type: "Analysis" },
  ]
};

const PLATFORM_ICONS = {
  X: "𝕏",
  Telegram: "✈️"
};

export default function WarNewsSources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSource, setHoveredSource] = useState(null);

  const categories = [
    { id: "all", label: "🔍 All Sources", count: Object.values(NEWS_SOURCES).flat().length },
    { id: "official", label: "🏛️ Official", count: NEWS_SOURCES.official.length },
    { id: "news", label: "📰 News", count: NEWS_SOURCES.news.length },
    { id: "osint", label: "🔎 OSINT", count: NEWS_SOURCES.osint.length },
    { id: "telegram", label: "✈️ Telegram", count: NEWS_SOURCES.telegram.length },
    { id: "analysis", label: "📊 Analysis", count: NEWS_SOURCES.analysis.length },
  ];

  const getSources = () => {
    if (activeCategory === "all") {
      return Object.values(NEWS_SOURCES).flat();
    }
    return NEWS_SOURCES[activeCategory] || [];
  };

  const sources = getSources();

  return (
    <div style={{
      background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d1117 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: "2px solid #30363d"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{
          fontSize: 18,
          fontWeight: 900,
          color: "#e6edf3",
          letterSpacing: 3,
          marginBottom: 8
        }}>
          📡 WAR NEWS SOURCES
        </div>
        <div style={{
          fontSize: 11,
          color: "#8b949e"
        }}>
          Verified accounts and live sources covering the conflict
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 20,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: activeCategory === cat.id ? "#ff1744" : "#161b22",
              color: activeCategory === cat.id ? "#fff" : "#8b949e",
              border: `1px solid ${activeCategory === cat.id ? "#ff1744" : "#30363d"}`,
              transition: "all 0.2s"
            }}
          >
            {cat.label}
            <span style={{
              marginLeft: 6,
              padding: "2px 6px",
              background: activeCategory === cat.id ? "#fff" : "#30363d",
              color: activeCategory === cat.id ? "#ff1744" : "#8b949e",
              borderRadius: 10,
              fontSize: 9
            }}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sources Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 12
      }}>
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredSource(index)}
            onMouseLeave={() => setHoveredSource(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              background: hoveredSource === index ? "#1c2128" : "#161b22",
              borderRadius: 12,
              border: `1px solid ${hoveredSource === index ? "#ff1744" : "#30363d"}`,
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: hoveredSource === index ? "0 4px 20px rgba(255,23,68,0.2)" : "none"
            }}
          >
            {/* Platform Icon */}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: source.platform === "X" ? "#000" : "#0088cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#fff"
            }}>
              {PLATFORM_ICONS[source.platform] || "🔗"}
            </div>

            {/* Source Info */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 2
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#e6edf3"
                }}>
                  {source.name}
                </span>
                {source.verified && (
                  <span style={{
                    fontSize: 10,
                    color: "#00e676"
                  }}>
                    ✓
                  </span>
                )}
              </div>
              <div style={{
                fontSize: 11,
                color: "#8b949e",
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {source.handle}
              </div>
              <div style={{
                display: "flex",
                gap: 8,
                marginTop: 4
              }}>
                <span style={{
                  fontSize: 9,
                  padding: "2px 6px",
                  background: source.type === "Official" ? "#ff174420" : 
                            source.type === "News" ? "#2979ff20" :
                            source.type === "OSINT" ? "#00e67620" :
                            source.type === "Telegram" ? "#0088cc20" : "#ffd60020",
                  color: source.type === "Official" ? "#ff1744" :
                         source.type === "News" ? "#2979ff" :
                         source.type === "OSINT" ? "#00e676" :
                         source.type === "Telegram" ? "#0088cc" : "#ffd600",
                  borderRadius: 4,
                  fontWeight: 600
                }}>
                  {source.type}
                </span>
                <span style={{
                  fontSize: 9,
                  color: "#6e7681"
                }}>
                  {source.platform}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div style={{
              fontSize: 16,
              color: hoveredSource === index ? "#ff1744" : "#6e7681",
              transition: "color 0.2s"
            }}>
              →
            </div>
          </a>
        ))}
      </div>

      {/* Footer Note */}
      <div style={{
        marginTop: 20,
        padding: 14,
        background: "rgba(255,23,68,0.1)",
        borderRadius: 10,
        border: "1px dashed #ff1744",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: 11,
          color: "#ff6d00",
          fontWeight: 600
        }}>
          ⚠️ Cross-reference multiple sources. War-time information can be incomplete or contradictory.
        </div>
      </div>

      {/* Quick Links Bar */}
      <div style={{
        marginTop: 16,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {["Liveuamap", "Flightradar24", "MarineTraffic", "FIRMS NASA"].map(link => (
          <a
            key={link}
            href={link === "Liveuamap" ? "https://liveuamap.com/" :
                 link === "Flightradar24" ? "https://www.flightradar24.com/" :
                 link === "MarineTraffic" ? "https://www.marinetraffic.com/" :
                 "https://firms.modaps.eosdis.nasa.gov/"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: 6,
              fontSize: 10,
              color: "#8b949e",
              textDecoration: "none",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#00e676";
              e.target.style.color = "#00e676";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#30363d";
              e.target.style.color = "#8b949e";
            }}
          >
            {link} →
          </a>
        ))}
      </div>
    </div>
  );
}

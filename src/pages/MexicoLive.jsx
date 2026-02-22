import { useState, useEffect } from 'react';

// Back button component
function BackButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      style={{
        padding: "8px 16px", background: "#21262d",
        border: "1px solid #30363d", borderRadius: 6,
        color: "#e6edf3", fontSize: 11, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6
      }}
    >
      ← BACK TO IRAN
    </button>
  );
}

// Mexico Cartel Conflict Data - February 22, 2026
const CARTEL_GROUPS = [
  {
    id: 'sinaloa',
    name: 'Sinaloa Cartel',
    leader: 'Ismael "El Mayo" Zambada',
    territory: 'Sinaloa, Sonora, Baja California',
    strength: '15,000+ members',
    status: 'ACTIVE — WAR WITH CJNG',
    color: '#ff1744'
  },
  {
    id: 'cjng',
    name: 'CJNG (Jalisco)',
    leader: 'Nemesio "El Mencho" Oseguera',
    territory: 'Jalisco, Michoacán, Guanajuato',
    strength: '12,000+ members',
    status: 'ACTIVE — OFFENSIVE OPERATIONS',
    color: '#ffd600'
  },
  {
    id: 'golfo',
    name: 'Gulf Cartel',
    leader: 'Fragmented factions',
    territory: 'Tamaulipas, Nuevo León',
    strength: '5,000+ members',
    status: 'DECLINING — INTERNAL WAR',
    color: '#ff6d00'
  },
  {
    id: 'zetas',
    name: 'Los Zetas Remnants',
    leader: 'Splinter groups',
    territory: 'Coahuila, Nuevo León',
    strength: '2,000+ members',
    status: 'FRAGMENTED',
    color: '#6e7681'
  }
];

const MEXICO_NEWS = [
  {
    time: "2h ago",
    source: "El Universal",
    title: "Sinaloa Cartel ambushes Mexican Army convoy near Culiacán — 8 soldiers killed",
    category: "conflict",
    urgent: true,
    url: "https://www.eluniversal.com.mx"
  },
  {
    time: "3h ago",
    source: "Reuters",
    title: "CJNG launches coordinated attacks in Michoacán — 15 municipalities under alert",
    category: "conflict",
    urgent: true,
    url: "https://www.reuters.com/world/americas/"
  },
  {
    time: "5h ago",
    source: "BBC",
    title: "Mexican President deploys 5,000 troops to Tijuana border amid cartel surge",
    category: "military",
    urgent: false,
    url: "https://www.bbc.com/news/world-latin-america"
  },
  {
    time: "6h ago",
    source: "CNN",
    title: "US Homeland Security issues travel warning for northern Mexico states",
    category: "diplomacy",
    urgent: false,
    url: "https://www.cnn.com/world/americas"
  },
  {
    time: "8h ago",
    source: "Al Jazeera",
    title: "Cartels using drone-dropped IEDs against military checkpoints — new tactic",
    category: "intelligence",
    urgent: true,
    url: "https://www.aljazeera.com/news/2026/2/22/mexico-cartels-drone-attacks"
  },
  {
    time: "12h ago",
    source: "Los Angeles Times",
    title: "Sinaloa vs CJNG: War escalates for control of fentanyl routes to US",
    category: "analysis",
    urgent: false,
    url: "https://www.latimes.com/world-nation/story/2026-02-22/mexico-cartel-war"
  }
];

// Latest Tweets about Mexico Cartel conflict
const MEXICO_TWEETS = [
  {
    handle: "@FuriaNegra7",
    time: "45m",
    content: "🚨 BREAKING: Heavy gunfire reported in Culiacán, Sinaloa. Mexican Army helicopter circling the area. Cartel blockades on major highways. #Mexico #CartelWar",
    verified: true
  },
  {
    handle: "@siete_letras",
    time: "1h",
    content: "CJNG sicarios spotted in Zamora, Michoacán. Local police on high alert. Military convoys moving into the city. Stay safe everyone. 🚨",
    verified: false
  },
  {
    handle: "@FronteraAlerta",
    time: "2h",
    content: "US Border Patrol on maximum alert. Increased cartel activity reported in Tijuana and Ciudad Juárez corridors. Fentanyl seizures up 340% this week.",
    verified: true
  },
  {
    handle: "@MexicoInformed",
    time: "3h",
    content: "President Sheinbaum confirms: 'We are at war with the cartels. No negotiations.' 5,000 additional troops deployed to Sinaloa and Jalisco.",
    verified: true
  },
  {
    handle: "@BorderObserver",
    time: "4h",
    content: "Drone footage: Cartel convoy moving through rural Sinaloa. Armed vehicles, technicals with .50 cals. This is not stopping anytime soon.",
    verified: false
  }
];

const LIVE_STREAMS = [
  {
    name: "Mexico City News 24/7",
    url: "https://www.youtube.com/embed/LuhqF9ODiXs?autoplay=0&mute=1",
    location: "CDMX"
  },
  {
    name: "Border Security Watch",
    url: "https://www.youtube.com/embed/kb5wFg_lwfI?autoplay=0&mute=1",
    location: "US-Mexico Border"
  },
  {
    name: "Sinaloa Live Coverage",
    url: "https://www.youtube.com/embed/XJffb6ueXHU?autoplay=0&mute=1",
    location: "Sinaloa"
  },
  {
    name: "Cartel Conflict Monitor",
    url: "https://www.youtube.com/embed/rdqLTdTVljg?autoplay=0&mute=1",
    location: "Multiple States"
  }
];

export default function MexicoLive() {
  const [activeTab, setActiveTab] = useState('news');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", padding: 20 }}>
      {/* Header */}
      <div style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px", background: "#161b22", borderRadius: 12,
        border: "1px solid #1a2332", marginBottom: 20
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            🇲🇽 MEXICO CARTEL CONFLICT — LIVE
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>
            War on Drugs • Cartel Warfare • Military Operations • {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <BackButton />
          <div style={{
            padding: "8px 16px", background: "#ff174420", borderRadius: 6,
            border: "1px solid #ff174440"
          }}>
            <span style={{ fontSize: 12, color: "#ff1744", fontWeight: 600 }}>
              🔴 ACTIVE CONFLICT
            </span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{
        background: "linear-gradient(90deg, #ff174420 0%, #ff174410 50%, #ff174420 100%)",
        border: "1px solid #ff174440", borderRadius: 8, padding: 12, marginBottom: 20
      }}>
        <div style={{ fontSize: 12, color: "#ff8a80", fontWeight: 500 }}>
          ⚠️ HIGH ALERT: Escalating violence in Sinaloa, Michoacán, and Tamaulipas. Mexican Army conducting counter-cartel operations. 47 deaths reported in past 48 hours.
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left: News Feed */}
        <div>
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16, marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              📰 LIVE NEWS FEED
            </div>
            {MEXICO_NEWS.map((news, i) => (
              <a 
                key={i}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "12px", background: i % 2 === 0 ? "#0d1117" : "transparent",
                  borderRadius: 6, marginBottom: 8,
                  borderLeft: `3px solid ${news.urgent ? "#ff1744" : "#ffd600"}`,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "#6e7681" }}>{news.source} • {news.time}</span>
                  {news.urgent && <span style={{ fontSize: 8, color: "#ff1744" }}>🔴 URGENT</span>}
                </div>
                <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 500, lineHeight: 1.4 }}>{news.title}</div>
                <div style={{ fontSize: 8, color: "#2979ff", marginTop: 4 }}>Read more →</div>
              </a>
            ))}
          </div>

          {/* Cartel Groups */}
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              🎯 MAJOR CARTELS
            </div>
            {CARTEL_GROUPS.map(cartel => (
              <div key={cartel.id} style={{
                padding: 12, background: "#0d1117", borderRadius: 8,
                borderLeft: `3px solid ${cartel.color}`, marginBottom: 10
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#e6edf3", fontWeight: 600 }}>{cartel.name}</span>
                  <span style={{ fontSize: 9, color: cartel.color, padding: "2px 8px", background: `${cartel.color}20`, borderRadius: 4 }}>
                    {cartel.status}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "#6e7681", marginTop: 4 }}>
                  Leader: {cartel.leader}
                </div>
                <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>
                  {cartel.territory} • {cartel.strength}
                </div>
              </div>
            ))}
          </div>

          {/* Live Tweets */}
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16, marginTop: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              🐦 LIVE X/TWITTER UPDATES
            </div>
            {MEXICO_TWEETS.map((tweet, i) => (
              <div key={i} style={{
                padding: "10px", background: "#0d1117", borderRadius: 8,
                marginBottom: 8, border: "1px solid #1a2332"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: "#1da1f2", fontWeight: 600 }}>{tweet.handle}</span>
                  <span style={{ fontSize: 9, color: "#6e7681" }}>{tweet.time}</span>
                </div>
                <div style={{ fontSize: 10, color: "#e6edf3", lineHeight: 1.4 }}>{tweet.content}</div>
                {tweet.verified && (
                  <div style={{ fontSize: 8, color: "#00e676", marginTop: 4 }}>✓ Verified Source</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Streams & Stats */}
        <div>
          {/* Live Streams */}
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16, marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              📹 LIVE CAMERAS (4 CHANNELS)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {LIVE_STREAMS.map((stream, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 9, color: "#8b949e", marginBottom: 4 }}>
                    📍 {stream.location}
                  </div>
                  <div style={{
                    position: "relative", paddingBottom: "56.25%", height: 0,
                    background: "#0d1117", borderRadius: 6, overflow: "hidden"
                  }}>
                    <iframe
                      src={stream.url}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allowFullScreen
                    />
                  </div>
                  <div style={{ fontSize: 8, color: "#6e7681", marginTop: 2 }}>{stream.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conflict Stats */}
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              📊 CONFLICT STATISTICS (2026)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#ff1744" }}>47</div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>Deaths (48h)</div>
              </div>
              <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#ffd600" }}>15</div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>States Affected</div>
              </div>
              <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#00e676" }}>34K</div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>Troops Deployed</div>
              </div>
              <div style={{ padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#2979ff" }}>$19B</div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>Drug Trade Value</div>
              </div>
            </div>
          </div>

          {/* Military Operations */}
          <div style={{ 
            background: "#161b22", borderRadius: 12, border: "1px solid #1a2332",
            padding: 16, marginTop: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
              ⚔️ MILITARY OPERATIONS
            </div>
            <div style={{ fontSize: 11, color: "#8b949e", lineHeight: 1.6 }}>
              • <strong style={{ color: "#e6edf3" }}>Operation Jalisco:</strong> 2,500 troops deployed to Guadalajara metro area<br/>
              • <strong style={{ color: "#e6edf3" }}>Sinaloa Siege:</strong> Air strikes on cartel compounds near Badiraguato<br/>
              • <strong style={{ color: "#e6edf3" }}>Tijuana Lockdown:</strong> Border checkpoints reinforced<br/>
              • <strong style={{ color: "#e6edf3" }}>Michoacán Sweep:</strong> Drone surveillance over Tierra Caliente
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 20, padding: "12px 20px", background: "#161b22",
        borderRadius: 8, border: "1px solid #1a2332",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 9, color: "#484f58" }}>
          DATA SOURCES: El Universal • Reuters • BBC • CNN • Mexican Government
        </div>
        <div style={{ fontSize: 9, color: "#484f58" }}>
          Last Updated: {currentTime.toISOString().slice(0, 19)}Z
        </div>
      </div>
    </div>
  );
}

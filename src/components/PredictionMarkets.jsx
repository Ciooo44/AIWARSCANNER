import { useState } from 'react';

// Polymarket Iran Predictions - WAR STARTED MODE
const POLYMARKET_BETS = [
  {
    id: 1,
    question: "Will Iran close Strait of Hormuz >7 days?",
    probability: 68,
    volume: "$45M",
    trend: "up",
    change: "+33%",
    url: "https://polymarket.com/event/hormuz",
    category: "HORMUZ",
    icon: "🌊",
    status: "ACTIVE WAR"
  },
  {
    id: 2,
    question: "Will Khamenei be removed by March 31?",
    probability: 52,
    volume: "$28M",
    trend: "up",
    change: "+28%",
    url: "https://polymarket.com/event/khamenei-out-as-supreme-leader-of-iran-by-march-31",
    category: "REGIME CHANGE",
    icon: "👑",
    status: "ACTIVE WAR"
  },
  {
    id: 3,
    question: "Will Iran use chemical weapons?",
    probability: 18,
    volume: "$12M",
    trend: "up",
    change: "+5%",
    url: "https://polymarket.com/event/iran-chemical",
    category: "WMD",
    icon: "☣️",
    status: "ACTIVE WAR"
  },
  {
    id: 4,
    question: "Will US strike Iranian nuclear facilities?",
    probability: 95,
    volume: "$52M",
    trend: "up",
    change: "+45%",
    url: "https://polymarket.com/event/us-strikes-iran-by",
    category: "STRIKES",
    icon: "💥",
    status: "✅ RESOLVED YES"
  },
  {
    id: 5,
    question: "Will Israel strike Iran independently?",
    probability: 100,
    volume: "$18M",
    trend: "up",
    change: "+56%",
    url: "https://polymarket.com/event/israel-iran",
    category: "ISRAEL",
    icon: "🇮🇱",
    status: "✅ RESOLVED YES"
  },
  {
    id: 6,
    question: "Will Russia directly support Iran militarily?",
    probability: 35,
    volume: "$22M",
    trend: "up",
    change: "+15%",
    url: "https://polymarket.com/event/russia-iran",
    category: "RUSSIA",
    icon: "🇷🇺",
    status: "ACTIVE WAR"
  },
  {
    id: 7,
    question: "Will China intervene to protect Iran?",
    probability: 12,
    volume: "$15M",
    trend: "up",
    change: "+3%",
    url: "https://polymarket.com/event/china-iran",
    category: "CHINA",
    icon: "🇨🇳",
    status: "ACTIVE WAR"
  },
  {
    id: 8,
    question: "Will Iran attack Saudi oil facilities?",
    probability: 41,
    volume: "$19M",
    trend: "up",
    change: "+18%",
    url: "https://polymarket.com/event/iran-saudi",
    category: "ESCALATION",
    icon: "🛢️",
    status: "ACTIVE WAR"
  },
  {
    id: 9,
    question: "Will war expand beyond Iran/Iraq?",
    probability: 38,
    volume: "$25M",
    trend: "up",
    change: "+12%",
    url: "https://polymarket.com/event/war-expansion",
    category: "ESCALATION",
    icon: "⚔️",
    status: "ACTIVE WAR"
  },
  {
    id: 10,
    question: "Will US deploy ground troops to Iran?",
    probability: 22,
    volume: "$31M",
    trend: "up",
    change: "+8%",
    url: "https://polymarket.com/event/us-ground-troops",
    category: "GROUND WAR",
    icon: "🪖",
    status: "ACTIVE WAR"
  },
];

// Circular progress component with animation
function CircularProgress({ percentage, size = 70, strokeWidth = 6, color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={`grad-${percentage}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#21262d"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#grad-${percentage})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color }}>{percentage}%</div>
      </div>
    </div>
  );
}

// Sparkline component for trend
function Sparkline({ trend, color }) {
  const points = trend === "up" 
    ? "0,10 20,8 40,12 60,6 80,4 100,0"
    : trend === "down"
    ? "0,0 20,4 40,2 60,6 80,8 100,10"
    : "0,5 25,5 50,5 75,5 100,5";
  
  return (
    <svg width="40" height="12" viewBox="0 0 100 12" style={{ opacity: 0.6 }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PredictionMarkets() {
  const [bets] = useState(POLYMARKET_BETS);
  const [hoveredBet, setHoveredBet] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const getColor = (prob) => {
    if (prob >= 70) return "#ff1744";
    if (prob >= 40) return "#ffd600";
    if (prob >= 20) return "#2979ff";
    return "#00e676";
  };

  const getRiskLevel = (prob) => {
    if (prob >= 70) return "🔴 CRITICAL";
    if (prob >= 40) return "🟡 ELEVATED";
    if (prob >= 20) return "🔵 MODERATE";
    return "🟢 LOW";
  };

  const categories = ["ALL", ...new Set(bets.map(b => b.category))];
  
  const filteredBets = selectedCategory === "ALL" 
    ? bets 
    : bets.filter(b => b.category === selectedCategory);

  const totalVolume = bets.reduce((sum, b) => {
    const num = parseFloat(b.volume.replace('$', '').replace('M', ''));
    return sum + num;
  }, 0);

  const resolvedCount = bets.filter(b => b.status.includes("RESOLVED")).length;

  return (
    <div style={{ background: "#0d1117", padding: 24, borderBottom: "2px solid #1a2332" }}>
      {/* WAR MODE HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #8b0000 0%, #ff0000 100%)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        border: "3px solid #ffeb3b",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 900,
          color: "#ffeb3b",
          letterSpacing: 3,
          marginBottom: 8,
          textShadow: "0 0 20px rgba(255,235,59,0.5)"
        }}>
          🔴 PREDICTION MARKETS — WAR MODE 🔴
        </div>
        <div style={{ fontSize: 12, color: "#fff" }}>
          Strike predictions RESOLVED. Now tracking war escalation scenarios.
        </div>
      </div>

      {/* Header with Stats */}
      <div style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "flex-start", 
        marginBottom: 20, flexWrap: "wrap", gap: 16 
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            📊 POLYMARKET PREDICTIONS
          </div>
          <div style={{ fontSize: 12, color: "#8b949e", marginTop: 4 }}>
            War Escalation Markets • ${totalVolume.toFixed(0)}M Total Volume • {resolvedCount} RESOLVED
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{
            padding: "12px 20px", background: "#161b22", borderRadius: 8,
            border: "1px solid #1a2332", textAlign: "center"
          }}>
            <div style={{ fontSize: 10, color: "#6e7681" }}>MARKETS</div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#00e676" }}>{bets.length}</div>
          </div>
          <div style={{
            padding: "12px 20px", background: "#ff174420", borderRadius: 8,
            border: "1px solid #ff1744", textAlign: "center"
          }}>
            <div style={{ fontSize: 10, color: "#ff6d00" }}>RESOLVED</div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#ff1744" }}>{resolvedCount}</div>
          </div>
          <a 
            href="https://polymarket.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              fontSize: 12, color: "#00e676", textDecoration: "none",
              padding: "12px 20px", background: "#00e67620", borderRadius: 8,
              border: "1px solid #00e67640", fontWeight: 500
            }}
          >
            polymarket.com →
          </a>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 14px", borderRadius: 20, border: "none",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              background: selectedCategory === cat ? "#ff1744" : "#161b22",
              color: selectedCategory === cat ? "#fff" : "#8b949e",
              border: `1px solid ${selectedCategory === cat ? "#ff1744" : "#1a2332"}`
            }}
          >
            {cat === "ALL" ? "🔍 All Markets" : cat}
          </button>
        ))}
      </div>

      {/* Predictions Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        {filteredBets.map((bet) => {
          const color = getColor(bet.probability);
          const isHovered = hoveredBet === bet.id;
          const isResolved = bet.status.includes("RESOLVED");
          
          return (
            <a
              key={bet.id}
              href={bet.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredBet(bet.id)}
              onMouseLeave={() => setHoveredBet(null)}
              style={{
                padding: 16, 
                background: isResolved ? "#00e67610" : (isHovered ? "#1c2128" : "#161b22"), 
                borderRadius: 12,
                border: `2px solid ${isResolved ? "#00e676" : (isHovered ? color : "#1a2332")}`, 
                textDecoration: "none",
                display: "flex", gap: 14, alignItems: "center",
                transition: "all 0.2s", 
                boxShadow: isResolved ? "0 0 20px rgba(0,230,118,0.3)" : (isHovered ? `0 4px 24px ${color}15` : "none"),
                opacity: isResolved ? 0.9 : 1
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: 28, opacity: isResolved ? 0.7 : 1 }}>{bet.icon}</div>
              
              {/* Circular Chart */}
              <CircularProgress percentage={bet.probability} color={isResolved ? "#00e676" : color} size={60} strokeWidth={5} />
              
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 4
                }}>
                  <span style={{
                    fontSize: 8, padding: "2px 6px", borderRadius: 4,
                    background: isResolved ? "#00e67620" : `${color}20`, 
                    color: isResolved ? "#00e676" : color, 
                    fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: 0.5
                  }}>
                    {isResolved ? "✅ " + bet.status : bet.category}
                  </span>
                </span>
                </div>
                
                <div style={{ 
                  fontSize: 12, color: "#e6edf3", fontWeight: 600, lineHeight: 1.4, marginBottom: 8,
                  textDecoration: isResolved ? "line-through" : "none",
                  opacity: isResolved ? 0.7 : 1
                }}>
                  {bet.question}
                </div>
                
                {/* Progress bar */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${bet.probability}%`,
                      background: isResolved ? "#00e676" : `linear-gradient(90deg, ${color}60, ${color})`,
                      borderRadius: 3, transition: "width 0.5s ease"
                    }} />
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, color: isResolved ? "#00e676" : color }}>
                    {isResolved ? "✅ RESOLVED YES" : getRiskLevel(bet.probability)}
                  </span>
                  <span style={{ fontSize: 9, color: "#6e7681" }}>•</span>
                  <span style={{ fontSize: 10, color: "#8b949e" }}>Vol: {bet.volume}</span>
                  <span style={{ fontSize: 9, color: "#6e7681" }}>•</span>
                  <span style={{ 
                    fontSize: 10, color: bet.trend === "up" ? "#ff1744" : bet.trend === "down" ? "#00e676" : "#6e7681",
                    display: "flex", alignItems: "center", gap: 4
                  }}>
                    {bet.trend === "up" ? "📈" : bet.trend === "down" ? "📉" : "➡️"} {bet.change}
                  </span>
                  {!isResolved && <Sparkline trend={bet.trend} color={bet.trend === "up" ? "#ff1744" : bet.trend === "down" ? "#00e676" : "#6e7681"} />}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* War Markets Summary */}
      <div style={{
        marginTop: 24, 
        padding: 20, 
        background: "linear-gradient(135deg, #1a0000 0%, #2d1b1b 100%)",
        borderRadius: 12, 
        border: "2px solid #ff1744"
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744", marginBottom: 12 }}>
          📈 ESCALATION PROBABILITIES (WAR ACTIVE)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>HORMUZ CLOSURE</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ff1744" }}>68%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>REGIME CHANGE</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd600" }}>52%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>WAR EXPANSION</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd600" }}>38%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>GROUND INVASION</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#2979ff" }}>22%</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

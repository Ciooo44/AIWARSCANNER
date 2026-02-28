import { useState } from 'react';

// Polymarket Iran War Predictions - ACTIVE COMBAT MODE
// All predictions updated for ongoing war scenario
const POLYMARKET_BETS = [
  {
    id: 1,
    question: "Will war last longer than 30 days?",
    probability: 72,
    volume: "$78M",
    trend: "up",
    change: "+18%",
    url: "https://polymarket.com/event/war-duration",
    category: "DURATION",
    icon: "⏰",
    status: "ACTIVE WAR"
  },
  {
    id: 2,
    question: "Will Iran close Strait of Hormuz >14 days?",
    probability: 58,
    volume: "$65M",
    trend: "up",
    change: "+23%",
    url: "https://polymarket.com/event/hormuz",
    category: "HORMUZ",
    icon: "🌊",
    status: "ACTIVE WAR"
  },
  {
    id: 3,
    question: "Will Khamenei be removed by April 15?",
    probability: 48,
    volume: "$52M",
    trend: "up",
    change: "+24%",
    url: "https://polymarket.com/event/khamenei-removal",
    category: "REGIME CHANGE",
    icon: "👑",
    status: "ACTIVE WAR"
  },
  {
    id: 4,
    question: "Will oil hit $250/barrel?",
    probability: 41,
    volume: "$48M",
    trend: "up",
    change: "+19%",
    url: "https://polymarket.com/event/oil-price",
    category: "OIL",
    icon: "🛢️",
    status: "ACTIVE WAR"
  },
  {
    id: 5,
    question: "Will US deploy ground troops to Iran?",
    probability: 28,
    volume: "$55M",
    trend: "up",
    change: "+12%",
    url: "https://polymarket.com/event/ground-troops",
    category: "GROUND WAR",
    icon: "🪖",
    status: "ACTIVE WAR"
  },
  {
    id: 6,
    question: "Will Russia provide direct military aid to Iran?",
    probability: 38,
    volume: "$42M",
    trend: "up",
    change: "+16%",
    url: "https://polymarket.com/event/russia-aid",
    category: "RUSSIA",
    icon: "🇷🇺",
    status: "ACTIVE WAR"
  },
  {
    id: 7,
    question: "Will China impose sanctions on US?",
    probability: 15,
    volume: "$35M",
    trend: "up",
    change: "+8%",
    url: "https://polymarket.com/event/china-sanctions",
    category: "CHINA",
    icon: "🇨🇳",
    status: "ACTIVE WAR"
  },
  {
    id: 8,
    question: "Will Israel strike Iranian oil facilities?",
    probability: 67,
    volume: "$38M",
    trend: "up",
    change: "+22%",
    url: "https://polymarket.com/event/israel-oil",
    category: "ISRAEL",
    icon: "🇮🇱",
    status: "ACTIVE WAR"
  },
  {
    id: 9,
    question: "Will Iran attack Saudi oil facilities?",
    probability: 44,
    volume: "$41M",
    trend: "up",
    change: "+14%",
    url: "https://polymarket.com/event/iran-saudi",
    category: "ESCALATION",
    icon: "💥",
    status: "ACTIVE WAR"
  },
  {
    id: 10,
    question: "Will war expand to include 5+ countries?",
    probability: 52,
    volume: "$46M",
    trend: "up",
    change: "+17%",
    url: "https://polymarket.com/event/war-expansion",
    category: "ESCALATION",
    icon: "🌍",
    status: "ACTIVE WAR"
  },
  {
    id: 11,
    question: "Will Iran use ballistic missiles on Israel civilian targets?",
    probability: 61,
    volume: "$39M",
    trend: "up",
    change: "+21%",
    url: "https://polymarket.com/event/iran-civilian",
    category: "MISSILES",
    icon: "🚀",
    status: "ACTIVE WAR"
  },
  {
    id: 12,
    question: "Will US strike Iranian command centers in Tehran?",
    probability: 73,
    volume: "$44M",
    trend: "up",
    change: "+25%",
    url: "https://polymarket.com/event/us-tehran",
    category: "STRIKES",
    icon: "✈️",
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
          🔴 POLYMARKET PREDICTIONS — WAR MODE 🔴
        </div>
        <div style={{ fontSize: 12, color: "#fff" }}>
          Predicting war outcomes, duration, and escalation scenarios
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
            War Outcome Markets • ${totalVolume.toFixed(0)}M Total Volume • 12 Active Markets
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
                background: isHovered ? "#1c2128" : "#161b22", 
                borderRadius: 12,
                border: `2px solid ${isHovered ? color : "#1a2332"}`, 
                textDecoration: "none",
                display: "flex", gap: 14, alignItems: "center",
                transition: "all 0.2s", 
                boxShadow: isHovered ? `0 4px 24px ${color}15` : "none"
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: 28 }}>{bet.icon}</div>
              
              {/* Circular Chart */}
              <CircularProgress percentage={bet.probability} color={color} size={60} strokeWidth={5} />
              
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 4
                }}>
                  <span style={{
                    fontSize: 8, padding: "2px 6px", borderRadius: 4,
                    background: `${color}20`, 
                    color: color, 
                    fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: 0.5
                  }}>
                    {bet.category}
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: 12, color: "#e6edf3", fontWeight: 600, lineHeight: 1.4, marginBottom: 8
                }}>
                  {bet.question}
                </div>
                
                {/* Progress bar */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${bet.probability}%`,
                      background: `linear-gradient(90deg, ${color}60, ${color})`,
                      borderRadius: 3, transition: "width 0.5s ease"
                    }} />
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, color: color }}>
                    {getRiskLevel(bet.probability)}
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
                  <Sparkline trend={bet.trend} color={bet.trend === "up" ? "#ff1744" : bet.trend === "down" ? "#00e676" : "#6e7681"} />
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: 16,
                color: isHovered ? color : "#6e7681"
              }}>
                →
              </div>
            </a>
          );
        })}
      </div>

      {/* War Outcomes Summary */}
      <div style={{
        marginTop: 24, 
        padding: 20, 
        background: "linear-gradient(135deg, #1a0000 0%, #2d1b1b 100%)",
        borderRadius: 12, 
        border: "2px solid #ff1744"
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744", marginBottom: 12 }}>
          📈 WAR OUTCOME PROBABILITIES (HOUR 6)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>WAR >30 DAYS</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ff1744" }}>72%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>GROUND INVASION</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd600" }}>28%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>REGIME CHANGE</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd600" }}>48%</div>
          </div>
          <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8b949e" }}>OIL $250+</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd600" }}>41%</div>
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

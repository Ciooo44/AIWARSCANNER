import { useState } from 'react';

// Polymarket Iran Predictions - Extended
const POLYMARKET_BETS = [
  {
    id: 1,
    question: "US strikes Iran by March 7?",
    probability: 41,
    volume: "$378M",
    trend: "up",
    change: "+8%",
    url: "https://polymarket.com/event/us-strikes-iran-by",
    category: "STRIKE TIMING",
    icon: "🎯"
  },
  {
    id: 2,
    question: "US strikes Iran by March 15?",
    probability: 52,
    volume: "$378M",
    trend: "up",
    change: "+10%",
    url: "https://polymarket.com/event/us-strikes-iran-by",
    category: "STRIKE TIMING",
    icon: "🎯"
  },
  {
    id: 3,
    question: "Khamenei out by March 31?",
    probability: 24,
    volume: "$18M",
    trend: "up",
    change: "+3%",
    url: "https://polymarket.com/event/khamenei-out-as-supreme-leader-of-iran-by-march-31",
    category: "REGIME CHANGE",
    icon: "👑"
  },
  {
    id: 4,
    question: "Iran closes Strait of Hormuz >7 days?",
    probability: 35,
    volume: "$15M",
    trend: "up",
    change: "+7%",
    url: "https://polymarket.com/event/hormuz",
    category: "HORMUZ",
    icon: "🌊"
  },
  {
    id: 5,
    question: "Israel strikes Iran independently?",
    probability: 44,
    volume: "$12M",
    trend: "up",
    change: "+6%",
    url: "https://polymarket.com/event/israel-iran",
    category: "ISRAEL",
    icon: "🇮🇱"
  },
  {
    id: 6,
    question: "Iran nuclear deal by June 2026?",
    probability: 12,
    volume: "$5M",
    trend: "down",
    change: "-3%",
    url: "https://polymarket.com/event/iran-deal",
    category: "DIPLOMACY",
    icon: "🕊️"
  },
  {
    id: 7,
    question: "Pentagon Pizza Index spike?",
    probability: 28,
    volume: "$2M",
    trend: "up",
    change: "+3%",
    url: "https://www.pizzint.watch/",
    category: "OSINT",
    icon: "🍕"
  },
  {
    id: 8,
    question: "Iran attacks US base in Gulf?",
    probability: 45,
    volume: "$6M",
    trend: "up",
    change: "+7%",
    url: "https://polymarket.com/event/iran-retaliation",
    category: "RETALIATION",
    icon: "⚔️"
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
            Iran Conflict Markets • ${totalVolume.toFixed(0)}M+ Total Volume • Wisdom of the Crowd
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
              background: selectedCategory === cat ? "#2979ff" : "#161b22",
              color: selectedCategory === cat ? "#fff" : "#8b949e",
              border: `1px solid ${selectedCategory === cat ? "#2979ff" : "#1a2332"}`
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
                padding: 16, background: isHovered ? "#1c2128" : "#161b22", 
                borderRadius: 12,
                border: `2px solid ${isHovered ? color : "#1a2332"}`, 
                textDecoration: "none",
                display: "flex", gap: 14, alignItems: "center",
                transition: "all 0.2s", boxShadow: isHovered ? `0 4px 24px ${color}15` : "none"
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
                    background: `${color}20`, color, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: 0.5
                  }}>
                    {bet.category}
                  </span>
                </div>
                
                <div style={{ fontSize: 12, color: "#e6edf3", fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>
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
                  <span style={{ fontSize: 10, color }}>{getRiskLevel(bet.probability)}</span>
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
            </a>
          );
        })}
      </div>

      {/* Nothing Ever Happens Index */}
      <div style={{
        marginTop: 20, padding: 20, background: "linear-gradient(135deg, #161b22 0%, #1a2332 100%)",
        borderRadius: 12, border: "2px solid #30363d",
        display: "flex", alignItems: "center", gap: 20
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: "50%",
          background: "#00e67620", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, border: "3px solid #00e67640"
        }}>
          😴
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: "#e6edf3", fontWeight: 600, marginBottom: 4 }}>
            Nothing Ever Happens Index
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", lineHeight: 1.5 }}>
            A satirical counter-indicator to balance prediction market anxiety. 
            Historically, most geopolitical crises resolve without WWIII. 
            Stay informed, not panicked.
          </div>
        </div>
        <div style={{
          padding: "10px 20px", background: "#00e67620", borderRadius: 8,
          border: "1px solid #00e67640", textAlign: "center"
        }}>
          <div style={{ fontSize: 10, color: "#8b949e" }}>STATUS</div>
          <div style={{ fontSize: 14, color: "#00e676", fontWeight: 600 }}>Nothing Ever Happens</div>
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

import { useState } from 'react';

// Polymarket Iran Predictions
const POLYMARKET_BETS = [
  {
    id: 1,
    question: "US strikes Iran by March 7?",
    probability: 33,
    outcome: "No",
    confidence: 67,
    volume: "$355M",
    trend: "up",
    change: "+5%",
    url: "https://polymarket.com/event/us-strikes-iran-by"
  },
  {
    id: 2,
    question: "US strikes Iran by March 15?",
    probability: 42,
    outcome: "Yes",
    confidence: 58,
    volume: "$355M",
    trend: "up",
    change: "+8%",
    url: "https://polymarket.com/event/us-strikes-iran-by"
  },
  {
    id: 3,
    question: "Khamenei out by March 31?",
    probability: 21,
    outcome: "No",
    confidence: 79,
    volume: "$15M",
    trend: "stable",
    change: "0%",
    url: "https://polymarket.com/event/khamenei-out-as-supreme-leader-of-iran-by-march-31"
  },
  {
    id: 4,
    question: "Pentagon Pizza Index spike tonight?",
    probability: 28,
    outcome: "No",
    confidence: 72,
    volume: "$2M",
    trend: "up",
    change: "+3%",
    url: "https://www.pizzint.watch/"
  },
];

// Circular progress component
function CircularProgress({ percentage, size = 80, strokeWidth = 8, color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
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
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 16, fontWeight: 'bold', color }}>{percentage}%</div>
        <div style={{ fontSize: 8, color: '#6e7681' }}>YES</div>
      </div>
    </div>
  );
}

export default function PredictionMarkets() {
  const [bets] = useState(POLYMARKET_BETS);
  const [hoveredBet, setHoveredBet] = useState(null);

  const getColor = (prob) => {
    if (prob >= 70) return "#ff1744";
    if (prob >= 40) return "#ffd600";
    return "#00e676";
  };

  const getRiskLevel = (prob) => {
    if (prob >= 70) return "🔴 CRITICAL";
    if (prob >= 40) return "🟡 ELEVATED";
    return "🟢 LOW";
  };

  return (
    <div style={{ background: "#0d1117", padding: 24, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center", 
        marginBottom: 20, flexWrap: "wrap", gap: 12 
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            📊 POLYMARKET PREDICTIONS
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>
            Real-time betting odds • Wisdom of the crowd • $350M+ Volume
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a 
            href="https://polymarket.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              fontSize: 11, color: "#00e676", textDecoration: "none",
              padding: "8px 16px", background: "#00e67620", borderRadius: 6,
              border: "1px solid #00e67640", fontWeight: 500
            }}
          >
            polymarket.com →
          </a>
        </div>
      </div>

      {/* Main Predictions Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {bets.map((bet) => {
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
                padding: 20, background: isHovered ? "#1c2128" : "#161b22", 
                borderRadius: 12,
                border: `2px solid ${isHovered ? color : "#1a2332"}`, 
                textDecoration: "none",
                display: "flex", gap: 16, alignItems: "center",
                transition: "all 0.2s", boxShadow: isHovered ? `0 4px 20px ${color}20` : "none"
              }}
            >
              {/* Circular Chart */}
              <CircularProgress percentage={bet.probability} color={color} size={90} strokeWidth={10} />
              
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#e6edf3", fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>
                  {bet.question}
                </div>
                
                {/* Progress bar */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#6e7681", marginBottom: 4 }}>
                    <span>YES</span>
                    <span>NO</span>
                  </div>
                  <div style={{ height: 8, background: "#21262d", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${bet.probability}%`,
                      background: `linear-gradient(90deg, ${color}80, ${color})`,
                      borderRadius: 4, transition: "width 0.5s ease"
                    }} />
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ 
                    padding: "4px 10px", background: "#0d1117", borderRadius: 4,
                    fontSize: 10, color
                  }}>
                    {getRiskLevel(bet.probability)}
                  </div>
                  <div style={{ 
                    padding: "4px 10px", background: "#0d1117", borderRadius: 4,
                    fontSize: 10, color: "#8b949e"
                  }}>
                    Vol: {bet.volume}
                  </div>
                  <div style={{ 
                    padding: "4px 10px", background: bet.trend === "up" ? "#ff174420" : "#0d1117", 
                    borderRadius: 4, fontSize: 10,
                    color: bet.trend === "up" ? "#ff1744" : "#6e7681"
                  }}>
                    {bet.trend === "up" ? "📈" : "➡️"} {bet.change}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Pizza Index Card */}
      <div style={{
        marginTop: 20, padding: 20, background: "linear-gradient(135deg, #161b22 0%, #1a2332 100%)",
        borderRadius: 12, border: "2px solid #30363d",
        display: "flex", alignItems: "center", gap: 20
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: "50%",
          background: "#ffd60020", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, border: "3px solid #ffd60040"
        }}>
          🍕
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: "#e6edf3", fontWeight: 600, marginBottom: 4 }}>
            Pentagon Pizza Index
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", lineHeight: 1.5 }}>
            Late-night pizza delivery frequency at the Pentagon is a historically accurate predictor of 
            major military operations. Spike = imminent action. 
            <a href="https://www.pizzint.watch/" target="_blank" rel="noopener" style={{ color: "#ffd600", marginLeft: 4 }}>
              pizzint.watch →
            </a>
          </div>
        </div>
        <div style={{
          padding: "8px 16px", background: "#ffd60020", borderRadius: 6,
          border: "1px solid #ffd60040", textAlign: "center"
        }}>
          <div style={{ fontSize: 9, color: "#8b949e" }}>STATUS</div>
          <div style={{ fontSize: 12, color: "#ffd600", fontWeight: 600 }}>🟡 MONITORING</div>
        </div>
      </div>
    </div>
  );
}

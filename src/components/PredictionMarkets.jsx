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
    url: "https://www.pizzint.watch/"
  },
];

export default function PredictionMarkets() {
  const [bets] = useState(POLYMARKET_BETS);

  const getBarColor = (prob) => {
    if (prob >= 70) return "#ff1744"; // High probability = red (war)
    if (prob >= 40) return "#ffd600"; // Medium = yellow
    return "#00e676"; // Low = green
  };

  return (
    <div style={{ background: "#0d1117", padding: 16, borderBottom: "1px solid #1a2332" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
            📊 POLYMARKET PREDICTIONS
          </div>
          <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>
            Real-time betting odds • Wisdom of the crowd
          </div>
        </div>
        <a 
          href="https://polymarket.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontSize: 10, color: "#00e676", textDecoration: "none",
            padding: "4px 10px", background: "#00e67620", borderRadius: 4,
            border: "1px solid #00e67640"
          }}
        >
          polymarket.com →
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
        {bets.map((bet) => (
          <a
            key={bet.id}
            href={bet.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: 12, background: "#161b22", borderRadius: 8,
              border: "1px solid #1a2332", textDecoration: "none",
              display: "block", transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 500, lineHeight: 1.3, flex: 1 }}>
                {bet.question}
              </div>
              <div style={{ fontSize: 9, color: "#6e7681", marginLeft: 8 }}>
                {bet.volume}
              </div>
            </div>

            {/* Probability Bar */}
            <div style={{ marginBottom: 6 }}>
              <div style={{
                height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden"
              }}>
                <div style={{
                  height: "100%", width: `${bet.probability}%`,
                  background: getBarColor(bet.probability),
                  borderRadius: 3, transition: "width 0.5s ease"
                }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{
                  fontSize: 14, fontWeight: "bold", color: getBarColor(bet.probability)
                }}>
                  {bet.probability}%
                </span>
                <span style={{ fontSize: 9, color: "#6e7681", marginLeft: 4 }}>
                  {bet.outcome}
                </span>
              </div>
              <div style={{
                fontSize: 8, padding: "2px 6px", borderRadius: 3,
                background: bet.trend === "up" ? "#ff174420" : "#21262d",
                color: bet.trend === "up" ? "#ff1744" : "#6e7681"
              }}>
                {bet.trend === "up" ? "📈 Rising" : "➡️ Stable"}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pizza Index Reference */}
      <div style={{
        marginTop: 12, padding: "10px 12px", background: "#161b22", borderRadius: 6,
        border: "1px solid #1a2332", display: "flex", alignItems: "center", gap: 10
      }}>
        <span style={{ fontSize: 16 }}>🍕</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#e6edf3", fontWeight: 500 }}>
            Pentagon Pizza Index
          </div>
          <div style={{ fontSize: 8, color: "#8b949e" }}>
            Late-night pizza orders spike before major military operations • 
            <a href="https://www.pizzint.watch/" target="_blank" rel="noopener" style={{ color: "#00e676" }}>pizzint.watch</a>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#ffd600", fontWeight: 500 }}>
          MONITORING
        </div>
      </div>
    </div>
  );
}

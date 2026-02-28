import { useState, useEffect } from 'react';

// War Risk Calculator - WAR STARTED
const RISK_FACTORS = {
  warStarted: 100,        // WAR HAS BEGUN
  iranRetaliation: 95,    // Iran firing missiles
  hormuzClosed: 90,       // Strait closed
  oilSpike: 85,           // Oil at $180
  regionalEscalation: 80  // Israel under attack
};

export default function WarRiskGauge() {
  const [riskScore, setRiskScore] = useState(87);
  const [isHighAlert, setIsHighAlert] = useState(true);

  useEffect(() => {
    // Calculate risk based on active factors
    const totalRisk = Object.values(RISK_FACTORS).reduce((a, b) => a + b, 0);
    setRiskScore(Math.min(100, totalRisk));
    setIsHighAlert(totalRisk > 80);
  }, []);

  const getRiskColor = (score) => {
    if (score >= 90) return "#8b0000"; // Black-red
    if (score >= 80) return "#ff0000"; // Red
    if (score >= 60) return "#ff6d00"; // Orange
    if (score >= 40) return "#ffd600"; // Yellow
    return "#00e676"; // Green
  };

  const getRiskLabel = (score) => {
    if (score >= 90) return "EXTREME — IMMINENT";
    if (score >= 80) return "CRITICAL — LIKELY WITHIN DAYS";
    if (score >= 60) return "HIGH — ELEVATED PREPAREDNESS";
    if (score >= 40) return "MODERATE — MONITORING";
    return "LOW — NORMAL";
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: `3px solid ${getRiskColor(riskScore)}`,
      boxShadow: `0 0 30px ${getRiskColor(riskScore)}40`,
      animation: isHighAlert ? "pulse 2s infinite" : "none"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <div>
          <div style={{
            fontSize: 12,
            color: "#8b949e",
            letterSpacing: 2,
            marginBottom: 4
          }}>
            ⚠️ WAR RISK ASSESSMENT
          </div>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            color: getRiskColor(riskScore),
            textShadow: `0 0 20px ${getRiskColor(riskScore)}`
          }}>
            {riskScore}%
          </div>
        </div>
        
        <div style={{
          fontSize: 11,
          color: getRiskColor(riskScore),
          background: `${getRiskColor(riskScore)}20`,
          padding: "8px 16px",
          borderRadius: 8,
          border: `1px solid ${getRiskColor(riskScore)}40`,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 200
        }}>
          {getRiskLabel(riskScore)}
        </div>
      </div>

      {/* Risk Bar */}
      <div style={{
        height: 20,
        background: "#1a1a2e",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 16,
        border: "1px solid #2a2a2e"
      }}>
        <div style={{
          width: `${riskScore}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${getRiskColor(riskScore)} 0%, #ff0000 100%)`,
          borderRadius: 10,
          transition: "width 1s ease",
          boxShadow: `0 0 20px ${getRiskColor(riskScore)}`
        }} />
      </div>

      {/* Risk Factors */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        fontSize: 10
      }}>
        {Object.entries(RISK_FACTORS).map(([key, value]) => (
          <div key={key} style={{
            background: "#0d1117",
            padding: "8px 12px",
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #1a2332"
          }}>
            <span style={{ color: "#8b949e", textTransform: "capitalize" }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span style={{ 
              color: value > 15 ? "#ff1744" : "#ffd600",
              fontWeight: 700 
            }}>
              +{value}%
            </span>
          </div>
        ))}
      </div>

      {isHighAlert && (
        <div style={{
          marginTop: 16,
          padding: 12,
          background: "#ff000020",
          borderRadius: 8,
          border: "1px solid #ff000040",
          textAlign: "center",
          animation: "blink 1s infinite"
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#ff1744"
          }}>
            🚨 STRIKE WINDOW: 24-48 HOURS
          </span>
        </div>
      )}
    </div>
  );
}

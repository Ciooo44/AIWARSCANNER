import { useState, useEffect } from 'react';

// Breaking news ticker component - WAR STARTED
const BREAKING_ALERTS = [
  { id: 1, text: "🔴🔴🔴 WAR STARTED: US & ISRAEL strike Iran - explosions in Tehran, Natanz, Fordow", time: "LIVE", priority: "war" },
  { id: 2, text: "✈️ AIRSPACE CLEARING: Middle East airspace being evacuated after strikes", time: "LIVE", priority: "war" },
  { id: 3, text: "💥 Iran retaliating with ballistic missiles at US bases in region", time: "LIVE", priority: "war" },
  { id: 4, text: "🚨 Israel under missile attack from Iran and Hezbollah", time: "LIVE", priority: "war" },
  { id: 5, text: "🛢️ Strait of Hormuz CLOSED - oil tankers halted", time: "LIVE", priority: "critical" },
  { id: 6, text: "📈 Oil jumps to $180/barrel - global markets crashing", time: "LIVE", priority: "critical" },
];

export default function LiveAlertTicker() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % BREAKING_ALERTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const alert = BREAKING_ALERTS[currentAlert];

  if (!isVisible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: alert.priority === "critical" 
        ? "linear-gradient(90deg, #ff0000 0%, #8b0000 100%)" 
        : "linear-gradient(90deg, #ff6d00 0%, #ff1744 100%)",
      padding: "12px 24px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      boxShadow: "0 4px 20px rgba(255,0,0,0.5)",
      animation: "slideDown 0.5s ease"
    }}>
      <span style={{
        fontSize: 12,
        fontWeight: 800,
        color: "#fff",
        background: "rgba(0,0,0,0.3)",
        padding: "4px 12px",
        borderRadius: 4,
        letterSpacing: 1,
        animation: "pulse 1s infinite"
      }}>
        🔴 BREAKING
      </span>
      
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        flex: 1,
        textAlign: "center"
      }}>
        {alert.text}
      </span>
      
      <span style={{
        fontSize: 11,
        color: "rgba(255,255,255,0.7)"
      }}>
        {alert.time}
      </span>
      
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer",
          opacity: 0.7
        }}
      >
        ✕
      </button>
      
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

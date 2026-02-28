import { useState, useEffect } from 'react';

export default function WarStartedBanner() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "linear-gradient(180deg, #8b0000 0%, #ff0000 50%, #8b0000 100%)",
      borderRadius: 0,
      padding: "40px 24px",
      margin: 0,
      border: "4px solid #ffeb3b",
      boxShadow: pulse ? "0 0 60px rgba(255,0,0,0.8)" : "0 0 30px rgba(255,0,0,0.5)",
      textAlign: "center",
      animation: "pulse 0.5s infinite",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.1) 10px, rgba(255,0,0,0.1) 20px)",
        animation: "slide 2s linear infinite"
      }} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontSize: 120,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: 12,
          textShadow: "0 0 60px rgba(0,0,0,0.9), 0 0 120px rgba(255,0,0,0.8), 0 0 200px rgba(255,0,0,0.5)",
          marginBottom: 24,
          animation: "shake 0.3s infinite",
          lineHeight: 1.1
        }}>
          🔴🔴🔴<br/>
          WAR STARTED
          <br/>🔴🔴🔴
        </div>

        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: "#ffeb3b",
          marginBottom: 32,
          textShadow: "0 0 40px rgba(255,235,59,0.8), 0 0 80px rgba(255,235,59,0.5)",
          letterSpacing: 4
        }}>
          🇺🇸 U.S. STRIKES IRAN 🇮🇷
        </div>

        <div style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 40,
          maxWidth: 1000,
          margin: "0 auto 40px",
          lineHeight: 1.8,
          textShadow: "0 2px 10px rgba(0,0,0,0.8)"
        }}>
          <div style={{ marginBottom: 12, color: "#ffeb3b" }}>⚡ EXPLOSIONS: Tehran • Natanz • Fordow • Isfahan</div>
          <div style={{ marginBottom: 12, color: "#ff6d00" }}>🚀 IRAN RETALIATING: Ballistic missiles launched</div>
          <div style={{ marginBottom: 12, color: "#ff1744" }}>🚨 ISRAEL UNDER ATTACK: Massive missile barrage</div>
          <div style={{ color: "#ffd600" }}>🛢️ STRAIT OF HORMUZ CLOSED • OIL $180/BARREL</div>
        </div>

        <div style={{
          display: "inline-block",
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: "16px 32px",
          border: "2px solid #ffeb3b"
        }}>
          <div style={{
            fontSize: 12,
            color: "#ffeb3b",
            marginBottom: 4
          }}>
            OPERATION STATUS
          </div>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#fff"
          }}>
            HOUR 1 OF WAR
          </div>
        </div>

        <div style={{
          marginTop: 24,
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          fontStyle: "italic"
        }}>
          This dashboard is now tracking live combat operations
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function WarProgressTimer() {
  const [warTime, setWarTime] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0
  });

  // War started Feb 28, 2026, 08:00 UTC
  const warStartDate = new Date("2026-02-28T08:00:00Z");

  useEffect(() => {
    const calculateWarTime = () => {
      const now = new Date();
      const difference = now - warStartDate;

      if (difference > 0) {
        setWarTime({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateWarTime();
    const timer = setInterval(calculateWarTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: warTime.hours, label: "HOURS" },
    { value: warTime.minutes, label: "MINUTES" },
    { value: warTime.seconds, label: "SECONDS" }
  ];

  return (
    <div style={{
      background: "linear-gradient(135deg, #8b0000 0%, #ff0000 50%, #8b0000 100%)",
      borderRadius: 24,
      padding: 32,
      margin: "16px 0",
      border: "4px solid #ffeb3b",
      boxShadow: "0 0 60px rgba(255,0,0,0.6)",
      textAlign: "center",
      animation: "pulse 1s infinite"
    }}>
      <div style={{
        fontSize: 16,
        color: "#ffeb3b",
        letterSpacing: 4,
        marginBottom: 16,
        fontWeight: 800,
        textShadow: "0 0 20px rgba(255,235,59,0.5)"
      }}>
        ⚔️ WAR IN PROGRESS ⚔️
      </div>

      <div style={{
        fontSize: 14,
        color: "#fff",
        marginBottom: 24,
        fontWeight: 700
      }}>
        🇺🇸🇮🇱 US & ISRAEL vs 🇮🇷 IRAN
      </div>

      <div style={{
        fontSize: 20,
        color: "#ffeb3b",
        marginBottom: 24,
        fontWeight: 900,
        textShadow: "0 0 30px rgba(255,235,59,0.8)"
      }}>
        HOUR {Math.floor(warTime.hours) + 1} OF WAR
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        marginBottom: 24
      }}>
        {timeUnits.map((unit, index) => (
          <div key={index} style={{
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            borderRadius: 12,
            padding: "16px 24px",
            minWidth: 80,
            border: "2px solid #ffeb3b",
            boxShadow: "0 0 20px rgba(255,235,59,0.4)"
          }}>
            <div style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#ffeb3b",
              lineHeight: 1,
              textShadow: "0 0 20px rgba(255,235,59,0.8)"
            }}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: 10,
              color: "#8b949e",
              letterSpacing: 2,
              marginTop: 8
            }}>
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 16
      }}>
        <div style={{
          background: "rgba(0,0,0,0.5)",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ff1744"
        }}>
          <div style={{ fontSize: 11, color: "#ff6d00" }}>WAR STARTED</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744" }}>Feb 28, 08:00 UTC</div>
        </div>
        <div style={{
          background: "rgba(0,0,0,0.5)",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ff1744"
        }}>
          <div style={{ fontSize: 11, color: "#ff6d00" }}>STATUS</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744" }}>ACTIVE COMBAT</div>
        </div>
      </div>

      <div style={{
        marginTop: 16,
        padding: 12,
        background: "rgba(0,0,0,0.5)",
        borderRadius: 8,
        fontSize: 12,
        color: "#fff",
        fontStyle: "italic"
      }}>
        "The United States is now at war with Iran. We will not stop until the threat is eliminated." — President Trump
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 60px rgba(255,0,0,0.6); }
          50% { box-shadow: 0 0 80px rgba(255,0,0,0.8); }
        }
      `}</style>
    </div>
  );
}

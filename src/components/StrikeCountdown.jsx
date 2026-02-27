import { useState, useEffect } from 'react';

export default function StrikeCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 9,
    minutes: 45,
    seconds: 30
  });

  // March 1, 2026 deadline
  const targetDate = new Date("2026-03-01T00:00:00Z");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDS" }
  ];

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a0000 0%, #0d1117 50%, #1a0000 100%)",
      borderRadius: 24,
      padding: 32,
      margin: "16px 0",
      border: "2px solid #ff0000",
      boxShadow: "0 0 40px rgba(255,0,0,0.3)",
      textAlign: "center"
    }}>
      <div style={{
        fontSize: 12,
        color: "#ff6d00",
        letterSpacing: 3,
        marginBottom: 16,
        fontWeight: 700
      }}>
        ⏰ STRIKE WINDOW OPENS
      </div>

      <div style={{
        fontSize: 14,
        color: "#8b949e",
        marginBottom: 24
      }}>
        Trump's 10-day deadline expires: March 1, 2026
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        marginBottom: 24
      }}>
        {timeUnits.map((unit, index) => (
          <div key={index} style={{
            background: "linear-gradient(135deg, #ff1744 0%, #8b0000 100%)",
            borderRadius: 12,
            padding: "16px 24px",
            minWidth: 80,
            boxShadow: "0 4px 20px rgba(255,23,68,0.4)"
          }}>
            <div style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              textShadow: "0 0 20px rgba(255,255,255,0.5)"
            }}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.7)",
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
          background: "#ff174420",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ff174440"
        }}>
          <div style={{ fontSize: 11, color: "#ff6d00" }}>EARLIEST STRIKE</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744" }}>Mar 1, 00:00 UTC</div>
        </div>
        <div style={{
          background: "#ff174420",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ff174440"
        }}>
          <div style={{ fontSize: 11, color: "#ff6d00" }}>PEAK RISK WINDOW</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff1744" }}>Mar 1-7</div>
        </div>
      </div>

      <div style={{
        marginTop: 16,
        padding: 12,
        background: "#00000050",
        borderRadius: 8,
        fontSize: 12,
        color: "#ffd600",
        fontStyle: "italic"
      }}>
        "After March 1, military action becomes the primary option" — US Official
      </div>
    </div>
  );
}

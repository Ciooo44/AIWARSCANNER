import { useState } from 'react';

const CRISIS_DATES = [
  {
    date: "2026-02-27",
    label: "TODAY",
    title: "🚨 MASSIVE US AIRLIFT — War imminent",
    details: "Dozens of C-17s and C-130s surging toward Middle East overnight. Largest logistical deployment since Iraq 2003. Equipment, troops, supplies flooding into region.",
    status: "active",
    color: "#ff1744",
    icon: "✈️",
  },
  {
    date: "2026-02-26",
    label: "YESTERDAY",
    title: "🚨 IRAN SAID NO — Nuclear talks collapsed",
    details: "Geneva talks ended. Iran REJECTED all demands: Fordow stays open, Natanz stays open, Isfahan stays open. Diplomatic path closed. Military option now primary.",
    status: "past",
    color: "#ff6d00",
    icon: "❌",
  },
  {
    date: "2026-03-01",
    label: "SAT MAR 1",
    title: "Trump's ~10-day deadline expires",
    details: "Trump said Feb 19: '10 to 15 days' for Iran to make a deal. 10 days = March 1. After this date, military action becomes increasingly likely.",
    status: "critical",
    color: "#ff1744",
    icon: "⏰",
  },
  {
    date: "2026-03-02",
    label: "MON MAR 2",
    title: "IAEA Board Meeting begins (Vienna)",
    details: "5-day session. Expected to weigh new resolution censuring Iran. Could refer Iran to UN Security Council. Trump's deadline aligns with this meeting.",
    status: "upcoming",
    color: "#ff6d00",
    icon: "☢️",
  },
  {
    date: "2026-03-05",
    label: "WED MAR 5",
    title: "Trump's ~15-day deadline expires",
    details: "Trump's maximum deadline. 'Pretty much maximum 15 days.' After this, military option becomes primary. All forces expected in place by mid-March.",
    status: "critical",
    color: "#ff1744",
    icon: "💣",
  },
  {
    date: "2026-03-06",
    label: "THU MAR 6",
    title: "IAEA Board Meeting ends",
    details: "Final day of IAEA session. If resolution passes censuring Iran + Security Council referral, this provides diplomatic cover for military action.",
    status: "upcoming",
    color: "#ff6d00",
    icon: "🏛️",
  },
  {
    date: "2026-03-15",
    label: "~MID-MARCH",
    title: "Full US forces in position",
    details: "Senior US official told CBS: 'All military forces deployed to the region are expected to be in place by mid-March.' Both carrier groups + all air assets operational.",
    status: "upcoming",
    color: "#ff6d00",
    icon: "⚓",
  },
  {
    date: "2026-03-28",
    label: "FRI MAR 28",
    title: "Ramadan begins",
    details: "Some analysts suggest Trump may wait until after Ramadan. But crisis has dragged too long, costs are mounting billions per week.",
    status: "upcoming",
    color: "#ffd600",
    icon: "🌙",
  },
];

const STRIKE_WINDOWS = [
  { period: "This week (Feb 26-28)", probability: 35, bars: 6 },
  { period: "Next week (Mar 1-7)", probability: 55, bars: 9, peak: true },
  { period: "Mid-March (Mar 8-15)", probability: 15, bars: 3 },
  { period: "Post-Ramadan (Apr 27+)", probability: 5, bars: 1 },
];

export default function CrisisCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div style={{ background: "#0d1117", padding: 24, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: 2, marginBottom: 4 }}>
          ◆ CRISIS COUNTDOWN CALENDAR
        </div>
        <div style={{ fontSize: 11, color: "#8b949e" }}>
          Every date is a decision point.
        </div>
      </div>

      {/* Iran Said No Alert */}
      <div style={{
        background: "linear-gradient(135deg, #ff1744 0%, #8b0000 100%)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        border: "2px solid #ff6d00",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 14, color: "#fff", marginBottom: 8, fontWeight: 800, letterSpacing: 2 }}>
          🚨 GENEVA TALKS COLLAPSED
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#ffd600", marginBottom: 16 }}>
          IRAN SAID NO
        </div>
        <div style={{ fontSize: 16, color: "#fff", marginBottom: 12, fontWeight: 600 }}>
          ❌ NO to dismantling Fordow<br/>
          ❌ NO to shutting down Natanz<br/>
          ❌ NO to touching Isfahan
        </div>
        <div style={{ fontSize: 13, color: "#ffcccc", maxWidth: 600, margin: "0 auto", lineHeight: 1.5 }}>
          Diplomatic path CLOSED. All nuclear facilities remain operational. 
          Military option now primary. Strike window: March 1-7.
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 24, overflow: "auto" }}>
        <div style={{
          display: "flex",
          gap: 24,
          padding: "20px 0",
          minWidth: "max-content"
        }}>
          {CRISIS_DATES.map((event, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              minWidth: 80,
              opacity: event.status === 'active' ? 1 : 0.7
            }} onClick={() => setSelectedEvent(event)}>
              {/* Node */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: event.status === 'active' ? event.color : "#0d1117",
                border: `3px solid ${event.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                marginBottom: 8,
                boxShadow: event.status === 'active' ? `0 0 20px ${event.color}40` : 'none',
                animation: event.status === 'active' ? 'pulse 2s infinite' : 'none'
              }}>
                {event.icon}
              </div>
              
              {/* Label */}
              <div style={{
                fontSize: 9,
                color: event.color,
                fontWeight: 700,
                textAlign: "center",
                letterSpacing: 0.5,
                marginBottom: 4
              }}>
                {event.label}
              </div>
              
              {/* Short title */}
              <div style={{
                fontSize: 10,
                color: "#8b949e",
                textAlign: "center",
                maxWidth: 100
              }}>
                {event.title.split(" — ")[0].split(": ")[1] || event.title.split(" — ")[0]}
              </div>
              
              {/* Connector line (except last) */}
              {i < CRISIS_DATES.length - 1 && (
                <div style={{
                  position: "absolute",
                  width: 40,
                  height: 2,
                  background: "#1a2332",
                  marginLeft: 100
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Event Detail */}
      {selectedEvent && (
        <div style={{
          background: "#161b22",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: `1px solid ${selectedEvent.color}40`,
          borderLeft: `4px solid ${selectedEvent.color}`
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 20, marginRight: 8 }}>{selectedEvent.icon}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>
                {selectedEvent.title}
              </span>
            </div>
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{
                background: "none",
                border: "none",
                color: "#8b949e",
                fontSize: 16,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.6 }}>
            {selectedEvent.details}
          </p>
        </div>
      )}

      {/* Strike Window Probability */}
      <div style={{
        background: "#161b22",
        borderRadius: 12,
        padding: 20,
        border: "1px solid #1a2332"
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 16, letterSpacing: 1 }}>
          STRIKE WINDOW PROBABILITY
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {STRIKE_WINDOWS.map((window, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 180, fontSize: 11, color: "#8b949e" }}>
                {window.period}
              </div>
              <div style={{ flex: 1, display: "flex", gap: 4, alignItems: "center" }}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <div key={j} style={{
                    flex: 1,
                    height: 8,
                    background: j < window.bars 
                      ? window.peak ? "#ff1744" : "#ff6d00"
                      : "#1a2332",
                    borderRadius: 2
                  }} />
                ))}
              </div>
              <div style={{
                width: 50,
                fontSize: 12,
                fontWeight: 700,
                color: window.peak ? "#ff1744" : "#c9d1d9",
                textAlign: "right"
              }}>
                {window.probability}%
              </div>
              {window.peak && (
                <span style={{
                  fontSize: 8,
                  padding: "2px 6px",
                  background: "#ff174420",
                  color: "#ff1744",
                  borderRadius: 4,
                  fontWeight: 600
                }}>
                  PEAK
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

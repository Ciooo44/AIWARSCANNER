import { useState } from 'react';

// Game state machine
const SCREENS = {
  INTRO: 'intro',
  DECISION1: 'decision1',
  DECISION2: 'decision2',
  RESULT: 'result'
};

// All possible outcomes
const OUTCOMES = {
  'A-A1': {
    title: "THE ESCALATOR",
    description: "You struck, then doubled down.",
    nuclear: "Set back 7 years",
    casualties: "Moderate (200-500 US)",
    oil: "$140/bbl",
    approval: "-5%",
    verdict: "Couldn't stop once started"
  },
  'A-A2': {
    title: "THE STRATEGIST",
    description: "You struck first, then talked.",
    nuclear: "Set back 3 years",
    casualties: "3 wounded",
    oil: "$95/bbl (settled)",
    approval: "+4%",
    verdict: "Calculated and effective"
  },
  'A-A3': {
    title: "THE DEFENDER",
    description: "You held back when it counted.",
    nuclear: "Set back 2 years",
    casualties: "Minimal",
    oil: "$88/bbl",
    approval: "+2%",
    verdict: "Cautious but effective"
  },
  'B-B1': {
    title: "THE HAWK",
    description: "You went all the way.",
    nuclear: "Program destroyed",
    casualties: "High (2000+ US)",
    oil: "$250/bbl",
    approval: "+8% then -12%",
    verdict: "All or nothing"
  },
  'B-B2': {
    title: "THE SHOCK & AWE",
    description: "You hit hard, then walked away.",
    nuclear: "Set back 10 years",
    casualties: "Moderate (300-800 US)",
    oil: "$130/bbl",
    approval: "+12%",
    verdict: "Mission accomplished"
  },
  'B-B3': {
    title: "THE COALITION BUILDER",
    description: "You led the world.",
    nuclear: "Set back 8 years",
    casualties: "Shared burden",
    oil: "$120/bbl",
    approval: "+15%",
    verdict: "Built lasting alliances"
  },
  'C-C1': {
    title: "THE PROCRASTINATOR",
    description: "You waited too long.",
    nuclear: "Set back only 1 year",
    casualties: "Low",
    oil: "$100/bbl",
    approval: "-3%",
    verdict: "Too little, too late"
  },
  'C-C2': {
    title: "THE DEALMAKER",
    description: "You found another way.",
    nuclear: "Capped at current levels",
    casualties: "None",
    oil: "$72/bbl",
    approval: "+6%",
    verdict: "Pragmatic diplomat"
  },
  'C-C3': {
    title: "THE SANCTIONS KING",
    description: "You squeezed.",
    nuclear: "Ongoing enrichment",
    casualties: "None",
    oil: "$78/bbl",
    approval: "-8%",
    verdict: "Slow squeeze, slow results"
  }
};

export default function TrumpSimulator({ onClose }) {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [choices, setChoices] = useState({ d1: null, d2: null });
  
  const handleChoice1 = (choice) => {
    setChoices({ ...choices, d1: choice });
    setScreen(SCREENS.DECISION2);
  };
  
  const handleChoice2 = (choice) => {
    setChoices({ ...choices, d2: choice });
    setScreen(SCREENS.RESULT);
  };
  
  const getOutcome = () => {
    const key = `${choices.d1}-${choices.d2}`;
    return OUTCOMES[key] || OUTCOMES['A-A2'];
  };
  
  const shareOnTwitter = () => {
    const outcome = getOutcome();
    const text = `I played the $WSCN War Simulator.

${choices.d1 === 'A' ? '🎯' : choices.d1 === 'B' ? '💥' : '🕊️'} ${choices.d1 === 'A' ? 'Limited Strike' : choices.d1 === 'B' ? 'Full Assault' : 'Diplomacy'}
↓
${choices.d2 === 'A1' || choices.d2 === 'B1' || choices.d2 === 'C1' ? '👑' : choices.d2 === 'A2' || choices.d2 === 'B2' || choices.d2 === 'C2' ? '🤝' : '🛡️'} ${choices.d2 === 'A1' || choices.d2 === 'B1' || choices.d2 === 'C1' ? 'Escalate' : choices.d2 === 'A2' || choices.d2 === 'B2' || choices.d2 === 'C2' ? 'De-escalate' : 'Defend/Sanctions'}

Result: ${outcome.title}
Nuclear: ${outcome.nuclear}
Verdict: "${outcome.verdict}"

What would YOU do?
aiwarscanner.vercel.app

$WSCN 🔴`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  
  const reset = () => {
    setChoices({ d1: null, d2: null });
    setScreen(SCREENS.INTRO);
  };

  if (screen === SCREENS.INTRO) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(3, 8, 16, 0.98)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24
      }}>
        <div style={{
          maxWidth: 600,
          width: "100%",
          background: "#0d1117",
          borderRadius: 20,
          padding: 40,
          border: "1px solid #1a2332",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🇺🇸</div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#e6edf3",
            marginBottom: 16,
            letterSpacing: 2
          }}>
            YOU ARE THE PRESIDENT
          </h1>
          <p style={{
            fontSize: 16,
            color: "#8b949e",
            marginBottom: 32,
            lineHeight: 1.6
          }}>
            Iran has defied your ultimatum.<br />
            Your military is in position.<br />
            The world is watching.
          </p>
          <div style={{
            background: "#ff174410",
            border: "1px solid #ff174440",
            borderRadius: 12,
            padding: 20,
            marginBottom: 32,
            fontSize: 13,
            color: "#c9d1d9",
            fontStyle: "italic"
          }}>
            "What do you do?"
          </div>
          <button 
            onClick={() => setScreen(SCREENS.DECISION1)}
            style={{
              background: "linear-gradient(135deg, #ff1744 0%, #ff6d00 100%)",
              border: "none",
              borderRadius: 12,
              padding: "16px 48px",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1
            }}
          >
            START SIMULATION
          </button>
          <br />
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#484f58",
              fontSize: 12,
              marginTop: 16,
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  if (screen === SCREENS.DECISION1) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(3, 8, 16, 0.98)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24
      }}>
        <div style={{
          maxWidth: 700,
          width: "100%",
          background: "#0d1117",
          borderRadius: 20,
          padding: 40,
          border: "1px solid #1a2332"
        }}>
          <div style={{
            fontSize: 12,
            color: "#ff6d00",
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 8
          }}>
            DECISION 1 — THE STRIKE
          </div>
          <h2 style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#e6edf3",
            marginBottom: 16
          }}>
            Geneva talks have failed. Iran refuses to abandon enrichment.
          </h2>
          <p style={{
            fontSize: 14,
            color: "#8b949e",
            marginBottom: 32
          }}>
            Your generals are waiting for orders.
          </p>
          
          <div style={{ display: "grid", gap: 16 }}>
            <button 
              onClick={() => handleChoice1('A')}
              style={{
                background: "#161b22",
                border: "2px solid #ffd600",
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ffd600", marginBottom: 8 }}>
                LIMITED STRIKE
              </div>
              <div style={{ fontSize: 13, color: "#8b949e" }}>
                Hit nuclear sites + air defenses.<br />
                Send a message. Keep the door open.
              </div>
            </button>
            
            <button 
              onClick={() => handleChoice1('B')}
              style={{
                background: "#161b22",
                border: "2px solid #ff6d00",
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>💥</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ff6d00", marginBottom: 8 }}>
                FULL ASSAULT
              </div>
              <div style={{ fontSize: 13, color: "#8b949e" }}>
                Destroy military infrastructure.<br />
                Eliminate Iran's ability to fight back.
              </div>
            </button>
            
            <button 
              onClick={() => handleChoice1('C')}
              style={{
                background: "#161b22",
                border: "2px solid #00e676",
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>🕊️</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#00e676", marginBottom: 8 }}>
                EXTEND DIPLOMACY
              </div>
              <div style={{ fontSize: 13, color: "#8b949e" }}>
                Give Iran 30 more days.<br />
                Keep forces in position as leverage.
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screen === SCREENS.DECISION2) {
    const isA = choices.d1 === 'A';
    const isB = choices.d1 === 'B';
    const isC = choices.d1 === 'C';
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(3, 8, 16, 0.98)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24
      }}>
        <div style={{
          maxWidth: 700,
          width: "100%",
          background: "#0d1117",
          borderRadius: 20,
          padding: 40,
          border: "1px solid #1a2332"
        }}>
          <div style={{
            fontSize: 12,
            color: "#ff6d00",
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 8
          }}>
            DECISION 2 — THE RESPONSE
          </div>
          
          {isA && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", marginBottom: 16 }}>
                Iran retaliates with missiles on Al Udeid Air Base.
              </h2>
              <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 32 }}>
                3 US soldiers wounded. Houthis resume Red Sea attacks. Oil jumps to $110.
              </p>
            </>
          )}
          
          {isB && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", marginBottom: 16 }}>
                Iran launches all 1,200 remaining missiles at US bases + Israel.
              </h2>
              <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 32 }}>
                Hormuz mined. Oil at $175. Iran MP threatens "even Trump's palace."
              </p>
            </>
          )}
          
          {isC && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", marginBottom: 16 }}>
                Iran uses the 30 days to fortify sites further.
              </h2>
              <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 32 }}>
                Satellite shows new concrete at Fordow. Hardliners gain power in Tehran. Your approval rating drops 8 points.
              </p>
            </>
          )}
          
          <div style={{ display: "grid", gap: 16 }}>
            <button 
              onClick={() => handleChoice2(`${choices.d1}1`)}
              style={{
                background: "#161b22",
                border: `2px solid ${isC ? '#ff1744' : '#ffd600'}`,
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: isC ? '#ff1744' : '#ffd600', marginBottom: 8 }}>
                {isA ? '🔄 ESCALATE — launch full assault' : isB ? '👑 Go for regime change — target Khamenei' : '🎯 Strike now — you waited too long'}
              </div>
            </button>
            
            <button 
              onClick={() => handleChoice2(`${choices.d1}2`)}
              style={{
                background: "#161b22",
                border: "2px solid #00e676",
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: "#00e676", marginBottom: 8 }}>
                {isA ? '🤝 De-escalate — offer talks from strength' : isB ? '🛑 Cease fire — declare mission accomplished' : '📜 Accept partial deal — Iran keeps some enrichment'}
              </div>
            </button>
            
            <button 
              onClick={() => handleChoice2(`${choices.d1}3`)}
              style={{
                background: "#161b22",
                border: "2px solid #2979ff",
                borderRadius: 12,
                padding: 24,
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: "#2979ff", marginBottom: 8 }}>
                {isA ? '🛡️ Defend only — shoot down incoming, don\'t expand' : isB ? '🌍 Coalition — bring in NATO + Arab allies' : '💰 Maximum sanctions — economic pressure only'}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screen === SCREENS.RESULT) {
    const outcome = getOutcome();
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(3, 8, 16, 0.98)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24
      }}>
        <div style={{
          maxWidth: 500,
          width: "100%",
          background: "#0d1117",
          borderRadius: 20,
          padding: 40,
          border: "1px solid #1a2332",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: 12,
            color: "#8b949e",
            letterSpacing: 1,
            marginBottom: 8
          }}>
            YOUR PRESIDENCY
          </div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#e6edf3",
            marginBottom: 8
          }}>
            {outcome.title}
          </h1>
          <p style={{
            fontSize: 16,
            color: "#8b949e",
            marginBottom: 32
          }}>
            {outcome.description}
          </p>
          
          <div style={{
            background: "#161b22",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
            textAlign: "left",
            border: "1px solid #1a2332"
          }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6e7681", fontSize: 13 }}>Nuclear Program</span>
                <span style={{ color: "#e6edf3", fontWeight: 600, fontSize: 13 }}>{outcome.nuclear}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6e7681", fontSize: 13 }}>US Casualties</span>
                <span style={{ color: "#e6edf3", fontWeight: 600, fontSize: 13 }}>{outcome.casualties}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6e7681", fontSize: 13 }}>Oil Price</span>
                <span style={{ color: "#ffd600", fontWeight: 600, fontSize: 13 }}>{outcome.oil}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6e7681", fontSize: 13 }}>Approval Rating</span>
                <span style={{ color: outcome.approval.startsWith('+') ? '#00e676' : '#ff1744', fontWeight: 600, fontSize: 13 }}>{outcome.approval}</span>
              </div>
            </div>
            <div style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #1a2332",
              fontSize: 14,
              color: "#c9d1d9",
              fontStyle: "italic"
            }}>
              "{outcome.verdict}"
            </div>
          </div>
          
          <div style={{ display: "grid", gap: 12 }}>
            <button 
              onClick={shareOnTwitter}
              style={{
                background: "#1DA1F2",
                border: "none",
                borderRadius: 12,
                padding: "16px 32px",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              🐦 SHARE ON TWITTER
            </button>
            
            <button 
              onClick={reset}
              style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 12,
                padding: "12px 32px",
                color: "#8b949e",
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              PLAY AGAIN
            </button>
            
            <button 
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#484f58",
                fontSize: 12,
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
          
          <div style={{
            marginTop: 24,
            fontSize: 11,
            color: "#484f58"
          }}>
            $WSCN — aiwarscanner.vercel.app
          </div>
        </div>
      </div>
    );
  }
}

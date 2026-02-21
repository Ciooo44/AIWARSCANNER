import { useState, useEffect } from 'react';
import { WarPredictor } from '../analysis/predictor.js';

export default function WarPredictionPanel() {
  const [prediction, setPrediction] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [economic, setEconomic] = useState({});
  const [indicators, setIndicators] = useState({});

  useEffect(() => {
    // Calculate predictions on mount
    const pred = WarPredictor.calculateWarProbability();
    const time = WarPredictor.generateTimelinePredictions();
    const econ = WarPredictor.generateEconomicForecast();
    const ind = WarPredictor.getKeyIndicators();
    
    setPrediction(pred);
    setTimeline(time);
    setEconomic(econ);
    setIndicators(ind);
  }, []);

  if (!prediction) return <div style={{ padding: 20, color: '#8b949e' }}>Loading predictions...</div>;

  const getTrendIcon = (trend) => {
    if (trend === 'RISING') return '📈';
    if (trend === 'FALLING') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend) => {
    if (trend === 'RISING') return '#ff1744';
    if (trend === 'FALLING') return '#00e676';
    return '#ffd600';
  };

  return (
    <div style={{ background: '#0d1117', padding: 16, borderBottom: '1px solid #1a2332' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', letterSpacing: 1, marginBottom: 12 }}>
        ◆ AI WAR PREDICTION MODEL
      </div>

      {/* Main Probability Gauge */}
      <div style={{ 
        background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)', 
        borderRadius: 8, 
        padding: 16,
        border: '1px solid #1a2332',
        marginBottom: 12
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#8b949e' }}>CONFLICT PROBABILITY (30 DAYS)</span>
          <span style={{ 
            fontSize: 11, 
            color: getTrendColor(prediction.trend),
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            {getTrendIcon(prediction.trend)} {prediction.trend}
          </span>
        </div>

        {/* Probability Bar */}
        <div style={{ 
          height: 32, 
          background: '#1a2332', 
          borderRadius: 4, 
          overflow: 'hidden',
          position: 'relative',
          marginBottom: 8
        }}>
          <div style={{
            height: '100%',
            width: `${prediction.overall}%`,
            background: prediction.overall > 70 
              ? 'linear-gradient(90deg, #ff1744 0%, #ff6d00 100%)' 
              : prediction.overall > 40 
                ? 'linear-gradient(90deg, #ff6d00 0%, #ffd600 100%)' 
                : 'linear-gradient(90deg, #00e676 0%, #2979ff 100%)',
            transition: 'width 1s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8
          }}>
            <span style={{ 
              fontSize: 14, 
              fontWeight: 700, 
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
              {prediction.overall}%
            </span>
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 9 }}>
          <div style={{ textAlign: 'center', padding: '8px 4px', background: '#0d1117', borderRadius: 4 }}>
            <div style={{ color: '#8b949e', marginBottom: 2 }}>Market Consensus</div>
            <div style={{ color: '#2979ff', fontWeight: 600, fontSize: 11 }}>{prediction.breakdown.marketConsensus}%</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 4px', background: '#0d1117', borderRadius: 4 }}>
            <div style={{ color: '#8b949e', marginBottom: 2 }}>News Sentiment</div>
            <div style={{ color: prediction.breakdown.newsSentiment.startsWith('+') ? '#ff1744' : '#00e676', fontWeight: 600, fontSize: 11 }}>
              {prediction.breakdown.newsSentiment}%
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 4px', background: '#0d1117', borderRadius: 4 }}>
            <div style={{ color: '#8b949e', marginBottom: 2 }}>Military Posture</div>
            <div style={{ color: prediction.breakdown.militaryPosture.startsWith('+') ? '#ff1744' : '#ffd600', fontWeight: 600, fontSize: 11 }}>
              {prediction.breakdown.militaryPosture}%
            </div>
          </div>
        </div>
      </div>

      {/* Key Indicators */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: 8,
        marginBottom: 12
      }}>
        {Object.entries(indicators).map(([key, data]) => (
          <div key={key} style={{ 
            background: '#161b22', 
            padding: '10px 12px', 
            borderRadius: 6,
            border: '1px solid #1a2332',
            borderLeft: `3px solid ${data.color}`
          }}>
            <div style={{ fontSize: 8, color: '#6e7681', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              {data.label}
            </div>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: data.color,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              {data.value}
              {data.change && (
                <span style={{ fontSize: 9, color: '#8b949e' }}>{data.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Predictions */}
      <div style={{ 
        background: '#161b22', 
        borderRadius: 8, 
        padding: 12,
        border: '1px solid #1a2332',
        marginBottom: 12
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#e6edf3', marginBottom: 8 }}>
          📅 TIMELINE PREDICTIONS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {timeline.map((item, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              padding: '6px 8px',
              background: idx === 0 ? '#ff174410' : 'transparent',
              borderRadius: 4,
              borderLeft: `2px solid ${item.probability > 50 ? '#ff1744' : item.probability > 25 ? '#ff6d00' : '#ffd600'}`
            }}>
              <div style={{ 
                minWidth: 50, 
                fontSize: 9, 
                color: '#8b949e',
                fontWeight: 500
              }}>
                {item.timeframe}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#e6edf3', fontWeight: 500 }}>{item.event}</div>
                <div style={{ fontSize: 8, color: '#6e7681', marginTop: 1 }}>{item.description}</div>
              </div>
              <div style={{ 
                fontSize: 11, 
                fontWeight: 600,
                color: item.probability > 50 ? '#ff1744' : item.probability > 25 ? '#ff6d00' : '#ffd600'
              }}>
                {item.probability}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Scenarios */}
      <div style={{ 
        background: '#161b22', 
        borderRadius: 8, 
        padding: 12,
        border: '1px solid #1a2332'
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#e6edf3', marginBottom: 8 }}>
          💰 ECONOMIC IMPACT SCENARIOS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Object.entries(economic).map(([scenario, data]) => (
            <div key={scenario} style={{ 
              padding: '8px 10px',
              background: '#0d1117',
              borderRadius: 4,
              borderLeft: `3px solid ${scenario === 'full_war' ? '#ff1744' : scenario === 'limited_conflict' ? '#ff6d00' : '#00e676'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: '#e6edf3', fontWeight: 500, textTransform: 'uppercase' }}>
                  {scenario === 'diplomatic' ? '🕊️ Diplomatic' : scenario === 'limited_conflict' ? '⚔️ Limited Conflict' : '💥 Full War'}
                </span>
                <span style={{ 
                  fontSize: 10, 
                  fontWeight: 600,
                  color: scenario === 'full_war' ? '#ff1744' : scenario === 'limited_conflict' ? '#ff6d00' : '#00e676'
                }}>
                  {data.probability}%
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 9 }}>
                <div>
                  <span style={{ color: '#6e7681' }}>Oil: </span>
                  <span style={{ color: '#ffd600', fontWeight: 500 }}>{data.oilPrice}</span>
                </div>
                <div>
                  <span style={{ color: '#6e7681' }}>Market: </span>
                  <span style={{ color: data.marketImpact.includes('+') ? '#00e676' : '#ff1744', fontWeight: 500 }}>{data.marketImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        fontSize: 8, 
        color: '#484f58', 
        textAlign: 'center',
        marginTop: 12,
        fontStyle: 'italic'
      }}>
        Prediction model aggregates Polymarket, Kalshi, news sentiment, and military posture data • Last updated: {new Date(prediction.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );
}

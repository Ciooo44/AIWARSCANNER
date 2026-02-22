// Prediction Markets & War Probability Analysis
// Aggregates data from prediction markets and generates probability scores

// Live Polymarket data as of Feb 22, 2026
const PREDICTION_MARKETS = {
  polymarket: {
    name: 'Polymarket',
    markets: [
      { question: 'US strikes Iran by March 7?', probability: 0.33, volume: '$355M', url: 'https://polymarket.com/event/us-strikes-iran-by' },
      { question: 'US strikes Iran by March 15?', probability: 0.42, volume: '$355M', url: 'https://polymarket.com/event/us-strikes-iran-by' },
      { question: 'Khamenei out by March 31?', probability: 0.21, volume: '$15M', url: 'https://polymarket.com/event/khamenei-out-as-supreme-leader-of-iran-by-march-31' },
      { question: 'Hormuz closed >7 days in March?', probability: 0.28, volume: '$2M', url: 'https://polymarket.com/event/hormuz' },
      { question: 'Iran nuclear deal signed by June?', probability: 0.12, volume: '$1.1M', url: 'https://polymarket.com/event/iran-deal' }
    ]
  },
  kalshi: {
    name: 'Kalshi',
    markets: [
      { question: 'US-Iran armed conflict in 2026?', probability: 0.58, volume: '$1.8M', url: 'https://kalshi.com/markets/iran' }
    ]
  }
};

// Calculate aggregate war probability
export function calculateWarProbability() {
  const markets = [
    ...PREDICTION_MARKETS.polymarket.markets,
    ...PREDICTION_MARKETS.kalshi.markets
  ];
  
  const avgProbability = markets.reduce((sum, m) => sum + m.probability, 0) / markets.length;
  
  // Adjust based on recent news sentiment
  const newsAdjustment = calculateNewsSentimentAdjustment();
  
  // Adjust based on military asset movements
  const militaryAdjustment = calculateMilitaryAdjustment();
  
  const finalProbability = Math.min(0.95, Math.max(0.05, 
    avgProbability + newsAdjustment + militaryAdjustment
  ));
  
  return {
    overall: Math.round(finalProbability * 100),
    breakdown: {
      marketConsensus: Math.round(avgProbability * 100),
      newsSentiment: newsAdjustment > 0 ? '+' + Math.round(newsAdjustment * 100) : Math.round(newsAdjustment * 100),
      militaryPosture: militaryAdjustment > 0 ? '+' + Math.round(militaryAdjustment * 100) : Math.round(militaryAdjustment * 100)
    },
    markets: PREDICTION_MARKETS,
    lastUpdated: new Date().toISOString(),
    trend: finalProbability > 0.6 ? 'RISING' : finalProbability < 0.3 ? 'FALLING' : 'STABLE'
  };
}

// Simulated news sentiment analysis
function calculateNewsSentimentAdjustment() {
  // In real implementation, analyze recent headlines
  const recentEvents = [
    { type: 'escalation', impact: 0.05 },
    { type: 'escalation', impact: 0.03 },
    { type: 'diplomatic', impact: -0.02 }
  ];
  
  return recentEvents.reduce((sum, e) => sum + e.impact, 0);
}

// Simulated military posture adjustment
function calculateMilitaryAdjustment() {
  // Based on asset deployments
  const factors = {
    carrierGroups: 2,      // 2 carriers = high readiness
    destroyers: 8,         // 8 destroyers
    basesActivated: 11,    // 11 bases
    submarines: 1          // At least 1 SSGN
  };
  
  let adjustment = 0;
  if (factors.carrierGroups >= 2) adjustment += 0.08;
  if (factors.destroyers >= 6) adjustment += 0.03;
  if (factors.basesActivated >= 10) adjustment += 0.02;
  
  return adjustment;
}

// Timeline predictions based on Polymarket data
export function generateTimelinePredictions() {
  return [
    {
      timeframe: 'Mar 1',
      event: 'Trump Ultimatum Expires',
      probability: 85,
      description: '10-15 day deadline ends — action window opens'
    },
    {
      timeframe: 'Mar 7',
      event: 'Polymarket: US Strikes?',
      probability: 33,
      description: '$355M volume — 33% YES probability'
    },
    {
      timeframe: 'Mar 15',
      event: 'Polymarket: US Strikes?',
      probability: 42,
      description: '$355M volume — 42% YES probability (+9%)'
    },
    {
      timeframe: 'Mar 31',
      event: 'Khamenei Removal?',
      probability: 21,
      description: '$15M volume — Regime change probability'
    }
  ];
}

// Economic impact forecast
export function generateEconomicForecast() {
  const scenarios = {
    diplomatic: {
      probability: 33,
      oilPrice: '$75-80/barrel',
      marketImpact: 'S&P 500 +2%',
      description: 'Deal reached by March 15 — sanctions eased'
    },
    limited_conflict: {
      probability: 42,
      oilPrice: '$95-120/barrel',
      marketImpact: 'S&P 500 -5% to -8%',
      description: 'Surgical strikes Mar 7-15 — Hormuz partially closed'
    },
    full_war: {
      probability: 25,
      oilPrice: '$150-200/barrel',
      marketImpact: 'S&P 500 -15% to -25%',
      description: 'Regional war post-March 15 — Hormuz closed >30 days'
    }
  };
  
  return scenarios;
}

// Key indicators widget
export function getKeyIndicators() {
  return {
    threatLevel: {
      value: 'CRITICAL',
      color: '#ff1744',
      trend: 'up',
      change: '+1 level (48h)'
    },
    diplomaticProgress: {
      value: '15%',
      label: 'Deal Probability',
      color: '#ffd600'
    },
    militaryReadiness: {
      value: '92%',
      label: 'US Forces Ready',
      color: '#2979ff'
    },
    publicSentiment: {
      value: 'Negative',
      label: 'War Support',
      color: '#ff6d00'
    }
  };
}

// Export main predictor
export const WarPredictor = {
  calculateWarProbability,
  generateTimelinePredictions,
  generateEconomicForecast,
  getKeyIndicators
};

// Prediction Markets & War Probability Analysis
// Aggregates data from prediction markets and generates probability scores

// Simulated prediction market data (replace with real APIs)
const PREDICTION_MARKETS = {
  polymarket: {
    name: 'Polymarket',
    markets: [
      { question: 'US military strike on Iran by March 31?', probability: 0.67, volume: '$2.4M', url: 'https://polymarket.com/event/us-iran' },
      { question: 'Hormuz closed >7 days in March?', probability: 0.34, volume: '$890K', url: 'https://polymarket.com/event/hormuz' },
      { question: 'Iran nuclear deal signed by June?', probability: 0.12, volume: '$1.1M', url: 'https://polymarket.com/event/iran-deal' }
    ]
  },
  kalshi: {
    name: 'Kalshi',
    markets: [
      { question: 'US-Iran armed conflict in 2026?', probability: 0.71, volume: '$1.8M', url: 'https://kalshi.com/markets/iran' }
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

// Timeline predictions
export function generateTimelinePredictions() {
  const now = new Date();
  
  return [
    {
      timeframe: '7 days',
      event: 'Diplomatic deadline pressure',
      probability: 85,
      description: 'Trump ultimatum period expires'
    },
    {
      timeframe: '14 days',
      event: 'Potential limited strikes',
      probability: 45,
      description: 'If talks collapse completely'
    },
    {
      timeframe: '30 days',
      event: 'Full military engagement',
      probability: 25,
      description: 'Major escalation scenario'
    },
    {
      timeframe: '90 days',
      event: 'Nuclear deal signed',
      probability: 15,
      description: 'Diplomatic resolution'
    }
  ];
}

// Economic impact forecast
export function generateEconomicForecast() {
  const scenarios = {
    diplomatic: {
      probability: 30,
      oilPrice: '$75-80/barrel',
      marketImpact: 'S&P 500 +2%',
      description: 'Deal reached, sanctions eased'
    },
    limited_conflict: {
      probability: 45,
      oilPrice: '$95-120/barrel',
      marketImpact: 'S&P 500 -5% to -8%',
      description: 'Surgical strikes, Hormuz partially closed'
    },
    full_war: {
      probability: 25,
      oilPrice: '$150-200/barrel',
      marketImpact: 'S&P 500 -15% to -25%',
      description: 'Regional war, Hormuz closed >30 days'
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

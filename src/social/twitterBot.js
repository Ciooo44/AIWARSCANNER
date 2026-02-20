// Twitter/X Bot Integration for AIWARSCANNER
// Auto-posts critical updates to social media

const TWITTER_API = {
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
};

// Critical alert thresholds
const ALERT_THRESHOLDS = {
  CRITICAL: {
    keywords: ['war', 'attack', 'strike', 'invasion', 'casualties'],
    autoTweet: true,
    urgency: 'IMMEDIATE'
  },
  HIGH: {
    keywords: ['deployment', 'missile', 'drone', 'closure'],
    autoTweet: true,
    urgency: 'URGENT'
  }
};

// Auto-generate tweet content
export function generateAlertTweet(event) {
  const templates = {
    critical: [
      `🚨 CRITICAL: ${event.title}\n\n📍 ${event.location}\n⏰ ${event.time}\n\n#AIWARSCANNER #Iran #US #BreakingNews`,
      `⚡ FLASH ALERT: ${event.title}\n\n🔴 Threat Level: CRITICAL\n📡 Source: ${event.source}\n\nLive updates: https://aiwarscanner.com\n\n#IranCrisis #USIran`,
    ],
    high: [
      `📊 UPDATE: ${event.title}\n\n🟠 ${event.summary?.substring(0, 100)}...\n\n#OSINT #Military #Geopolitics`,
    ]
  };
  
  const category = event.severity === 'critical' ? 'critical' : 'high';
  const templateList = templates[category];
  return templateList[Math.floor(Math.random() * templateList.length)];
}

// Scheduled summary tweets
export function generateDailySummary(stats) {
  return `📅 24H Summary - US/Iran Crisis\n\n` +
    `🎯 Threat Level: ${stats.threatLevel}\n` +
    `📰 News Items: ${stats.newsCount}\n` +
    `🚢 US Naval Assets: ${stats.usAssets}\n` +
    `⚡ Key Events: ${stats.keyEvents}\n\n` +
    `Live Dashboard: https://aiwarscanner.com\n\n` +
    `#DailyBrief #Iran #US #AIWARSCANNER`;
}

// Trending hashtags generator
export function generateTrendingHashtags() {
  const baseTags = ['#AIWARSCANNER', '#USIran', '#IranCrisis'];
  const timeTags = new Date().getHours() < 12 ? ['#MorningBrief'] : ['#EveningUpdate'];
  return [...baseTags, ...timeTags].join(' ');
}

// Export for bot scheduling
export const BotConfig = {
  checkInterval: 5 * 60 * 1000, // 5 minutes
  dailySummaryTime: '08:00',
  maxTweetsPerHour: 4,
  threadThreshold: 150 // characters
};

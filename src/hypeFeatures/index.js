// Export all hype features
export { LiveTickerSocket, useLiveTicker, EnhancedTicker } from './components/EnhancedTicker.jsx';
export { generateAlertTweet, generateDailySummary, BotConfig } from './social/twitterBot.js';
export { formatTelegramMessage, formatDailyDigest } from './social/telegramBot.js';
export { SHARE_PLATFORMS, sharePanel, generateEmbedCode } from './social/shareModule.js';
export { WarPredictor } from './analysis/predictor.js';
export { generateAIAnalysis, chatWithAnalyst } from './analysis/aiAnalyst.js';
export { OSINTAggregator } from './data/osintAggregator.js';

// Feature configuration
export const HYPE_FEATURES = {
  // Social Media
  twitterBot: { enabled: true, autoPost: true },
  telegramBot: { enabled: true, channel: '@aiwarscanner' },
  socialShare: { enabled: true, platforms: ['twitter', 'telegram', 'reddit'] },
  
  // Real-time
  liveTicker: { enabled: true, websocket: true, polling: true },
  pushNotifications: { enabled: true, sound: true },
  
  // Intelligence
  osintAggregator: { enabled: true, sources: ['news', 'rss', 'social'] },
  warPredictor: { enabled: true, markets: ['polymarket', 'kalshi'] },
  aiAnalyst: { enabled: true, model: 'gpt-4' },
  
  // Engagement
  embedWidget: { enabled: true },
  qrSharing: { enabled: true },
  dailyBriefing: { enabled: true, time: '08:00' }
};

// Quick setup guide
export const SETUP_GUIDE = `
# AIWARSCANNER Hype Features Setup

## 1. Environment Variables

Create .env file:

# Social Media
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHANNEL_ID=@aiwarscanner

# APIs
OPENAI_API_KEY=your_key
GNEWS_API_KEY=your_key

# WebSocket (optional)
WS_URL=wss://your-server.com/ws

## 2. Telegram Bot Setup

1. Message @BotFather on Telegram
2. Create new bot: /newbot
3. Get token
4. Add bot to channel @aiwarscanner
5. Make bot admin

## 3. Twitter Setup

1. Go to developer.twitter.com
2. Create app
3. Get API keys
4. Enable Elevated access for posting

## 4. Deploy

Vercel:
- Connect GitHub repo
- Add environment variables
- Deploy

## 5. Features

- Auto-posts critical alerts
- Daily summary at 08:00 UTC
- Real-time ticker updates
- AI-powered analysis
- Social sharing widgets
`;

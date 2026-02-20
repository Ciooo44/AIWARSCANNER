# 🚀 AIWARSCANNER HYPE FEATURES

This document describes the viral/social features added to make AIWARSCANNER the go-to source for US-Iran crisis monitoring.

---

## ✨ New Features

### 1. 🤖 Social Media Bots

#### Twitter/X Bot (`src/social/twitterBot.js`)
- **Auto-posts** critical alerts with hashtags
- **Daily summaries** every morning
- **Smart templates** that rotate messages
- **Trending hashtags** generator

```javascript
import { generateAlertTweet } from './social/twitterBot.js';

// Auto-generates tweet from event
tweet = generateAlertTweet({
  title: "Trump issues 15-day ultimatum",
  severity: "critical"
});
// Output: "🚨 CRITICAL: Trump issues 15-day ultimatum... #AIWARSCANNER #Iran #US"
```

#### Telegram Bot (`src/social/telegramBot.js`)
- **Rich HTML messages** with emojis
- **Inline keyboards** for navigation
- **Auto-pin** critical alerts
- **Daily digest** at 08:00 UTC

### 2. 📡 Real-Time Updates

#### Enhanced Live Ticker (`src/components/EnhancedTicker.jsx`)
- **WebSocket support** for instant updates
- **Sound alerts** for critical events
- **Browser notifications**
- **Auto-reconnect** on disconnect

```javascript
import { useLiveTicker } from './components/EnhancedTicker.jsx';

function MyComponent() {
  const { alerts, isConnected } = useLiveTicker();
  // Auto-updates every 30 seconds
}
```

### 3. 🎯 War Prediction AI

#### Predictor Module (`src/analysis/predictor.js`)
- **Market aggregation** from Polymarket/Kalshi
- **Timeline predictions** (7d, 14d, 30d, 90d)
- **Economic scenarios** (oil prices, markets)
- **Key indicators** dashboard

```javascript
import { WarPredictor } from './analysis/predictor.js';

const probability = WarPredictor.calculateWarProbability();
// Returns: { overall: 67%, trend: 'RISING', markets: [...] }
```

### 4. 🤖 AI Analyst

#### GPT-Powered Analysis (`src/analysis/aiAnalyst.js`)
- **Auto-generated summaries** (3 paragraphs)
- **Chat interface** for questions
- **Daily briefings** at 08:00
- **Multiple analysis types** (military, diplomatic, escalation)

```javascript
import { generateAIAnalysis } from './analysis/aiAnalyst.js';

const analysis = await generateAIAnalysis('summary', crisisData);
// Returns: { title, paragraphs, keyTakeaways, confidence }
```

### 5. 📊 OSINT Aggregator

#### Multi-Source Intelligence (`src/data/osintAggregator.js`)
- **RSS feeds** from news sources
- **Social media** monitoring
- **Government sources** (CENTCOM, etc.)
- **Auto-filtering** by keywords
- **Deduplication** system

### 6. 🔗 Social Sharing

#### Share Module (`src/social/shareModule.js`)
- **6 platforms**: Twitter, Telegram, WhatsApp, Reddit, LinkedIn
- **Embeddable widgets** for other sites
- **QR code generation** for mobile
- **Open Graph** images

```javascript
import { sharePanel, generateEmbedCode } from './social/shareModule.js';

// Share specific panel
const shareData = sharePanel('map', { activeAssets: 25 });

// Generate embed code
const embed = generateEmbedCode('timeline', { width: 600, height: 400 });
```

---

## 🛠️ Setup Instructions

### Step 1: Environment Variables

Create `.env` file in project root:

```bash
# Twitter/X
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_BEARER_TOKEN=your_bearer_token

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@aiwarscanner

# OpenAI (for AI Analyst)
OPENAI_API_KEY=your_openai_key

# News APIs
GNEWS_API_KEY=your_gnews_key

# Optional: Custom WebSocket server
WS_URL=wss://your-domain.com/ws
```

### Step 2: Telegram Bot Setup

1. Message **@BotFather** on Telegram
2. Type `/newbot`
3. Follow instructions, get token
4. Create channel **@aiwarscanner**
5. Add bot to channel
6. Make bot **administrator**

### Step 3: Twitter API Setup

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Create new app
3. Get API Key & Secret
4. Apply for **Elevated** access (required for posting)

### Step 4: Deploy

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

#### Railway
Connect GitHub repo, set environment variables.

---

## 📈 Viral Growth Strategy

### Phase 1: Launch (Week 1)
- [ ] Deploy to Vercel
- [ ] Setup Twitter bot
- [ ] Create Telegram channel
- [ ] Post first "Daily Brief"

### Phase 2: Growth (Week 2-4)
- [ ] Share on Reddit (r/worldnews, r/geopolitics)
- [ ] Twitter threads explaining crisis
- [ ] Telegram channel promotion
- [ ] Embed widgets on partner sites

### Phase 3: Monetization (Month 2+)
- [ ] Premium API access
- [ ] Custom alerts ($9/month)
- [ ] Professional reports ($49/month)
- [ ] Consulting services

---

## 🎯 Key Metrics to Track

| Metric | Target |
|--------|--------|
| Twitter followers | 10K in 30 days |
| Telegram subscribers | 5K in 30 days |
| Daily active users | 1,000 |
| API requests/day | 10,000 |
| Embeds on other sites | 50 |

---

## 🔥 Content Calendar

### Daily
- 08:00 UTC: Daily Briefing (Telegram + Twitter)
- Every 4 hours: Ticker digest
- Breaking news: Immediate alert

### Weekly
- Monday: Week Ahead analysis
- Friday: Week Review
- Sunday: "What to Watch"

### Crisis Events
- Immediate: Flash alert
- +1 hour: Analysis thread
- +24 hours: Deep dive report

---

## 💡 Pro Tips

1. **Timing**: Post when US is awake (12:00-20:00 EST)
2. **Hashtags**: Mix popular (#Iran) + niche (#OSINT)
3. **Visuals**: Always include map screenshots
4. **Engagement**: Reply to comments quickly
5. **Sources**: Cite reputable sources (increases credibility)

---

## 🔐 Security Notes

- Never commit `.env` file
- Rotate API keys monthly
- Use IP whitelisting for production
- Monitor for abuse/bots

---

**Ready to make AIWARSCANNER viral! 🚀**

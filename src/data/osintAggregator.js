// OSINT Aggregator
// Collects data from multiple open sources

const OSINT_SOURCES = {
  // News APIs
  news: {
    gnews: { url: 'https://gnews.io/api/v4/search', enabled: true },
    newsapi: { url: 'https://newsapi.org/v2/everything', enabled: true },
    currents: { url: 'https://api.currentsapi.services/v1/search', enabled: false }
  },
  
  // Social Media
  social: {
    twitter: { type: 'api', enabled: false }, // Requires elevated access
    reddit: { type: 'rss', enabled: true, url: 'https://www.reddit.com/r/worldnews/.rss' }
  },
  
  // Satellite/Tracking
  tracking: {
    adsb: { type: 'api', url: 'https://api.adsbexchange.com', enabled: false },
    marinetraffic: { type: 'api', enabled: false }
  },
  
  // Government/Open Source
  government: {
    centcom: { type: 'rss', url: 'https://www.centcom.mil/rss', enabled: true },
    state: { type: 'rss', enabled: false }
  }
};

// Keywords for filtering
const MONITORING_KEYWORDS = [
  'iran', 'us', 'usa', 'america', 'pentagon', 'centcom',
  'military', 'nuclear', 'missile', 'strike', 'attack',
  'hormuz', 'gulf', 'persian', 'middle east', 'tehran',
  'trump', 'araghchi', 'ford', 'lincoln', 'carrier'
];

// Fetch RSS feed
export async function fetchRSSFeed(url) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('RSS fetch failed:', error);
    return [];
  }
}

// Fetch news API
export async function fetchNewsAPI(query, apiKey) {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('News API fetch failed:', error);
    return [];
  }
}

// Aggregate all sources
export async function aggregateOSINT(config = {}) {
  const results = {
    news: [],
    social: [],
    government: [],
    timestamp: new Date().toISOString()
  };
  
  // Parallel fetching
  const promises = [];
  
  // News sources
  if (config.gnewsApiKey) {
    promises.push(
      fetchNewsAPI('US Iran military crisis', config.gnewsApiKey)
        .then(items => results.news.push(...items))
    );
  }
  
  // Reddit
  if (OSINT_SOURCES.social.reddit.enabled) {
    promises.push(
      fetchRSSFeed(OSINT_SOURCES.social.reddit.url)
        .then(items => results.social.push(...items))
    );
  }
  
  await Promise.all(promises);
  
  // Filter by keywords
  const filtered = filterByKeywords(results);
  
  // Deduplicate
  const deduplicated = deduplicateItems(filtered);
  
  return deduplicated;
}

// Filter items by keywords
function filterByKeywords(data) {
  const allItems = [...data.news, ...data.social, ...data.government];
  
  return allItems.filter(item => {
    const text = `${item.title} ${item.description || ''}`.toLowerCase();
    return MONITORING_KEYWORDS.some(keyword => text.includes(keyword));
  });
}

// Deduplicate by title similarity
function deduplicateItems(items) {
  const seen = new Set();
  return items.filter(item => {
    const normalized = item.title.toLowerCase().replace(/[^\w]/g, '');
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

// Score item relevance
export function scoreRelevance(item) {
  let score = 0;
  const text = `${item.title} ${item.description || ''}`.toLowerCase();
  
  // Critical keywords
  if (text.includes('war') || text.includes('attack')) score += 10;
  if (text.includes('strike') || text.includes('missile')) score += 8;
  if (text.includes('hormuz') || text.includes('closure')) score += 7;
  
  // Time decay (newer = higher score)
  const age = Date.now() - new Date(item.publishedAt || item.pubDate).getTime();
  const hoursOld = age / (1000 * 60 * 60);
  score += Math.max(0, 24 - hoursOld);
  
  return score;
}

// Export for cron job
export const OSINTAggregator = {
  aggregateOSINT,
  fetchRSSFeed,
  scoreRelevance,
  MONITORING_KEYWORDS
};

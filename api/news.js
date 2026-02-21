// RSS News Aggregator for AIWARSCANNER
// Fetches real news from RSS feeds and filters by keywords

const RSS_FEEDS = [
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'general' },
  { name: 'Reuters', url: 'https://www.reutersagency.com/feed/?taxonomy=markets&post_type=reuters-best', category: 'general' },
  { name: 'BBC World', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', category: 'general' },
  { name: 'CNN', url: 'http://rss.cnn.com/rss/edition_world.rss', category: 'general' },
  { name: 'Critical Threats', url: 'https://www.criticalthreats.org/rss', category: 'analysis' },
];

// Keywords to filter relevant news
const RELEVANT_KEYWORDS = [
  'iran', 'iranian', 'tehran', 'persian gulf', 'strait of hormuz',
  'us', 'usa', 'united states', 'pentagon', 'centcom', 'white house',
  'military', 'strike', 'attack', 'war', 'conflict', 'nuclear',
  'missile', 'drone', 'carrier', 'navy', 'air force',
  'trump', 'biden', 'administration',
  'hormuz', 'baghdad', 'iraq', 'syria', 'israel', 'gaza',
  'sanctions', 'deal', 'negotiations', 'diplomatic'
];

// CORS headers for API
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// Parse RSS XML to JSON
function parseRSS(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');
  
  const articles = [];
  items.forEach(item => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    
    articles.push({
      title: title.replace(/<[^>]*>/g, ''), // Strip HTML
      description: description.replace(/<[^>]*>/g, '').substring(0, 200),
      url: link,
      publishedAt: new Date(pubDate).toISOString(),
      rawDate: pubDate
    });
  });
  
  return articles;
}

// Check if article is relevant
function isRelevant(article) {
  const text = (article.title + ' ' + article.description).toLowerCase();
  return RELEVANT_KEYWORDS.some(keyword => text.includes(keyword));
}

// Categorize article
function categorize(article) {
  const text = (article.title + ' ' + article.description).toLowerCase();
  
  if (text.includes('military') || text.includes('strike') || text.includes('attack') || 
      text.includes('missile') || text.includes('drone') || text.includes('carrier')) {
    return 'military';
  }
  if (text.includes('diplomatic') || text.includes('deal') || text.includes('negotiations') ||
      text.includes('talks') || text.includes('sanctions')) {
    return 'diplomacy';
  }
  if (text.includes('analysis') || text.includes('opinion') || text.includes('commentary')) {
    return 'analysis';
  }
  if (text.includes('intelligence') || text.includes('spy') || text.includes('cia') ||
      text.includes('mossad')) {
    return 'intelligence';
  }
  
  return 'general';
}

// Format time ago
function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Main API handler
export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const allNews = [];
    
    // Fetch from each RSS feed (with timeout)
    for (const feed of RSS_FEEDS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(feed.url, { 
          signal: controller.signal,
          headers: {
            'User-Agent': 'AIWARSCANNER News Bot 1.0'
          }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) continue;
        
        const xmlText = await response.text();
        const articles = parseRSS(xmlText);
        
        // Filter relevant articles
        const relevantArticles = articles
          .filter(isRelevant)
          .slice(0, 5) // Top 5 per source
          .map(article => ({
            title: article.title,
            url: article.url,
            source: feed.name,
            time: timeAgo(article.publishedAt),
            category: categorize(article),
            publishedAt: article.publishedAt
          }));
        
        allNews.push(...relevantArticles);
      } catch (error) {
        console.log(`Failed to fetch ${feed.name}:`, error.message);
      }
    }
    
    // Sort by date (newest first)
    allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Take top 20
    const topNews = allNews.slice(0, 20);
    
    // Add cache headers (5 minutes)
    res.setHeader('Cache-Control', 'public, max-age=300');
    
    res.status(200).json({
      success: true,
      count: topNews.length,
      lastUpdated: new Date().toISOString(),
      news: topNews
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      news: [] // Fallback to empty
    });
  }
}

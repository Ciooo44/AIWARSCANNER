# 🚀 SUPABASE SETUP GUIDE

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Name: `aiwarscanner`
4. Region: Choose closest (e.g., Frankfurt for Europe)
5. Plan: Free Tier
6. Click "Create"

## Step 2: Get API Keys

1. Go to Project Settings → API
2. Copy:
   - `Project URL` (e.g., https://abc123.supabase.co)
   - `anon public` key

## Step 3: Create Database Tables

Go to SQL Editor and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News Table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  category TEXT CHECK (category IN ('military', 'diplomacy', 'analysis', 'intelligence', 'general')),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Military Assets Table
CREATE TABLE military_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  country TEXT NOT NULL,
  lat DECIMAL(10, 6),
  lon DECIMAL(10, 6),
  status TEXT,
  details TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight Tracking Table
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  callsign TEXT,
  icao24 TEXT UNIQUE,
  lat DECIMAL(10, 6),
  lon DECIMAL(10, 6),
  altitude INTEGER,
  velocity DECIMAL(10, 2),
  heading INTEGER,
  aircraft_type TEXT,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime
ALTER TABLE news REPLICA IDENTITY FULL;
ALTER TABLE military_assets REPLICA IDENTITY FULL;
ALTER TABLE flights REPLICA IDENTITY FULL;

-- Create publication for realtime
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE news, military_assets, flights;

-- Create indexes for performance
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_flights_last_seen ON flights(last_seen DESC);
CREATE INDEX idx_assets_country ON military_assets(country);
```

## Step 4: Deploy Edge Functions

Install Supabase CLI:
```bash
npm install -g supabase
```

Login and link project:
```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Deploy functions:
```bash
supabase functions deploy rss-fetch
supabase functions deploy adsb-fetch
```

## Step 5: Set Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Step 6: Create Cron Job for RSS Aggregator

In Supabase Dashboard:
1. Go to Database → Cron Jobs
2. Create new job:
   - Name: `rss-aggregator`
   - Schedule: `*/5 * * * *` (every 5 minutes)
   - Command: Call `rss-fetch` Edge Function and insert results

Or use external service (cron-job.org) to trigger every 5 minutes.

## Step 7: Seed Initial Data

```sql
-- Insert initial military assets
INSERT INTO military_assets (name, type, country, lat, lon, status, details) VALUES
('USS Abraham Lincoln (CVN-72)', 'carrier', 'US', 22.5, 62.0, 'deployed', 'Carrier Strike Group — Arabian Sea'),
('USS Gerald R. Ford (CVN-78)', 'carrier', 'US', 34.5, 20.0, 'transiting', 'World\'s largest carrier — ETA early March'),
('Al Udeid Air Base', 'airbase', 'Qatar', 25.117, 51.315, 'active', 'CENTCOM Forward HQ — ~10,000 personnel'),
('Natanz Enrichment Facility', 'nuclear', 'Iran', 33.724, 51.727, 'monitored', 'Primary centrifuge facility');
```

## Features Enabled

✅ **Real-time News** - RSS feeds aggregated every 5 minutes
✅ **Live Flight Tracking** - ADS-B data from OpenSky Network
✅ **Military Asset Tracking** - Real positions in database
✅ **WebSocket Updates** - Instant updates without refresh
✅ **CORS-Free** - All data via Supabase Edge Functions

## Testing

```bash
# Test RSS function
curl -X POST https://your-project.supabase.co/functions/v1/rss-fetch \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.aljazeera.com/xml/rss/all.xml"}'

# Test ADS-B function
curl -X POST https://your-project.supabase.co/functions/v1/adsb-fetch \
  -H "Content-Type: application/json" \
  -d '{"bounds": {"minLat": 10, "maxLat": 42, "minLon": 25, "maxLon": 75}}'
```

## Monitoring

Supabase Dashboard shows:
- Database usage
- Edge Function invocations
- Real-time connections
- API logs

## Cost (Free Tier Limits)

- Database: 500MB
- Edge Functions: 500K invocations/month
- Realtime: 200 concurrent connections
- Storage: 1GB

Perfect for startup/pilot phase!

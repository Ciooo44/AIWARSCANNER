// Supabase Edge Function: RSS Feed Fetcher
// Bypasses CORS by running server-side

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch RSS feed
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AIWARSCANNER Bot 1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const xmlText = await response.text();
    
    // Parse XML to JSON
    const items = parseRSS(xmlText);
    
    return new Response(
      JSON.stringify({ items }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseRSS(xmlText) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');
    
    if (title && link) {
      items.push({
        title: title.replace(/<[^>]*>/g, ''),
        description: (description || '').replace(/<[^>]*>/g, '').substring(0, 200),
        link,
        pubDate: pubDate || new Date().toISOString()
      });
    }
  }
  
  return items;
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}[\s\S]*?>([\s\S]*?)<\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

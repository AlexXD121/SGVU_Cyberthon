import feedparser
from datetime import datetime

def fetch_security_feed(limit: int = 10):
    """
    Fetches live security news from RSS feeds.
    Fallback to demo data if fetching fails.
    """
    feed_urls = [
        "https://feeds.feedburner.com/TheHackersNews",
        "https://krebsonsecurity.com/feed/"
    ]
    
    news_items = []
    
    try:
        for url in feed_urls:
            feed = feedparser.parse(url)
            
            # Get top 3 articles from each feed
            for entry in feed.entries[:3]:
                news_items.append({
                    "id": entry.get("id", entry.get("link", "")),
                    "title": entry.get("title", "No Title"),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", str(datetime.now())),
                    "risk_level": "High",  # Could be enhanced with NLP classification
                    "source": "TheHackersNews" if "feedburner" in url else "KrebsOnSecurity"
                })
        
        # If we successfully got items, return them
        if news_items:
            return news_items[:limit]
        else:
            raise Exception("No items fetched")
            
    except Exception as e:
        print(f"Error fetching feeds: {e}. Using fallback data.")
        
        # Emergency Demo Data - Fallback
        return [
            {
                "id": "1",
                "title": "Deepfake CEO Scam Detected in Major Financial Fraud",
                "link": "https://example.com/deepfake-ceo-scam",
                "published": str(datetime.now()),
                "risk_level": "Critical",
                "source": "Emergency Data"
            },
            {
                "id": "2",
                "title": "New Phishing Campaign Targets Cryptocurrency Users",
                "link": "https://example.com/crypto-phishing",
                "published": str(datetime.now()),
                "risk_level": "High",
                "source": "Emergency Data"
            },
            {
                "id": "3",
                "title": "AI-Generated Fake News Spreading Across Social Media",
                "link": "https://example.com/ai-fake-news",
                "published": str(datetime.now()),
                "risk_level": "High",
                "source": "Emergency Data"
            }
        ]

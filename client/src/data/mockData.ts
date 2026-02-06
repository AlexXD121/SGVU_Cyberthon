export const mockData = {
    "clusters": [
        {
            "id": "cluster_mumbai_001",
            "clusterTitle": "Mumbai Urban Flood Crisis Evolution",
            "image": "mumbai_flood_news_1770136169216.png",
            "mainStory": {
                "source": "Mumbai Today",
                "title": "Dadar completely underwater! Cars are floating away! Panic as water levels rise in residential hubs.",
                "author": "Local Correspondent",
                "time": "15 mins ago",
                "risk": 72
            },
            "relatedStories": [
                {
                    "source": "Times of India",
                    "title": "Relief operations underway in Mumbai; civic body issues red alert for South Mumbai.",
                    "time": "1 hour ago",
                    "author": "TOI News Desk",
                    "reliability": 98
                },
                {
                    "source": "NDTV News",
                    "title": "Rumors of Dam Burst near Dadar are False; IMD clarifies situation.",
                    "time": "2 hours ago",
                    "author": "NDTV Tech",
                    "reliability": 95
                },
                {
                    "source": "The Guardian",
                    "title": "Climate Change and Urban Planning: The recurring story of Mumbai's Monsoons.",
                    "time": "4 hours ago",
                    "author": "Luke McLaughlin",
                    "reliability": 92
                }
            ],
            "analysis": {
                "verdict": "MISLEADING",
                "trustScore": 28,
                "reasoning": [
                    { "step": "Visual Verification", "detail": "The image used in the viral post was traced back to 2017 floods in Bangladesh, not current Mumbai rains." },
                    { "step": "Geospatial Check", "detail": "Live CCTV feeds from Dadar Junction show waterlogging, but no 'floating cars' or disaster-level waves." },
                    { "step": "Official Corroboration", "detail": "BMC and Mumbai Police have officially flagged this specific post as 'Panic Mongering'." }
                ],
                "claim": "Dadar is experience 10ft waves and cars are floating away due to a dam burst.",
                "reality": "Waterlogging is present but manageable. No dam burst occurred. The situation is under control by local authorities.",
                "resources": [
                    { "name": "Official BMC Twitter", "link": "https://twitter.com/mybmc", "type": "Government" },
                    { "name": "Reuters Fact Check", "link": "#", "type": "News" },
                    { "name": "Google Maps Live Traffic", "link": "#", "type": "Utility" }
                ]
            }
        },
        {
            "id": "cluster_vaccine_002",
            "clusterTitle": "Health Security: Vaccine Distribution Patterns",
            "image": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=1000",
            "mainStory": {
                "source": "Alternative Health",
                "title": "Internal Documents Leak: Vaccination program contains tracking micro-chips in Phase 3.",
                "author": "Unverified Anonymous",
                "time": "22 mins ago",
                "risk": 94
            },
            "relatedStories": [
                {
                    "source": "WHO Global",
                    "title": "Verification: Analyzing ingredients and security of global vaccine chains.",
                    "time": "3 hours ago",
                    "reliability": 100
                },
                {
                    "source": "India Today",
                    "title": "Debunking the 'Microchip' Myth: A technical deep dive into vaccine technology.",
                    "time": "5 hours ago",
                    "reliability": 96
                }
            ],
            "analysis": {
                "verdict": "FABRICATED",
                "trustScore": 4,
                "reasoning": [
                    { "step": "Metadata Audit", "detail": "The 'leaked documents' contain non-existent department names and formatting inconsistent with health ministry standards." },
                    { "step": "Scientific Review", "detail": "Nano-chips of this size with 5G capabilities do not currently exist in medical-grade fluid form." },
                    { "step": "Origin Tracking", "detail": "Information originated from a known bot network previously flagged for election interference." }
                ],
                "claim": "Vaccines are being used to implant tracking microchips that activate via 5G.",
                "reality": "Vaccines contain biological agents designed to build immunity. There is no electronic components or tracking hardware involved.",
                "resources": [
                    { "name": "WHO Fact Sheet", "link": "https://who.int", "type": "Health" },
                    { "name": "Scientific American", "link": "#", "type": "Science" }
                ]
            }
        }
    ],
    "posts": [
        { "id": "p1", "content": "Dadar is underwater!", "incidentId": "cluster_mumbai_001" },
        { "id": "p2", "content": "Vaccine microchips found.", "incidentId": "cluster_vaccine_002" }
    ]
};

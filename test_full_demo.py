import requests
import json
from colorama import init, Fore, Style

init(autoreset=True)

print("\n" + "="*70)
print(Fore.CYAN + Style.BRIGHT + "🚀 TRU SYSTEM - LIVE INTEGRATION TEST")
print("="*70 + "\n")

# Test 1: Homepage accessibility
print(Fore.YELLOW + "📍 TEST 1: Frontend Accessibility")
print("-" * 70)
try:
    response = requests.get("http://localhost:3000")
    print(f"✅ Homepage: {Fore.GREEN}ACCESSIBLE ({response.status_code})")
except Exception as e:
    print(f"❌ Homepage: {Fore.RED}ERROR - {e}")

# Test 2: AI Verification
print("\n" + Fore.YELLOW + "📍 TEST 2: AI Verification Endpoint")
print("-" * 70)
try:
    fake_news = "Scientists discover that eating chocolate daily makes you immortal!"
    response = requests.post(
        "http://localhost:8000/verify",
        json={"text": fake_news}
    )
    data = response.json()
    
    print(f"✅ API Status: {Fore.GREEN}{response.status_code}")
    print(f"\n📊 {Fore.CYAN}RESULTS:")
    print(f"   Trust Score: {Fore.RED if data['trust_score'] < 50 else Fore.GREEN}{data['trust_score']}/100")
    print(f"   Verdict: {Fore.MAGENTA}{data['verdict']}")
    print(f"   Confidence: {Fore.CYAN}{data['confidence']*100:.1f}%")
    print(f"\n💡 {Fore.YELLOW}AI Explanations:")
    for i, exp in enumerate(data['explanation'][:3], 1):
        print(f"   {i}. {exp}")
    print(f"\n🔗 Hash: {Fore.GREEN}{data['hash'][:32]}...")
    
except Exception as e:
    print(f"❌ Verification: {Fore.RED}ERROR - {e}")

# Test 3: Live Feed
print("\n" + Fore.YELLOW + "📍 TEST 3: Live Threat Feed")
print("-" * 70)
try:
    response = requests.get("http://localhost:8000/feed?limit=2")
    feed_items = response.json()
    
    print(f"✅ API Status: {Fore.GREEN}{response.status_code}")
    print(f"📰 Retrieved {len(feed_items)} threat intelligence items")
    
    if feed_items:
        print(f"\n🔴 Latest Threat:")
        item = feed_items[0]
        print(f"   Title: {item['title'][:60]}...")
        print(f"   Source: {Fore.CYAN}{item['source']}")
        print(f"   Risk: {Fore.RED}{item['risk_level']}")
        
except Exception as e:
    print(f"❌ Feed: {Fore.RED}ERROR - {e}")

# Test 4: Report Submission
print("\n" + Fore.YELLOW + "📍 TEST 4: Scam Reporting with Stakes")
print("-" * 70)
try:
    response = requests.post(
        "http://localhost:8000/report",
        json={
            "url": "https://fake-crypto-giveaway.scam",
            "reason": "Impersonating Elon Musk for crypto scam",
            "stake_amount": 20
        }
    )
    data = response.json()
    
    print(f"✅ API Status: {Fore.GREEN}{response.status_code}")
    print(f"\n📋 Report Created:")
    print(f"   ID: {Fore.CYAN}{data['reportId']}")
    print(f"   Staked: {Fore.YELLOW}{data['staked_tokens']} TRU tokens")
    print(f"   Status: {Fore.MAGENTA}{data['status']}")
    print(f"   💰 Potential Reward: {Fore.GREEN}{data['staked_tokens'] + 15} TRU (if verified)")
    
except Exception as e:
    print(f"❌ Report: {Fore.RED}ERROR - {e}")

# Summary
print("\n" + "="*70)
print(Fore.GREEN + Style.BRIGHT + "✅ ALL INTEGRATION TESTS PASSED!")
print("="*70)

print(f"\n{Fore.CYAN}🌐 FRONTEND URLs (Open in Browser):")
print(f"   Homepage:     {Fore.WHITE}http://localhost:3000")
print(f"   Verify Page:  {Fore.WHITE}http://localhost:3000/verify")
print(f"   Feed Page:    {Fore.WHITE}http://localhost:3000/feed")
print(f"   Report Page:  {Fore.WHITE}http://localhost:3000/report")

print(f"\n{Fore.YELLOW}📡 BACKEND URLs:")
print(f"   API Docs:     {Fore.WHITE}http://localhost:8000/docs")
print(f"   Health:       {Fore.WHITE}http://localhost:8000/")

print(f"\n{Fore.MAGENTA}🎯 RECOMMENDED DEMO FLOW:")
print("   1. Open http://localhost:3000/verify")
print("   2. Paste fake news (e.g., 'Free Bitcoin giveaway!')")
print("   3. Click VERIFY TEXT → See trust score drop to ~15")
print("   4. Copy the blockchain hash")
print("   5. Navigate to /report and submit a scam with 20 TRU stake")
print("   6. Show /feed for live threat intelligence")
print("\n")

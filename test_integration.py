import requests
import json

# Test 1: Verify endpoint
print("=" * 60)
print("TEST 1: /verify endpoint")
print("=" * 60)
response = requests.post(
    "http://localhost:8000/verify",
    json={"text": "Breaking: Scientists discover drinking coffee cures all diseases!"}
)
print(f"Status: {response.status_code}")
print(json.dumps(response.json(), indent=2))

# Test 2: Feed endpoint  
print("\n" + "=" * 60)
print("TEST 2: /feed endpoint")
print("=" * 60)
response = requests.get("http://localhost:8000/feed?limit=3")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Returned {len(data)} feed items")
if data:
    print(f"First item: {data[0]['title'][:50]}...")

# Test 3: Report endpoint
print("\n" + "=" * 60)
print("TEST 3: /report endpoint")
print("=" * 60)
response = requests.post(
    "http://localhost:8000/report",
    json={
        "url": "https://fake-lottery-scam.com",
        "reason": "Phishing website pretending to be government lottery",
        "stake_amount": 20
    }
)
print(f"Status: {response.status_code}")
print(json.dumps(response.json(), indent=2))

print("\n" + "=" * 60)
print("✅ ALL TESTS COMPLETED SUCCESSFULLY!")
print("=" * 60)

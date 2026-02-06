"""
Test to determine if label mapping needs to be reversed.
We'll use obviously fake examples that should score LOW.
"""
import requests

test_samples = [
    # These are CLEARLY fake - should get LOW scores
    "Aliens landed in New York City yesterday and nobody noticed!",
    "Drink bleach to cure all diseases says doctor!",
    "Moon made of cheese confirms NASA!",
    
    # These are crediblesounding - should get HIGH scores  
    "Stock markets showed mixed results in trading today.",
    "Weather forecasts predict rain for the weekend.",
]

print("Testing if labels need to be reversed...")
print("="*60)

for text in test_samples:
    resp = requests.post("http://localhost:8000/verify", json={"text": text})
    score = resp.json()['trust_score']
    print(f"Score: {score:3d} | {text[:50]}")

print("\n" + "="*60)
print("If all scores are HIGH (>90), labels ARE REVERSED")
print("If fake news gets LOW scores (<30), labels are CORRECT")

import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "vikram71198/distilroberta-base-finetuned-fake-news-detection"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

print("="*80)
print("🔍 FINAL DEBUG - Understanding Model Behavior")
print("="*80)

test_texts = [
    ("FAKE", "Aliens landed in New York yesterday!"),
    ("REAL", "Stock markets showed mixed results today."),
]

print("\nChecking raw model outputs and our interpretation:\n")

for expected, text in test_texts:
    print(f"Text ({expected}): \"{text}\"")
    
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=1).squeeze().tolist()
    
    print(f"  Probs[0] (should be REAL): {probs[0]:.6f}")
    print(f"  Probs[1] (should be FAKE): {probs[1]:.6f}")
    
    # Current interpretation (swapped)
    real_prob = probs[0]
    fake_prob = probs[1]
    
    if real_prob > fake_prob:
        score = 50 + (real_prob * 50)
        verdict = "REAL"
    else:
        score = 50 - (fake_prob * 50)
        verdict = "FAKE"
    
    print(f"  → Score: {int(score)}, Verdict: {verdict}")
    print(f"  → Expected: {expected}")
    print()

print("\n" + "="*80)
print("CONCLUSION:")
print("If FAKE text gets Probs[1] high → labels are: 0=REAL, 1=FAKE ✓ (current)")
print("If FAKE text gets Probs[0] high → labels are: 0=FAKE, 1=REAL (need to swap back)")
print("="*80)

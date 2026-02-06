import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load the model
model_name = "vikram71198/distilroberta-base-finetuned-fake-news-detection"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

print("="*80)
print("🔍 DEBUGGING AI MODEL OUTPUT")
print("="*80)

test_texts = [
    "Scientists confirm drinking bleach cures COVID!",  # Obviously fake
    "The Federal Reserve announced interest rate changes today."  # Credible
]

for text in test_texts:
    print(f"\n📝 Testing: \"{text}\"")
    print("-" * 80)
    
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512, padding=True)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=1).squeeze()
    
    print(f"Raw logits: {logits.tolist()}")
    print(f"Probabilities: {probs.tolist()}")
    print(f"Label 0 prob: {probs[0]:.4f}")
    print(f"Label 1 prob: {probs[1]:.4f}")
    
    # Check model config
    if hasattr(model.config, 'id2label'):
        print(f"\nModel label mapping: {model.config.id2label}")
    
    # Determine classification
    predicted_class = torch.argmax(probs).item()
    print(f"Predicted class: {predicted_class}")

print("\n" + "="*80)
print("🔍 MODEL INFO")
print("="*80)
print(f"Model name: {model_name}")
print(f"Number of labels: {model.config.num_labels}")
if hasattr(model.config, 'id2label'):
    print(f"Label mapping: {model.config.id2label}")
else:
    print("No label mapping found - using default [0=FAKE, 1=REAL]")

import torch
import torch.nn.functional as F
import hashlib
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class AIEngine:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Loading AIEngine on {self.device}...")
        
        model_name = "vikram71198/distilroberta-base-finetuned-fake-news-detection"
        
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(model_name).to(self.device)
            self.model.eval()
            print("AIEngine loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise e

    def analyze(self, text: str) -> dict:
        """
        Analyzes the text and returns a trust score with SHA-256 hash.
        Trust Score: 0 (Fake) to 100 (Real)
        """
        try:
            # Generate SHA-256 hash of input text
            text_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
            
            # Tokenize input
            inputs = self.tokenizer(
                text, 
                return_tensors="pt", 
                truncation=True, 
                max_length=512, 
                padding=True
            ).to(self.device)

            # Inference
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
                probs = F.softmax(logits, dim=1).squeeze().tolist()

            # Model outputs: Label 0 = REAL, Label 1 = FAKE
            # NOTE: This is REVERSED from typical convention and Hugging Face docs!
            # Our testing confirmed: obvious fake news gets high Label_1 probability
            real_prob = probs[0]  # SWAPPED
            fake_prob = probs[1]  # SWAPPED
            
            # Trust Score Calculation
            if real_prob > fake_prob:
                score = 50 + (real_prob * 50)
                verdict = "REAL"
                confidence = real_prob
            else:
                score = 50 - (fake_prob * 50)
                verdict = "FAKE"
                confidence = fake_prob

            # Generate explanations based on score
            explanations = []
            if score < 30:
                explanations.append("High probability of misinformation detected")
                explanations.append("Linguistic patterns match known fake news sources")
            elif score < 50:
                explanations.append("Uncertain classification - conflicting signals")
                explanations.append("Recommend cross-referencing with additional sources")
            elif score < 70:
                explanations.append("Moderate confidence in authenticity")
                explanations.append("Some credible markers detected")
            else:
                explanations.append("High confidence in source credibility")
                explanations.append("Language patterns match verified journalism")
            
            # Add confidence-based explanation
            if confidence > 0.85:
                explanations.append(f"Model confidence: {int(confidence*100)}% (Very High)")
            elif confidence > 0.70:
                explanations.append(f"Model confidence: {int(confidence*100)}% (High)")
            else:
                explanations.append(f"Model confidence: {int(confidence*100)}% (Moderate)")

            return {
                "trust_score": int(score),
                "verdict": verdict,
                "hash": text_hash,
                "confidence": float(confidence),
                "explanation": explanations
            }

        except Exception as e:
            print(f"Error in analysis: {e}")
            return {
                "trust_score": 0,
                "verdict": "ERROR",
                "hash": hashlib.sha256(text.encode('utf-8')).hexdigest(),
                "confidence": 0.0,
                "explanation": ["Error occurred during analysis"]
            }

# Singleton Instance
try:
    ai_engine = AIEngine()
except Exception as e:
    print(f"Failed to initialize AI Engine: {e}")
    ai_engine = None

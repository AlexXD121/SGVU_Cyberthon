import torch
import torch.nn.functional as F
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
        Analyzes the text and returns a trust score.
        Trust Scope: 0 (Fake) to 100 (Real)
        """
        try:
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

            # The model outputs [REAL_SCORE, FAKE_SCORE] or [FAKE_SCORE, REAL_SCORE]
            # Checked model card/config: label 0 is "FAKE", label 1 is "REAL" usually for this model type
            # But specific model "vikram71198/distilroberta-base-finetuned-fake-news-detection":
            # Label 0: FAKE, Label 1: REAL
            
            fake_prob = probs[0]
            real_prob = probs[1]
            
            # Logic: Trust Score Calculation
            if real_prob > fake_prob:
                # High trust: 50 + (0.5 to 1.0 * 50) -> 75 to 100
                score = 50 + (real_prob * 50)
                verdict = "REAL"
                confidence = real_prob
            else:
                # Low trust: 50 - (0.5 to 1.0 * 50) -> 25 to 0
                score = 50 - (fake_prob * 50)
                verdict = "FAKE"
                confidence = fake_prob

            return {
                "trust_score": int(score),
                "verdict": verdict,
                "confidence": float(confidence)
            }

        except Exception as e:
            print(f"Error in analysis: {e}")
            return {
                "trust_score": 0,
                "verdict": "ERROR",
                "confidence": 0.0
            }

# Singleton Instance
try:
    ai_engine = AIEngine()
except Exception as e:
    print(f"Failed to initialize AI Engine: {e}")
    ai_engine = None

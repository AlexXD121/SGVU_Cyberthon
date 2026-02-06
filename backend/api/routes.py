from fastapi import APIRouter, HTTPException
from datetime import datetime
from .schemas import VerifyRequest, VerifyResponse
from services.ai_handler import ai_engine
from services.feed_manager import fetch_security_feed

api_router = APIRouter()

@api_router.post("/verify", response_model=VerifyResponse)
async def verify_text(request: VerifyRequest):
    if not ai_engine:
        raise HTTPException(status_code=503, detail="AI Engine is not available")
        
    result = ai_engine.analyze(request.text)
    
    return VerifyResponse(
        trust_score=result["trust_score"],
        verdict=result["verdict"],
        hash=result["hash"],
        timestamp=datetime.now()
    )

@api_router.get("/feed")
async def get_feed():
    return fetch_security_feed(limit=10)

from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class VerifyRequest(BaseModel):
    text: str
    source_url: Optional[str] = None

class VerifyResponse(BaseModel):
    trust_score: int
    verdict: str
    hash: str
    timestamp: datetime

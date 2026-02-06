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

# Report & Reward System Enums
from enum import Enum

class ReportStatus(str, Enum):
    pending = "pending"
    verified = "verified"
    rejected = "rejected"

class RewardStatus(str, Enum):
    none = "none"
    awaiting_wallet = "awaiting_wallet"
    ready_for_payout = "ready_for_payout"
    paid = "paid"

# Report & Reward System Models
class ReportRequest(BaseModel):
    url: str
    reason: str

class ReportResponse(BaseModel):
    reportId: str
    url: str
    status: ReportStatus
    submittedAt: datetime

class AdminVerifyRequest(BaseModel):
    reportId: str
    isScam: bool

class WalletSubmitRequest(BaseModel):
    reportId: str
    walletAddress: str

class RewardSendRequest(BaseModel):
    reportId: str

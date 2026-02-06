from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

# --- Enums ---
class ReportStatus(str, Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"

class RewardStatus(str, Enum):
    NONE = "none"
    AWAITING_WALLET = "awaiting_wallet"
    READY_FOR_PAYOUT = "ready_for_payout"
    PAID = "paid"

# --- AI Verification Models ---
class VerifyRequest(BaseModel):
    text: str
    source_url: Optional[str] = None

class VerifyResponse(BaseModel):
    trust_score: int
    verdict: str
    hash: str  # <--- CRITICAL: Blockchain proof hash
    timestamp: datetime

# --- Report & Reward Models ---
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

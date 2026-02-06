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
    confidence: float  # Confidence percentage (0.0 to 1.0)
    explanation: Optional[list[str]] = None  # Explainability signals
    timestamp: datetime

# --- Report & Reward Models ---
class ReportRequest(BaseModel):
    url: str
    reason: str
    stake_amount: Optional[int] = 10  # TRU tokens staked (default 10)

class ReportResponse(BaseModel):
    reportId: str
    url: str
    status: ReportStatus
    staked_tokens: int  # Amount of tokens staked
    submittedAt: datetime

class AdminVerifyRequest(BaseModel):
    reportId: str
    isScam: bool

class WalletSubmitRequest(BaseModel):
    reportId: str
    walletAddress: str

class RewardSendRequest(BaseModel):
    reportId: str

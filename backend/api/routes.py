from fastapi import APIRouter, HTTPException
from datetime import datetime
from .schemas import (
    VerifyRequest, VerifyResponse,
    ReportRequest, ReportResponse, ReportStatus, RewardStatus,
    AdminVerifyRequest, WalletSubmitRequest, RewardSendRequest
)
try:
    from services.ai_handler import ai_engine
    from services.feed_manager import fetch_security_feed
except ImportError:
    from backend.services.ai_handler import ai_engine
    from backend.services.feed_manager import fetch_security_feed
import uuid

api_router = APIRouter()

# In-memory database for reports
reports_db = {}

# EXISTING ENDPOINTS - DO NOT DELETE
@api_router.post("/verify", response_model=VerifyResponse)
async def verify_text(request: VerifyRequest):
    if not ai_engine:
        raise HTTPException(status_code=503, detail="AI Engine is not available")
        
    result = ai_engine.analyze(request.text)
    
    return VerifyResponse(
        trust_score=result["trust_score"],
        verdict=result["verdict"],
        hash=result["hash"],
        confidence=result["confidence"],
        explanation=result.get("explanation", []),
        timestamp=datetime.now()
    )

@api_router.get("/feed")
async def get_feed():
    return fetch_security_feed(limit=10)

# NEW REPORT & REWARD ENDPOINTS
@api_router.post("/report", response_model=ReportResponse)
async def create_report(request: ReportRequest):
    """Submit a new scam report"""
    report_id = str(uuid.uuid4())
    
    report_data = {
        "reportId": report_id,
        "url": request.url,
        "reason": request.reason,
        "staked_tokens": request.stake_amount,
        "status": ReportStatus.PENDING,
        "rewardStatus": RewardStatus.NONE,
        "submittedAt": datetime.now(),
        "walletAddress": None,
        "txHash": None
    }
    
    reports_db[report_id] = report_data
    
    return ReportResponse(
        reportId=report_id,
        url=request.url,
        status=ReportStatus.PENDING,
        staked_tokens=request.stake_amount,
        submittedAt=report_data["submittedAt"]
    )

@api_router.get("/admin/reports")
async def get_reports(status: str = None):
    """Get all reports, optionally filtered by status"""
    if status:
        filtered = [r for r in reports_db.values() if r["status"] == status]
        return filtered
    return list(reports_db.values())

@api_router.post("/admin/verify")
async def verify_report(request: AdminVerifyRequest):
    """Admin endpoint to verify if a report is a scam"""
    if request.reportId not in reports_db:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report = reports_db[request.reportId]
    
    if request.isScam:
        report["status"] = ReportStatus.VERIFIED
        report["rewardStatus"] = RewardStatus.AWAITING_WALLET
    else:
        report["status"] = ReportStatus.REJECTED
        report["rewardStatus"] = RewardStatus.NONE
    
    return {"message": "Report updated", "report": report}

@api_router.post("/reward/wallet")
async def submit_wallet(request: WalletSubmitRequest):
    """User submits wallet address to receive reward"""
    if request.reportId not in reports_db:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report = reports_db[request.reportId]
    
    if report["rewardStatus"] != RewardStatus.AWAITING_WALLET:
        raise HTTPException(
            status_code=400, 
            detail="Report not eligible for wallet submission"
        )
    
    report["walletAddress"] = request.walletAddress
    report["rewardStatus"] = RewardStatus.READY_FOR_PAYOUT
    
    return {"message": "Wallet address saved", "report": report}

@api_router.post("/reward/send")
async def send_reward(request: RewardSendRequest):
    """Admin endpoint to send reward to user"""
    if request.reportId not in reports_db:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report = reports_db[request.reportId]
    
    if report["rewardStatus"] != RewardStatus.READY_FOR_PAYOUT:
        raise HTTPException(
            status_code=400,
            detail="Report not ready for payout"
        )
    
    # Generate fake transaction hash
    fake_tx_hash = f"0x{uuid.uuid4().hex}{uuid.uuid4().hex[:24]}"
    
    report["rewardStatus"] = RewardStatus.PAID
    report["txHash"] = fake_tx_hash
    
    return {
        "message": "Reward sent successfully",
        "txHash": fake_tx_hash,
        "report": report
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import sys

try:
    from backend.api.routes import api_router
    from backend.middleware.rate_limit import RateLimitMiddleware
except ImportError:
    try:
        from api.routes import api_router
        from middleware.rate_limit import RateLimitMiddleware
    except ImportError:
        # Fallback for when running from root without package context
        import os
        sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
        from backend.api.routes import api_router
        from backend.middleware.rate_limit import RateLimitMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="TRU Backend", version="0.1.0")

# CORS Setup - Production-ready with specific origins
allowed_origins = [
    "http://localhost:3000",  # Local development
    "http://127.0.0.1:3000",   # Alternative localhost
    "https://tru-app.vercel.app",  # Production frontend (update with actual)
    "https://*.vercel.app",  # Vercel preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Rate Limiting - 30 requests per minute
app.add_middleware(RateLimitMiddleware, max_requests=30, window_seconds=60)

# Include API Router
app.include_router(api_router)

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"status": "TRU System Online", "version": "0.1.0"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting TRU Backend server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

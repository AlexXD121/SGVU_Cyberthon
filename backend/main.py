from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from backend.api.routes import api_router
except ImportError:
    try:
        from api.routes import api_router
    except ImportError:
        # Fallback for when running from root without package context
        import sys
        import os
        sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
        from backend.api.routes import api_router

app = FastAPI(title="TRU Backend", version="0.1.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"status": "TRU System Online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

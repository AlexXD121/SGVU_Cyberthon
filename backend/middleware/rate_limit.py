import time
from typing import Callable
from fastapi import Request, Response, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 30, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = {}  # IP -> list of timestamps

    async def dispatch(self, request: Request, call_next: Callable):
        # Skip rate limiting for root and docs endpoints
        if request.url.path in ["/", "/docs", "/openapi.json"]:
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        current_time = time.time()

        # Clean old requests and check rate limit
        if client_ip in self.requests:
            # Remove requests outside current window
            self.requests[client_ip] = [
                timestamp for timestamp in self.requests[client_ip]
                if current_time - timestamp < self.window_seconds
            ]

            # Check if rate limit exceeded
            if len(self.requests[client_ip]) >= self.max_requests:
                raise HTTPException(
                    status_code=429,
                    detail=f"Rate limit exceeded: {self.max_requests} requests per {self.window_seconds}s"
                )
        else:
            self.requests[client_ip] = []

        # Record this request
        self.requests[client_ip].append(current_time)

        response = await call_next(request)
        return response

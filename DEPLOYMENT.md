# TRU - Deployment Guide

## Quick Start (Local Development)

### Backend
```bash
cd backend
# Activate virtual environment (if using)
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
# Backend runs at http://localhost:8000
```

### Frontend
```bash
cd client
npm install
npm run dev
# Frontend runs at http://localhost:3000
```

---

## Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select Repository**: `AlexXD121/SGVU_Cyberthon`
4. **Root Directory**: Set to `backend`
5. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. **Environment Variables**:
   - (None required for MVP)
7. **Deploy** → Copy domain (e.g., `tru-backend.up.railway.app`)

#### Deploy Frontend to Vercel

1. **Create Vercel Account**: https://vercel.com
2. **New Project** → **Import Git Repository**
3. **Select Repository**: `AlexXD121/SGVU_Cyberthon`
4. **Root Directory**: `client`
5. **Framework Preset**: Next.js
6. **Environment Variables**:
   - Add: `NEXT_PUBLIC_API_URL=https://tru-backend.up.railway.app`
7. **Deploy** → Get URL (e.g., `tru-app.vercel.app`)

#### Update Backend CORS

Edit `backend/main.py`:
```python
allowed_origins = [
    "http://localhost:3000",
    "https://tru-app.vercel.app",  # ← Update with your Vercel URL
    "https://*.vercel.app",
]
```

Commit and push to trigger auto-deployment.

---

### Option 2: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY client/package*.json ./
RUN npm ci

COPY client/ .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
```

---

## Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Frontend (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app
```

---

## Health Checks

### Backend
```bash
curl http://localhost:8000/
# Response: {"status":"TRU System Online","version":"0.1.0"}
```

### Frontend
```bash
curl http://localhost:3000/
# Should return HTML
```

### API Endpoints
```bash
# Verify
curl -X POST http://localhost:8000/verify \
  -H "Content-Type: application/json" \
  -d '{"text":"test news article"}'

# Feed
curl http://localhost:8000/feed?limit=5

# Report
curl -X POST http://localhost:8000/report \
  -H "Content-Type: application/json" \
  -d '{"url":"https://scam.com","reason":"Phishing","stake_amount":20}'
```

---

## Performance Considerations

### Backend
- **Model Loading**: First request takes ~5s (model loads on startup)
- **Inference Speed**: <1s per verification
- **Rate Limit**: 30 requests/minute per IP
- **Memory**: ~2GB RAM (for RoBERTa model)

### Frontend
- **Build Time**: ~2 minutes
- **Bundle Size**: ~500KB gzipped
- **First Load**: <2s

---

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Must be 3.8+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend build fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### CORS errors in production
- Update `allowed_origins` in `backend/main.py`
- Ensure frontend URL matches exactly (no trailing slash)

### Model download stuck
```bash
# Pre-download model
python -c "from transformers import AutoTokenizer, AutoModelForSequenceClassification; AutoTokenizer.from_pretrained('hamzab/roberta-fake-news-classification'); AutoModelForSequenceClassification.from_pretrained('hamzab/roberta-fake-news-classification')"
```

---

## Production Checklist

- [ ] Backend deployed and responding to health checks
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS origins updated with production URLs
- [ ] AI model loading successfully
- [ ] All 4 pages working (Home, Verify, Feed, Report)
- [ ] Error boundaries catching errors gracefully
- [ ] Rate limiting active (test with >30 requests)
- [ ] Logging enabled and readable

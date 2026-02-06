# TRU System

A full-stack application developed for SGVU Cyberthon, featuring a high-performance FastAPI backend and a modern Next.js frontend.

## 🚀 Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Features**: REST API, CORS middleware enabled, modular routing.
- **Entry Point**: `backend/main.py`

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **UI/Animation**:
  - Framer Motion & GSAP for animations
  - D3.js for data visualization
  - Lucide React for icons
- **Entry Point**: `client/`

## 📂 Project Structure

```
/
├── backend/            # FastAPI Backend
│   ├── api/           # API Routes and Schemas
│   ├── services/      # Business Logic (Feed Manager, AI Handler)
│   └── main.py        # Application Entry Point
│
├── client/             # Next.js Frontend
│   ├── public/        # Static assets
│   └── src/           # Component source code
```

## 🛠️ Setup & Running

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies (ensure a virtual environment is active).
3. Run the server:
   ```bash
   python main.py
   # or
   uvicorn main:app --reload
   ```
   Server runs on `http://0.0.0.0:8000`.

### Frontend
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

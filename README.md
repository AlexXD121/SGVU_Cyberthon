# TRU - AI-Powered Truth Verification System 🛡️

![Status](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Backend-FastAPI-blue)
![AI](https://img.shields.io/badge/AI-DistilRoBERTa-orange)
![License](https://img.shields.io/badge/License-MIT-green)

**TRU** is an advanced AI-driven platform designed to combat misinformation and financial fraud in real-time. Built for the SGVU Cyberthon, it leverages state-of-the-art NLP models to detect fake news and identify trending scams.

## 🚀 Features

-   **Deepfake & Text Analysis:** Uses a fine-tuned **DistilRoBERTa** transformer model to analyze text trustworthiness with high precision.
-   **Real-time Trust Score:** Generates a 0-100 verification score for any text input.
-   **Blockchain-Ready Hashing:** SHA-256 fingerprinting for immutable proof of verification.
-   **Live Scam Feed:** Aggregates and displays trending security threats from TheHackersNews & KrebsOnSecurity.
-   **Report & Reward System:** Community-driven scam reporting with crypto reward payouts.
-   **Public API:** Open infrastructure for easy integration with frontend and external apps.

## 🛠️ Tech Stack

### Backend & AI
-   **Framework:** FastAPI (Python 3.10+)
-   **ML Engine:** PyTorch, Hugging Face Transformers
-   **Model:** `vikram71198/distilroberta-base-finetuned-fake-news-detection`
-   **Task Queue:** Background async processing (planned)

### Frontend (Upcoming)
-   **Framework:** React / Next.js
-   **Styling:** TailwindCSS
-   **State:** Redux / Context API

## 📂 Project Structure

```bash
SGVU_Hackathon/
├── backend/                # FastAPI Backend
│   ├── api/                # Routes & Pydantic Schemas
│   ├── services/           # AI Logic & Feed Management
│   ├── main.py             # Entry Point
│   └── requirements.txt    # Python Dependencies
├── frontend/               # React Frontend (In Progress @harsh)
└── README.md               # Documentation
```

## ⚡ Getting Started

### Prerequisites
-   Python 3.10+
-   Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Al121/SGVU_Cyberthon.git
    cd SGVU_Cyberthon
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3.  **Run the Server**
    ```bash
    uvicorn main:app --reload
    ```
    *The first run will download the 330MB AI model automatically.*

4.  **Run Tests**
    Verify the system is operational:
    ```bash
    python backend/test_api.py
    ```

5.  **Access API**
    -   Docs: `http://localhost:8000/docs`
    -   Health: `http://localhost:8000/`

## 🔌 API Endpoints

### Core Features
-   `POST /verify` - Analyze text and get trust score with blockchain hash
-   `GET /feed` - Get live scam feed from security news sources

### Report & Reward System
-   `POST /report` - Submit a scam URL for community reporting
-   `GET /admin/reports` - View all reports (filter by status)
-   `POST /admin/verify` - Verify if reported URL is a scam (admin)
-   `POST /reward/wallet` - Submit wallet address to claim reward
-   `POST /reward/send` - Send crypto reward to reporter (admin)

## 👥 Team & Roles

| Role | Member | Responsibilities |
| :--- | :--- | :--- |
| **Project Lead / AI** | **Dhaval** | Core AI Logic, System Architecture (`ai-workplace`) |
| **Backend Lead** | **Lucky** | API Development, Server Management (`lucky`) |
| **Frontend Lead** | **Harsh** | UI/UX Design, Client Implementation (`harsh`) |
| **Support / Ops** | **Hardik** | DevOps, Testing, Additional Features (`hardik`) |

## 🤝 Contribution

1.  Checkout your branch (`git checkout <your-name>`).
2.  Make changes and commit (`git commit -m "Added feature X"`).
3.  Push to remote (`git push origin <your-name>`).
4.  Open a Pull Request to `main`.

---
*Built with ❤️ for SGVU Cyberthon 2026*

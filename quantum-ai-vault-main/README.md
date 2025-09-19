# Quantum AI Vault

Quantum AI Vault is a React + FastAPI application that generates strong passwords and stores them encrypted using a hybrid Post-Quantum Cryptography (PQC) scheme (Kyber512 KEM + AES-256-GCM). It also offers AI-generated passphrases via HuggingFace (with fallback) and a full backend API.

## What's Included
- Frontend: Vite + React + Tailwind + shadcn/ui
- Backend: FastAPI (Python)
- Crypto: Kyber512 (via pyOQS if available) + AES-GCM with HKDF
- AI: HuggingFace GPT-2 pipeline for passphrases (fallback wordlist if not available)
- DB: SQLite by default, easy switch to Postgres via `DATABASE_URL`
- Docker: Backend Dockerfile and docker-compose
- Tests: pytest for crypto and generators

## Backend Setup (Local)
1. Create a virtualenv and install deps:
```
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```
2. (Optional) Enable pyOQS if liboqs is installed:
```
# PowerShell
$env:ENABLE_PYOQS="true"
```
3. Run the API:
```
python -m uvicorn backend.app:app --reload
```

API base: `http://localhost:8000/api`

## Frontend Setup
```
npm install
# PowerShell
$env:REACT_APP_API_BASE="http://localhost:8000/api"
npm run dev
```

## Docker
```
docker compose up --build
```

## Using real PQC (pyOQS)
- Install `liboqs` and `pyOQS` per official docs. Then set `ENABLE_PYOQS=true` before starting the backend. If `pyOQS` is not available, the code falls back to a simulated KEM (NOT quantum secure — demo only).

## Security & Production Notes
- Use per-user keypairs; never store private keys in plaintext. Use HSM/KMS.
- Enforce HTTPS, JWT auth, CSRF protection, rate limiting, logging.
- Rotate keys regularly. Prefer Postgres + Redis for scale and caching.
- Architecture: FastAPI + Postgres + Redis + Docker + Nginx + Let's Encrypt.

## Tests
```
pytest backend/tests
```

## API Summary
- POST `/api/generate` → generate passwords/passphrases/dev keys
- POST `/api/encrypt` → store encrypted item
- GET `/api/items` → list items
- POST `/api/decrypt` → decrypt by id
- GET `/api/pk` → server KEM public key

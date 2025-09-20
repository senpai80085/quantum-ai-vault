# Quantum-Safe Password Generator 

## Overview
The **Quantum-Safe Password Generator** is an AI-powered, post-quantum secure password manager prototype.  
It is designed to generate and protect user credentials against **future quantum computer attacks** while keeping the UI simple and accessible.

This project was built with:
- **Frontend (UI/UX)**: Loveable AI (No-Code Prototype)
- **Backend (Logic & Security)**: Cursor AI (Code + PQC + AI Integration)
- **AI Support**: GPT-powered passphrase generation
- **PQC Algorithms**: Kyber512 (for key encapsulation) + AES-GCM (for symmetric encryption)

Live Demo: [Quantum Pass Gen](https://quantum-pass-gen.vercel.app/)  
GitHub Repo: [Quantum AI Vault](https://github.com/senpai80085/quantum-ai-vault)

---

## Features
- **AI-Powered Password Modes**  
  - Random Strong Strings (cryptographically secure RNG)  
  - Natural Language Passphrases (AI-generated, human-friendly)  
  - Developer API Keys (long, structured secrets)  

- **Post-Quantum Security (PQC)**  
  - Uses **Kyber512** for encryption against quantum brute-force attacks  
  - AES-GCM symmetric encryption for secure vault storage  

- **User Vault**  
  - Save and retrieve encrypted passwords  
  - One-click decryption demo to show PQC in action  

- **Password Analytics**  
  - Strength & entropy score  
  - Crack-time estimator (classical vs quantum computers)  
  - Visual charts for demo impact  

---

## Tech Stack
- **Frontend (Prototype)**: Loveable AI (React + Tailwind, generated via no-code)  
- **Backend**: Python / Node.js with PQC libraries, integrated via Cursor AI  
- **AI Integration**: GPT-based model for passphrase generation  
- **Deployment**: Vercel (Frontend) + Cloud backend (TBD: Supabase/Firebase/AWS)  

---

## Workflow
1. User selects **password generation mode**.  
2. App generates password using **AI / RNG**.  
3. Password is encrypted with **Kyber512 + AES-GCM**.  
4. User can **save** it in the vault or **decrypt** it on-demand.  
5. Strength & crack-time analytics are displayed.  

---

## Example Architecture Flow
```flowchart TD
  A[User] --> B[Frontend - Loveable]
  B --> C[Generator (AI / RNG)]
  C --> D[PQC Encrypt (Kyber512)]
  D --> E[Vault (AES-GCM)]
  E --> F[Decrypt]
  F --> B
  D --> G[Analytics: Entropy / Crack Time]
  G --> B```
---

## Installation (Developer Mode)
Clone the repo:
```bash
git clone https://github.com/senpai80085/quantum-ai-vault.git
cd quantum-ai-vault
```

Install dependencies (Python example):
```bash
pip install -r requirements.txt
```

Run backend:
```bash
python app.py
```

Run frontend (if separate React build):
```bash
npm install
npm run dev
```

---

## Future Scope
- Multi-device sync with PQC-protected cloud storage  
- Integration with browser extensions & mobile apps  
- Advanced PQC algorithms (Dilithium, Falcon for signatures)  
- Enterprise API for developers  

---

##  Contributors
- Built during MVP Pitch Competition 2025  
- **Priyanshu Karmakar** (Cybersecurity & AI enthusiast)  
- AI Support: Loveable, Cursor, ChatGPT  

---

## License
MIT License Free to use, modify, and distribute with attribution.

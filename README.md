# NetraGuard AI 🛡️
**India's First Active Anti-Fraud Intelligence Grid**

NetraGuard is a complete B2G and B2C ecosystem designed to prevent digital arrest scams, phishing, and counterfeit currency at the source. Instead of being reactive like existing platforms (Truecaller, NCRP), NetraGuard actively intercepts fraud *before* the transaction happens.

## 🌟 Key Features
- **Live Scam Interceptor (Passive Shield):** Runs silently in the background and **activates only during an active phone call** to preserve battery life and guarantee 100% user privacy. Uses NLP to detect psychological manipulation (Stage 1-4 Fear Induction) and actively interrupts the call with a red lockdown screen.
- **WhatsApp Fraud Shield:** Forward suspicious links or messages to the NetraGuard Bot. Powered by Twilio and Gemini, it instantly returns a risk verdict.
- **Counterfeit Note Scanner:** Uses **Google Gemini 2.5 Flash Vision** to scan currency notes and instantly detect missing RBI security features (microprinting, security threads).
- **Law Enforcement Dashboard (B2G):** A centralized command center for Police Cyber Cells and the CBI to view Fraud Network Graphs, mapping scammers across telecom and banking networks.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** FastAPI (Python), Uvicorn
- **AI/ML:** Google Gemini 2.5 Flash Vision API (Generative AI)
- **Database/Integrations:** Mocked DB for MVP, Twilio (simulated WhatsApp Webhooks)

## 🚀 How to Run Locally

### 1. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory and add your Gemini API Key:
```env
GEMINI_API_KEY="your_api_key_here"
```
Run the FastAPI server:
```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

## 🏆 Hackathon Details
Built for demonstrating proactive fraud prevention. 

*Stay Vigilant. Stay Protected.*

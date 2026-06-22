<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg" width="100" alt="NetraGuard Logo">
  <h1>NetraGuard AI 🛡️</h1>
  <p><b>India's First Active Anti-Fraud Intelligence Grid</b></p>
  <p><i>Stopping Digital Arrests, Phishing, and Counterfeiting Before the Money Moves.</i></p>
  
  [![Hackathon](https://img.shields.io/badge/ET_AI_Hackathon_2.0-Winner-gold?style=for-the-badge)](https://github.com/swaraj3092/NetraGuard)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-8A2BE2?style=for-the-badge&logo=googlebard&logoColor=white)](https://deepmind.google/technologies/gemini/)
</div>

---

## 🚨 The Problem
Every year, Indians lose over **₹7,400 Crores** to digital fraud. Scammers are now using AI to impersonate police and manipulate citizens into "Digital Arrests." Existing solutions like Truecaller or the NCRP Portal are entirely **reactive**—they only help identify a spammer or report a crime *after* the victim's life savings are gone.

## 💡 The Solution: NetraGuard AI
NetraGuard is a complete **B2G (Business-to-Government)** and **B2C (Business-to-Consumer)** ecosystem designed to actively intercept fraud. It runs silently in the background, waking up only during live threats to break the scammer's psychological hold over the victim.

<br>

---

## 🌟 Core Features

### 1. Live Scam Interceptor (Passive Shield) 🛡️
Runs silently in the background to preserve battery life and guarantee **100% user privacy**. It awakens only during an active phone call, locally transcribing audio and using NLP to detect psychological manipulation (Stage 1-4 Fear Induction). If a threat is detected, it actively interrupts the call with a red lockdown screen.

### 2. Law Enforcement Command Center (B2G Dashboard) 🏢
A centralized web dashboard built for Police Cyber Cells and the CBI. 
* **Fraud Network Graph:** Automatically maps connections between scammers, victims, and mule accounts across telecom and banking networks.
* **Evidence Packages:** Automatically generates court-admissible, tamper-proof PDFs with call transcripts and timestamps for prosecutors.
* **Live Intercepts:** Monitor active fraud rings across the country in real-time.

### 3. AI Counterfeit Scanner (Gemini Vision) 💵
Using the power of **Google Gemini 2.5 Flash Vision**, citizens and bank tellers can snap a photo of any suspicious currency note. The AI instantly checks for missing RBI security features (microprinting, security threads) and returns a highly accurate Genuine or Counterfeit verdict.

### 4. WhatsApp Fraud Shield 💬
Phishing starts on WhatsApp. Users can forward suspicious links or messages directly to the NetraGuard WhatsApp Bot. Powered by Twilio and Gemini, it instantly returns a risk verdict, stopping phishing at the source.

---

## ⚙️ System Architecture

NetraGuard utilizes an inter-institutional intelligence layer:
- **Frontend:** React, TypeScript, Tailwind CSS, Vite (Optimized for Mobile & Desktop)
- **Backend:** FastAPI (Python), Uvicorn
- **AI/ML Engine:** Google Gemini 2.5 Flash API (Text & Vision processing)
- **Communications:** Simulated Twilio Webhooks for WhatsApp bot logic.

---

## 🚀 How to Run Locally

### 1. Backend Setup
Clone the repository and spin up the Python backend:
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
Open a new terminal and spin up the React frontend:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser to view the Command Center Dashboard and the Mobile App Mockup.

---

## 🔮 Future Roadmap
1. **Voice Deepfake Detection:** Real-time waveform analysis to detect synthetic, AI-generated voices of family members during emergencies.
2. **Automated FIR Generation:** The AI will automatically draft legal police reports for victims using the intercepted audio transcripts in Hindi and English.
3. **Contextual Bank Freezes:** API integration with major banks to temporarily freeze transactions if a user has a high "Manipulation Risk Score" from an active phone call.

<br>

<div align="center">
  <b>Built with ❤️ for the ET AI Hackathon 2.0</b><br>
  <i>Stay Vigilant. Stay Protected.</i>
</div>

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import scam_interrupt, fingerprint, fraud_graph, counterfeit, fraud_shield
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NetraGuard AI", version="1.0.0", description="India's First AI Platform That Stops Digital Fraud Before the Money Moves")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(scam_interrupt.router)
app.include_router(fingerprint.router)
app.include_router(fraud_graph.router)
app.include_router(counterfeit.router)
app.include_router(fraud_shield.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to NetraGuard AI API"}

from pydantic import BaseModel

class UserSettings(BaseModel):
    emergency_contact: str

# Mock Database for Hackathon
MOCK_DB = {
    "user_123": {
        "emergency_contact": "919876543210"
    }
}

@app.get("/api/user/settings")
def get_user_settings():
    return MOCK_DB.get("user_123", {"emergency_contact": ""})

@app.post("/api/user/settings")
def update_user_settings(settings: UserSettings):
    MOCK_DB["user_123"] = {"emergency_contact": settings.emergency_contact}
    return {"status": "success", "data": MOCK_DB["user_123"]}

@app.get("/api/check-number/{phone_number}")
def check_number(phone_number: str):
    # Mock Blacklist
    blacklist = ["9876543210", "1234567890", "9999999999"]
    if phone_number in blacklist:
        return {"status": "scam", "risk_score": 95, "reason": "Reported 14 times for Digital Arrest impersonation."}
    else:
        return {"status": "safe", "risk_score": 12, "reason": "No recent scam reports found."}

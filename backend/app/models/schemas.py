from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Fingerprint schemas
class TranscriptRequest(BaseModel):
    transcript_text: str

class FingerprintResponse(BaseModel):
    tactics_detected: List[str]
    stage_classification: str
    signature_hash: str
    confidence_score: float

# Fraud Graph schemas
class FIRData(BaseModel):
    complaint_id: str
    victim_name: str
    scammer_phone: Optional[str]
    scammer_upi: Optional[str]
    amount_lost: float

class GraphNode(BaseModel):
    id: str
    group: int
    label: str

class GraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class GraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# Counterfeit schemas
class CounterfeitResponse(BaseModel):
    status: str # "Genuine" or "Counterfeit"
    confidence_score: float
    features_analyzed: List[str]
    flags: List[str]

# Fraud Shield schemas
class ShieldRequest(BaseModel):
    user_message: str
    language: str = "en"

class ShieldResponse(BaseModel):
    verdict: str # "SAFE", "SUSPICIOUS", "ACTIVE_FRAUD"
    reply_message: str
    next_steps: List[str]

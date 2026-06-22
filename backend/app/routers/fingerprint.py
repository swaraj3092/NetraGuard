from fastapi import APIRouter
from app.models.schemas import TranscriptRequest, FingerprintResponse
from app.services.ai_service import analyze_transcript_fingerprint

router = APIRouter(prefix="/api/fingerprint", tags=["Psychological Fingerprinter"])

@router.post("/analyze", response_model=FingerprintResponse)
def analyze_transcript(request: TranscriptRequest):
    """
    Analyzes a given scam transcript and returns the extracted tactics,
    stage classification, and a unique signature hash.
    """
    analysis = analyze_transcript_fingerprint(request.transcript_text)
    
    return FingerprintResponse(
        tactics_detected=analysis["tactics"],
        stage_classification=analysis["stage"],
        signature_hash=analysis["hash"],
        confidence_score=analysis["score"]
    )

from fastapi import APIRouter, UploadFile, File
from app.models.schemas import CounterfeitResponse
from app.services.ai_service import analyze_currency

router = APIRouter(prefix="/api/counterfeit", tags=["Counterfeit Detector"])

@router.post("/scan", response_model=CounterfeitResponse)
async def scan_currency(file: UploadFile = File(...)):
    """
    Accepts an image of a currency note and runs Computer Vision validation via Gemini.
    """
    content = await file.read()
    result = await analyze_currency(content)
    
    return CounterfeitResponse(
        status=result["status"],
        confidence_score=result["confidence_score"],
        features_analyzed=result["features_analyzed"],
        flags=result["flags"]
    )

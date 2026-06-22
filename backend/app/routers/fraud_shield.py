from fastapi import APIRouter
from app.models.schemas import ShieldRequest, ShieldResponse
from app.services.ai_service import get_fraud_shield_verdict

router = APIRouter(prefix="/webhook/whatsapp", tags=["Citizen Fraud Shield"])

@router.post("/", response_model=ShieldResponse)
def handle_whatsapp_message(request: ShieldRequest):
    """
    Webhook endpoint to receive messages from a WhatsApp Business API or IVR.
    Uses Multilingual LLM to assess the text and provide a verdict.
    """
    verdict_data = get_fraud_shield_verdict(request.user_message, request.language)
    
    return ShieldResponse(
        verdict=verdict_data["verdict"],
        reply_message=verdict_data["reply_message"],
        next_steps=verdict_data["next_steps"]
    )

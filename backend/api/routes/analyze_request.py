from fastapi import APIRouter, HTTPException
import uuid
from ...models.request_models import AnalyzeRequestPayload
from ...models.response_models import AnalyzeRequestResponse
from ...models.domain_models import Tier, Urgency

router = APIRouter()

from ...services.gemini_service import analyze_service_request

@router.post("/analyze-request", response_model=AnalyzeRequestResponse)
async def analyze_request(payload: AnalyzeRequestPayload):
    """
    Analyzes a client's problem description using AI (Gemini).
    Developer 3 owns the Gemini service implementation that plugs in here.
    """
    try:
        # 1. Generate a unique request ID
        request_id = f"req_{uuid.uuid4().hex[:8]}"
        
        # 2. Call Dev 3's Gemini Service
        analysis = analyze_service_request(
            message=payload.message,
            location=payload.location,
            property_type=payload.property_type
        )
        
        # 3. Return response using the Pydantic model
        return AnalyzeRequestResponse(
            request_id=request_id,
            **analysis
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze request: {str(e)}")

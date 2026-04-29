from fastapi import APIRouter, HTTPException
import uuid
from ...models.request_models import AnalyzeRequestPayload
from ...models.response_models import AnalyzeRequestResponse
from ...models.domain_models import Tier, Urgency

router = APIRouter()

@router.post("/analyze-request", response_model=AnalyzeRequestResponse)
async def analyze_request(payload: AnalyzeRequestPayload):
    """
    Analyzes a client's problem description using AI (Gemini).
    Developer 3 owns the Gemini service implementation that plugs in here.
    """
    try:
        # 1. Generate a unique request ID
        request_id = f"req_{uuid.uuid4().hex[:8]}"
        
        # 2. TODO (Dev 3): Call the Gemini Service here passing payload.message
        # e.g., result = await gemini_service.analyze(payload.message)
        
        # 3. For now, return a mock response matching the required schema
        return AnalyzeRequestResponse(
            request_id=request_id,
            service_category="Plumbing", # Mocked
            urgency=Urgency.HIGH, # Mocked
            estimated_complexity="Medium", # Mocked
            recommended_tier=Tier.PLUS, # Mocked
            problem_summary="Kitchen sink leak under cabinet", # Mocked
            client_facing_explanation="This should be handled soon to reduce water damage risk.", # Mocked
            contractor_summary="Client reports a kitchen sink leak under the cabinet with spreading water." # Mocked
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze request: {str(e)}")

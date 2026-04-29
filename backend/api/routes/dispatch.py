from fastapi import APIRouter, HTTPException
import uuid
from ...models.request_models import DispatchPayload
from ...models.response_models import DispatchResponse
from ...models.domain_models import Contractor, Tier

router = APIRouter()

@router.post("/dispatch", response_model=DispatchResponse)
async def dispatch_request(payload: DispatchPayload):
    """
    Runs the matching engine to find the best contractor for the request,
    simulates dispatching to them, and creates a booking.
    """
    try:
        # TODO: Load request data from DB
        # TODO: Load contractor data from Snowflake/mock data
        # TODO: Call matching_service to filter and rank contractors
        # TODO: Simulate pinging top contractor and them accepting
        
        # 1. Generate a booking ID
        booking_id = f"bkg_{uuid.uuid4().hex[:8]}"
        
        # 2. Mock a matched contractor for now
        matched_contractor = Contractor(
            contractor_id="con_mock_1",
            name="Alice Plumbing Co.",
            service_category="Plumbing",
            location="Toronto",
            tier=Tier.PLUS,
            five_star_review_count=120,
            acceptance_rate=0.95,
            distance_km=2.5
        )
        
        return DispatchResponse(
            booking_id=booking_id,
            contractor=matched_contractor,
            estimated_arrival_window="30-45 minutes",
            status="Dispatched"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Dispatch failed: {str(e)}")

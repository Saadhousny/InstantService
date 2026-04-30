from fastapi import APIRouter, HTTPException
import uuid
from ...models.request_models import DispatchPayload
from ...models.response_models import DispatchResponse
from ...models.domain_models import Contractor, Tier, Booking, BookingStatus, Urgency
from ...services.database import DatabaseService
from ...services.matching_service import MatchingService

router = APIRouter()

@router.post("/dispatch", response_model=DispatchResponse)
async def dispatch_request(payload: DispatchPayload):
    """
    Runs the matching engine to find the best contractor for the request,
    simulates dispatching to them, and creates a booking in Snowflake.
    """
    try:
        # 1. Load request data from Snowflake
        request_data = DatabaseService.get_service_request(payload.request_id)
        if not request_data:
            # Fallback for demo if not in DB
            category = "Plumbing"
            urgency = Urgency.HIGH
            client_id = "cli_demo_1"
            selected_tier = Tier.PLUS
        else:
            category = request_data["service_category"]
            urgency = Urgency(request_data["urgency"])
            client_id = request_data["client_id"]
            selected_tier = Tier(request_data["selected_tier"] or "Basic")

        # 2. Load all active contractors from Snowflake
        contractors = DatabaseService.get_all_contractors()
        
        # 3. Find the best match
        best_contractor = MatchingService.find_best_match(
            contractors=contractors,
            requested_tier=selected_tier,
            urgency=urgency,
            service_category=category
        )
        
        if not best_contractor:
            raise HTTPException(status_code=404, detail="No eligible contractors found for this request.")

        # 4. Create and save the booking
        booking_id = f"bkg_{uuid.uuid4().hex[:8]}"
        
        booking = Booking(
            booking_id=booking_id,
            request_id=payload.request_id,
            client_id=client_id,
            contractor_id=best_contractor.contractor_id,
            status=BookingStatus.DISPATCHED,
            selected_tier=selected_tier,
            estimated_arrival_window="30-45 minutes",
            premium_coverage=(selected_tier == Tier.PREMIUM)
        )
        
        # Save to Snowflake
        DatabaseService.save_booking(booking)
        
        return DispatchResponse(
            booking_id=booking_id,
            contractor=best_contractor,
            estimated_arrival_window="30-45 minutes",
            status="Dispatched"
        )
        
    except Exception as e:
        print(f"DISPATCH ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Dispatch failed: {str(e)}")

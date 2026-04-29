from fastapi import APIRouter, HTTPException
from ...models.request_models import SelectTierPayload
from ...models.response_models import SelectTierResponse

router = APIRouter()

@router.post("/select-tier", response_model=SelectTierResponse)
async def select_tier(payload: SelectTierPayload):
    """
    Saves the user's selected service tier for their request.
    """
    try:
        # TODO: Confirm request exists in DB/Memory
        
        # TODO: Validate tier is valid for the request's recommended tier (MVP rules)
        
        # TODO: Save selected tier to Snowflake or Memory state
        
        return SelectTierResponse(
            request_id=payload.request_id,
            status="success",
            selected_tier=payload.selected_tier
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save tier selection: {str(e)}")

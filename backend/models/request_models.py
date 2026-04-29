from pydantic import BaseModel
from typing import Optional
from .domain_models import Tier

class AnalyzeRequestPayload(BaseModel):
    client_id: str
    message: str
    location: str
    property_type: str

class SelectTierPayload(BaseModel):
    request_id: str
    selected_tier: Tier

class DispatchPayload(BaseModel):
    request_id: str
    # We might need location here if it wasn't saved, but assuming it's loaded from state

class CompleteBookingPayload(BaseModel):
    booking_id: str
    rating: int
    review: Optional[str] = None

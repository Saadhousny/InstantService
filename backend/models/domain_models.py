from enum import Enum
from pydantic import BaseModel
from typing import Optional, List

class Tier(str, Enum):
    BASIC = "Basic"
    PLUS = "Plus"
    PREMIUM = "Premium"

class Urgency(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    EMERGENCY = "Emergency"

class Contractor(BaseModel):
    contractor_id: str
    name: str
    service_category: str
    location: str
    tier: Tier
    five_star_review_count: int = 0
    acceptance_rate: float = 1.0  # 1.0 = 100%
    is_active: bool = True
    distance_km: float = 0.0 # Used for scoring

class BookingStatus(str, Enum):
    PENDING = "Pending"
    DISPATCHED = "Dispatched"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"

class Booking(BaseModel):
    booking_id: str
    request_id: str
    client_id: str
    contractor_id: str
    status: BookingStatus
    selected_tier: Tier
    estimated_arrival_window: str
    premium_coverage: bool = False
    rating: Optional[int] = None
    review: Optional[str] = None

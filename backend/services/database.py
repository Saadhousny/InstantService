import snowflake.connector
from ..config.settings import settings
from typing import List, Optional
from ..models.domain_models import Contractor, Booking

from ..services.snowflake_service import run_query, run_command

class DatabaseService:
    @staticmethod
    def get_connection():
        """
        Dev 4 built get_connection in snowflake_service.py. We don't need this stub anymore.
        """
        pass

    @staticmethod
    def get_all_contractors() -> List[Contractor]:
        if settings.mock_mode:
            return []
        
        query = "SELECT * FROM CONTRACTORS WHERE ACTIVE_STATUS = 'Active'"
        rows = run_query(query)
        
        contractors = []
        for row in rows:
            # Map Snowflake columns (uppercase dict keys) to Pydantic Contractor
            contractors.append(Contractor(
                id=row["CONTRACTOR_ID"],
                name=row["FULL_NAME"],
                tier=row["TIER"],
                acceptance_rate=(row["ACCEPTED_REQUESTS"] / max(row["TOTAL_REQUESTS_PINGED"], 1)),
                five_star_reviews=row["FIVE_STAR_REVIEW_COUNT"],
                total_reviews=row["FIVE_STAR_REVIEW_COUNT"], # Simplified mapping
                distance_km=0.0 # Calculate distance later if needed
            ))
        return contractors

    @staticmethod
    def save_booking(booking: Booking):
        if settings.mock_mode:
            return
            
        query = """
        MERGE INTO BOOKINGS target
        USING (SELECT %s AS id) source
        ON target.BOOKING_ID = source.id
        WHEN MATCHED THEN
            UPDATE SET 
                STATUS = %s,
                COMPLETED_AT = %s
        WHEN NOT MATCHED THEN
            INSERT (BOOKING_ID, REQUEST_ID, CLIENT_ID, CONTRACTOR_ID, SERVICE_CATEGORY, TIER_SELECTED, PROBLEM_SUMMARY, URGENCY, STATUS, SCHEDULED_WINDOW, PREMIUM_COVERAGE)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        # Determine values for the query based on whether it's an update or insert
        params = [
            booking.booking_id,
            booking.status,
            booking.completed_at if hasattr(booking, 'completed_at') else None,
            booking.booking_id,
            booking.request_id,
            booking.client_id,
            booking.contractor_id,
            booking.service_category,
            booking.tier_selected,
            booking.problem_summary,
            booking.urgency,
            booking.status,
            booking.scheduled_window,
            booking.premium_coverage
        ]
        
        run_command(query, params)
        
    @staticmethod
    def save_tier_selection(request_id: str, tier_name: str):
        if settings.mock_mode:
            return
            
        query = "UPDATE SERVICE_REQUESTS SET SELECTED_TIER = %s WHERE REQUEST_ID = %s"
        params = [tier_name, request_id]
        
        run_command(query, params)

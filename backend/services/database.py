import snowflake.connector
from ..config.settings import settings
from typing import List, Optional
from ..models.domain_models import Contractor, Booking

class DatabaseService:
    @staticmethod
    def get_connection():
        """
        Establishes a connection to Snowflake.
        Developer 4: You will use this in your SQL execution methods.
        """
        # If in mock mode, return None or a mock connection
        if settings.mock_mode:
            return None
            
        return snowflake.connector.connect(
            user=settings.snowflake_user,
            password=settings.snowflake_password,
            account=settings.snowflake_account,
            warehouse=settings.snowflake_warehouse,
            database=settings.snowflake_database,
            schema=settings.snowflake_schema
        )

    # --- Stubs for Developer 4 (Persistence) ---

    @staticmethod
    def get_all_contractors() -> List[Contractor]:
        """
        Dev 4: Implement SQL to SELECT all active contractors from Snowflake.
        """
        if settings.mock_mode:
            # Mock data for Dev 2 routing
            return []
        
        # conn = DatabaseService.get_connection()
        # cursor = conn.cursor()
        # cursor.execute("SELECT ...")
        pass

    @staticmethod
    def save_booking(booking: Booking):
        """
        Dev 4: Implement SQL to INSERT or UPDATE a booking in Snowflake.
        """
        if settings.mock_mode:
            return
            
        pass
        
    @staticmethod
    def save_tier_selection(request_id: str, tier_name: str):
        """
        Dev 4: Implement SQL to UPDATE a request's tier in Snowflake.
        """
        if settings.mock_mode:
            return
            
        pass

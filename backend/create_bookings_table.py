from services.snowflake_service import run_command

def create_bookings_table():
    print("Creating BOOKINGS table in Snowflake...")

    query = """
    CREATE TABLE IF NOT EXISTS BOOKINGS (
        BOOKING_ID STRING PRIMARY KEY,
        REQUEST_ID STRING,
        CLIENT_ID STRING,
        CONTRACTOR_ID STRING,
        STATUS STRING,
        TIER_SELECTED STRING,
        SCHEDULED_WINDOW STRING,
        PREMIUM_COVERAGE BOOLEAN,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
    )
    """

    try:
        run_command(query)
        print("BOOKINGS table created successfully!")
    except Exception as e:
        print(f"Failed to create BOOKINGS table: {e}")

if __name__ == "__main__":
    create_bookings_table()

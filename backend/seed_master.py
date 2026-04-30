from services.snowflake_service import run_command
import uuid

CATEGORIES = [
    "HVAC", "Lawn Maintenance", "Painting", "Car Maintenance", 
    "TV Mounting", "General Handyman", "Residential Maintenance", 
    "Commercial Maintenance"
]

def seed_all():
    print("Seeding ALL remaining categories into Snowflake...")
    
    for cat in CATEGORIES:
        print(f"--- Seeding {cat} ---")
        contractors = [
            {"name": f"Expert {cat} 1", "tier": "Basic"},
            {"name": f"Expert {cat} 2", "tier": "Plus"},
            {"name": f"Expert {cat} 3", "tier": "Premium"},
        ]
        
        for c in contractors:
            query = """
            INSERT INTO CONTRACTORS (
                CONTRACTOR_ID, FULL_NAME, BUSINESS_NAME, TIER, 
                SERVICE_CATEGORY, LOCATION, RATING_AVERAGE, 
                FIVE_STAR_REVIEW_COUNT, ACCEPTED_REQUESTS, TOTAL_REQUESTS_PINGED, 
                AVAILABILITY_STATUS, ACTIVE_STATUS
            ) VALUES (%s, %s, %s, %s, %s, 'Toronto', 4.8, 50, 100, 110, 'Available', 'Active')
            """
            params = [
                f"cont_{uuid.uuid4().hex[:6]}", 
                c["name"], 
                f"{c['name']} Solutions", 
                c["tier"],
                cat
            ]
            run_command(query, params)
        print(f"Added 3 workers for {cat}")

if __name__ == "__main__":
    seed_all()

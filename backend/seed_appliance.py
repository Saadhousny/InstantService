from services.snowflake_service import run_command
import uuid

def seed_appliance_contractors():
    print("Seeding Appliance Repair contractors into Snowflake...")
    
    contractors = [
        {
            "id": f"cont_{uuid.uuid4().hex[:6]}",
            "name": "David Miller",
            "business": "Miller Appliance Pro",
            "tier": "Basic",
            "category": "Appliance Repair",
            "location": "Toronto",
            "rating": 4.5,
            "reviews": 45,
            "accepted": 120,
            "pinged": 150
        },
        {
            "id": f"cont_{uuid.uuid4().hex[:6]}",
            "name": "Sarah Chen",
            "business": "Elite Fix & Repair",
            "tier": "Plus",
            "category": "Appliance Repair",
            "location": "Toronto",
            "rating": 4.9,
            "reviews": 89,
            "accepted": 210,
            "pinged": 215
        },
        {
            "id": f"cont_{uuid.uuid4().hex[:6]}",
            "name": "Robert Ross",
            "business": "Ross Premium Services",
            "tier": "Premium",
            "category": "Appliance Repair",
            "location": "Toronto",
            "rating": 5.0,
            "reviews": 150,
            "accepted": 400,
            "pinged": 405
        }
    ]
    
    for c in contractors:
        query = """
        INSERT INTO CONTRACTORS (
            CONTRACTOR_ID, FULL_NAME, BUSINESS_NAME, TIER, 
            SERVICE_CATEGORY, LOCATION, RATING_AVERAGE, 
            FIVE_STAR_REVIEW_COUNT, ACCEPTED_REQUESTS, TOTAL_REQUESTS_PINGED, 
            AVAILABILITY_STATUS, ACTIVE_STATUS
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'Available', 'Active')
        """
        params = [
            c["id"], c["name"], c["business"], c["tier"],
            c["category"], c["location"], c["rating"],
            c["reviews"], c["accepted"], c["pinged"]
        ]
        
        try:
            run_command(query, params)
            print(f"Added {c['name']} ({c['business']})")
        except Exception as e:
            print(f"Failed to add {c['name']}: {e}")

if __name__ == "__main__":
    seed_appliance_contractors()

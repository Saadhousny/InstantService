import sys
import os
import json

# Add the backend directory to sys.path
backend_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(backend_path)

from services.snowflake_service import run_query

def view_database():
    print("--- SNOWFLAKE DATABASE VIEW ---\n")
    
    try:
        # 1. View Contractors
        print("TABLE: CONTRACTORS")
        contractors = run_query("SELECT CONTRACTOR_ID, FULL_NAME, TIER, SERVICE_CATEGORY, ACTIVE_STATUS FROM CONTRACTORS LIMIT 10")
        if contractors:
            for c in contractors:
                print(f"  ID: {c['CONTRACTOR_ID']} | Name: {c['FULL_NAME']} | Tier: {c['TIER']} | Category: {c['SERVICE_CATEGORY']}")
        else:
            print("  (Empty)")
            
        # 2. View Recent Bookings
        print("\nTABLE: BOOKINGS (Recent)")
        bookings = run_query("SELECT BOOKING_ID, CONTRACTOR_ID, SERVICE_CATEGORY, TIER_SELECTED, STATUS, CREATED_AT FROM BOOKINGS ORDER BY CREATED_AT DESC LIMIT 5")
        if bookings:
            for b in bookings:
                print(f"  ID: {b['BOOKING_ID']} | Contractor: {b['CONTRACTOR_ID']} | Status: {b['STATUS']} | Time: {b['CREATED_AT']}")
        else:
            print("  (No bookings yet)")
            
        # 3. View Service Requests
        print("\nTABLE: SERVICE_REQUESTS (Recent)")
        requests = run_query("SELECT REQUEST_ID, SERVICE_CATEGORY, PROBLEM_SUMMARY, URGENCY FROM SERVICE_REQUESTS ORDER BY CREATED_AT DESC LIMIT 5")
        if requests:
            for r in requests:
                print(f"  ID: {r['REQUEST_ID']} | Category: {r['SERVICE_CATEGORY']} | Summary: {r['PROBLEM_SUMMARY']} | Urgency: {r['URGENCY']}")
        else:
            print("  (No requests yet)")

    except Exception as e:
        print(f"ERROR reading database: {str(e)}")

if __name__ == "__main__":
    view_database()

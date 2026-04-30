import sys
import os

# Add the backend directory to sys.path
backend_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(backend_path)

from services.snowflake_service import run_query

def test_connection():
    print("Testing Snowflake connection...")
    try:
        # Try a simple query
        result = run_query("SELECT CURRENT_VERSION()")
        if result:
            print(f"SUCCESS! Connected to Snowflake. Version: {result[0]['CURRENT_VERSION()']}")
        else:
            print("Connected, but query returned no results.")
    except Exception as e:
        print(f"FAILED to connect: {str(e)}")

if __name__ == "__main__":
    test_connection()

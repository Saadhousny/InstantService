import sys
import os

# Make sure Python can find the backend package
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from backend.services.gemini_service import analyze_service_request

print("Testing Gemini AI...\n")

result = analyze_service_request(
    "My bathroom sink is leaking and water is pooling under the cabinet.",
    location="Toronto",
    property_type="Residential"
)

print("=== RESULT ===")
for key, value in result.items():
    print(f"{key}: {value}")

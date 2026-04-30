# backend/test_gemini.py
from backend.services.gemini_service import analyze_service_request

# Primary demo scenario
result = analyze_service_request(
    "My bathroom sink is leaking and water is pooling under the cabinet.",
    location="Toronto",
    property_type="Residential"
)
print(result)
# Expected: service_category=Plumbing, urgency=High, recommended_tier=Plus.

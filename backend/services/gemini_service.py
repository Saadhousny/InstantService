def analyze_service_request(message: str, location: str, property_type: str) -> dict:
    """
    Dev 3: Implement your Gemini prompt and API call here.
    Return a dictionary that matches the AnalyzeRequestResponse schema.
    """
    # Stub returning mock data so the app doesn't crash while Dev 3 builds this
    return {
        "service_category": "Plumbing",
        "urgency": "High",
        "estimated_complexity": "Medium",
        "recommended_tier": "Plus",
        "problem_summary": "Kitchen sink leak under cabinet",
        "client_facing_explanation": "This should be handled soon to reduce water damage risk.",
        "contractor_summary": "Client reports a kitchen sink leak under the cabinet with spreading water."
    }

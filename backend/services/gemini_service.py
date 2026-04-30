import os
import json
import re
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent"

ALLOWED_CATEGORIES = [
    "Plumbing", "Electrical", "HVAC", "Lawn Maintenance",
    "Painting", "Appliance Repair", "Car Maintenance",
    "TV Mounting", "General Handyman", "Residential Maintenance",
    "Commercial Maintenance"
]

FALLBACK_RESPONSE = {
    "service_category": "General Handyman",
    "problem_summary": "Client needs help with a service issue.",
    "urgency": "Medium",
    "property_type": "Unknown",
    "estimated_complexity": "Medium",
    "recommended_tier": "Basic",
    "client_facing_explanation": "We could not fully analyze the request, but we can still dispatch a general service provider.",
    "contractor_summary": "Client submitted a service request requiring manual review."
}

PROMPT = """You are the AI dispatcher for InstantService. A client described a problem. Return ONLY valid JSON, no markdown, no extra text.

Required fields: service_category, problem_summary, urgency, property_type, estimated_complexity, recommended_tier, client_facing_explanation, contractor_summary

service_category must be one of: Plumbing, Electrical, HVAC, Lawn Maintenance, Painting, Appliance Repair, Car Maintenance, TV Mounting, General Handyman, Residential Maintenance, Commercial Maintenance
urgency must be one of: Low, Medium, High
estimated_complexity must be one of: Low, Medium, High
recommended_tier must be one of: Basic, Plus, Premium
property_type must be one of: Residential, Commercial, Unknown

Client message: {message}
Location: {location}
Property type: {property_type}"""

def analyze_message(message):
    is_demo = os.getenv("DEMO_MODE", "").lower() == "true"
    has_no_key = not os.getenv("GEMINI_API_KEY")

    if is_demo and has_no_key:
        msg_content = message.lower()
        # Expanded keywords for a smoother demo
        if any(word in msg_content for word in ["sink", "plumb", "leak", "faucet"]):
            return {
                "service_category": "Plumbing",
                "problem_summary": "Bathroom sink leak with water pooling under cabinet",
                "urgency": "High",
                "property_type": "Residential",
                "estimated_complexity": "Medium",
                "recommended_tier": "Plus",
                "client_facing_explanation": "This is a plumbing issue that should be handled soon to prevent water damage.",
                "contractor_summary": "Check drain connections and supply lines."
            }
        return FALLBACK_RESPONSE.copy()
    
def analyze_service_request(message, location="Unknown", property_type="Unknown"):
    try:
        prompt = PROMPT.format(message=message, location=location, property_type=property_type)
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }
        response = requests.post(
            GEMINI_URL,
            params={"key": GEMINI_API_KEY},
            json=payload,
            timeout=15
        )
        raw = response.json()
        raw_text = raw["candidates"][0]["content"]["parts"][0]["text"].strip()
        print("RAW GEMINI:", raw_text)
        raw_text = re.sub(r"^{3}json\s*", "", raw_text)
        raw_text = re.sub(r"{3}$", "", raw_text).strip()
        parsed = json.loads(raw_text)
        return _validate(parsed)
    except json.JSONDecodeError:
        try:
            match = re.search(r"\{.*\}", raw_text, re.DOTALL)
            if match:
                return _validate(json.loads(match.group()))
        except Exception:
            pass
        return FALLBACK_RESPONSE.copy()
    except Exception as e:
        print("Gemini error:", e)
        return FALLBACK_RESPONSE.copy()


def _validate(data):
    result = FALLBACK_RESPONSE.copy()
    if data.get("service_category") in ALLOWED_CATEGORIES:
        result["service_category"] = data["service_category"]
    if data.get("urgency") in ["Low", "Medium", "High"]:
        result["urgency"] = data["urgency"]
    if data.get("estimated_complexity") in ["Low", "Medium", "High"]:
        result["estimated_complexity"] = data["estimated_complexity"]
    if data.get("recommended_tier") in ["Basic", "Plus", "Premium"]:
        result["recommended_tier"] = data["recommended_tier"]
    if data.get("property_type") in ["Residential", "Commercial", "Unknown"]:
        result["property_type"] = data["property_type"]
    for field in ["problem_summary", "client_facing_explanation", "contractor_summary"]:
        if isinstance(data.get(field), str) and data[field].strip():
            result[field] = data[field].strip()[:500]
    return result


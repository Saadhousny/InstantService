# backend/test_elevenlabs.py
from backend.services.elevenlabs_service import build_confirmation_text, generate_voice_confirmation

text = build_confirmation_text(
    tier="Plus",
    service_category="Plumbing",
    contractor_name="Apex Plumbing Services",
    arrival_window="2:00 PM - 3:00 PM"
)
print("Text:", text)

result = generate_voice_confirmation(text)
print("Status:", result["voice_status"])
# If voice_status == "generated", you have a base64 audio string ready

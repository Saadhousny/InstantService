# backend/test_elevenlabs.py
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from backend.services.elevenlabs_service import (
    build_confirmation_text,
    generate_voice_confirmation,
    save_audio_base64_to_file,
)

text = build_confirmation_text(
    tier="Plus",
    service_category="Plumbing",
    contractor_name="Apex Plumbing Services",
    arrival_window="2:00 PM - 3:00 PM"
)
print("Text:", text)

result = generate_voice_confirmation(text)
print("Status:", result["voice_status"])

if result["voice_status"] == "generated" and result["audio_base64"]:
    file_path = save_audio_base64_to_file(
        result["audio_base64"],
        "backend/services/voice_confirmation.mp3",
    )
    print("Saved audio file:", file_path)
else:
    print("Fallback text:", result["fallback_text"])

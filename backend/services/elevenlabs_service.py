from typing import Optional

def build_confirmation_text(
    tier: Optional[str] = None,
    service_category: Optional[str] = None,
    contractor_name: Optional[str] = None,
    arrival_window: Optional[str] = None,
    premium_coverage: Optional[bool] = False
) -> str:
    """
    Dev 3: Implement your logic to build a text string that ElevenLabs will read.
    """
    return f"Your {tier} {service_category} contractor, {contractor_name}, will arrive in {arrival_window}."

def generate_voice_confirmation(text: str) -> dict:
    """
    Dev 3: Implement your ElevenLabs API call here.
    Return a dictionary with audio_base64, voice_status, and fallback_text.
    """
    # Stub returning mock data
    return {
        "audio_base64": None,  # Set to a mock base64 string if you want to test audio
        "voice_status": "Success",
        "fallback_text": text
    }

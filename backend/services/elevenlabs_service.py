<<<<<<< HEAD
# backend/services/elevenlabs_service.py
import os
import requests
import base64
from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # default Rachel voice
ELEVENLABS_API_URL = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}"


def build_confirmation_text(
    tier: str,
    service_category: str,
    contractor_name: str,
    arrival_window: str,
    premium_coverage: bool = False
) -> str:
    """Build the voice confirmation text from booking details."""
    
    if tier == "Premium" and premium_coverage:
        return (
            f"Your Premium {service_category} service has been booked with {contractor_name}. "
            f"Premium Coverage is active for this booking. "
            f"Your contractor is expected to arrive between {arrival_window}."
        )
    
    return (
        f"Your {tier} {service_category} service has been booked with {contractor_name}. "
        f"Your contractor is expected to arrive between {arrival_window}."
    )


def generate_voice_confirmation(text: str) -> dict:
    """Send text to ElevenLabs and return audio as base64 string."""
    
    # Demo mode fallback - return mock if key is missing
    if not ELEVENLABS_API_KEY:
        return {
            "audio_base64": None,
            "voice_status": "unavailable",
            "fallback_text": text
        }
    
    try:
        headers = {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
        }
        payload = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75
            }
        }
        
        response = requests.post(
            ELEVENLABS_API_URL,
            headers=headers,
            json=payload,
            timeout=15
        )
        
        if response.status_code == 200:
            audio_base64 = base64.b64encode(response.content).decode("utf-8")
            return {
                "audio_base64": audio_base64,
                "voice_status": "generated",
                "fallback_text": text
            }
        else:
            return {
                "audio_base64": None,
                "voice_status": "unavailable",
                "fallback_text": text
            }
    
    except requests.Timeout:
        return {
            "audio_base64": None,
            "voice_status": "unavailable",
            "fallback_text": text
        }
    except Exception:
        return {
            "audio_base64": None,
            "voice_status": "unavailable",
            "fallback_text": text
        }
    
=======
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
>>>>>>> 5c0595297bd8cbd4491bfaeb1f5756e5636dd47f

import requests
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

payload = {
    "contents": [{"parts": [{"text": "Say hello in JSON like this: {\"message\": \"hello\"}"}]}]
}

response = requests.post(
    GEMINI_URL,
    params={"key": GEMINI_API_KEY},
    json=payload,
    timeout=15
)

print("STATUS:", response.status_code)
print("BODY:", response.json())

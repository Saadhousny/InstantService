import requests
import os
from dotenv import load_dotenv
import json

load_dotenv('backend/.env')
key = os.getenv('GEMINI_API_KEY')
print("Key length:", len(key) if key else 0)

url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
payload = {'contents': [{'parts': [{'text': 'Test'}]}]}
response = requests.post(url, params={'key': key}, json=payload)

with open("backend/gemini_error.json", "w") as f:
    json.dump(response.json(), f, indent=2)

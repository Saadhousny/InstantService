import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Core Settings
    mock_mode: bool = os.getenv("MOCK_MODE", "true").lower() == "true"
    demo_mode: bool = os.getenv("DEMO_MODE", "true").lower() == "true"
    
    # AI & Voice
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    elevenlabs_api_key: str = os.getenv("ELEVENLABS_API_KEY", "")
    elevenlabs_voice_id: str = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")
    elevenlabs_agent_id: str = os.getenv("NEXT_PUBLIC_ELEVENLABS_AGENT_ID", "")
    
    # Snowflake
    snowflake_account: str = os.getenv("SNOWFLAKE_ACCOUNT", "")
    snowflake_user: str = os.getenv("SNOWFLAKE_USER", "")
    snowflake_password: str = os.getenv("SNOWFLAKE_PASSWORD", "")
    snowflake_warehouse: str = os.getenv("SNOWFLAKE_WAREHOUSE", "COMPUTE_WH")
    snowflake_database: str = os.getenv("SNOWFLAKE_DATABASE", "INSTANTSERVICE_DB")
    snowflake_schema: str = os.getenv("SNOWFLAKE_SCHEMA", "PUBLIC")
    
    # API
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "InstantService Backend"
    
    # We will need these later, but setting them up now
    gemini_api_key: Optional[str] = None
    
    # Snowflake configs (for Dev 4)
    snowflake_user: Optional[str] = None
    snowflake_password: Optional[str] = None
    snowflake_account: Optional[str] = None
    snowflake_warehouse: Optional[str] = None
    snowflake_database: Optional[str] = None
    snowflake_schema: Optional[str] = None
    
    # If true, use mock data instead of real DB calls for demo reliability
    mock_mode: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()

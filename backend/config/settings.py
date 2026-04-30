from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    app_name: str = "InstantService Backend"

    gemini_api_key: Optional[str] = None
    elevenlabs_api_key: Optional[str] = None

    snowflake_user: Optional[str] = None
    snowflake_password: Optional[str] = None
    snowflake_account: Optional[str] = None
    snowflake_warehouse: Optional[str] = None
    snowflake_database: Optional[str] = None
    snowflake_schema: Optional[str] = None

    mock_mode: bool = True

    model_config = SettingsConfigDict(env_file=str(Path(__file__).resolve().parent.parent / ".env"), env_file_encoding="utf-8")


settings = Settings()

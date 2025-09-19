import os
from functools import lru_cache
from dotenv import load_dotenv


load_dotenv()


class Settings:
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./backend.db")
    enable_pyoqs: bool = os.getenv("ENABLE_PYOQS", "false").lower() in {"1", "true", "yes"}
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY")
    hf_disable: bool = os.getenv("HF_DISABLE", "false").lower() in {"1", "true", "yes"}
    cors_allow_origins: list[str] = os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
    keys_dir: str = os.getenv("KEYS_DIR", os.path.join("backend", "keys"))


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()



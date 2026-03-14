from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings and environment variables."""
    
    # AI Provider Selection
    AI_PROVIDER: str = "openai"  # openai, groq, huggingface, ollama
    
    # API Keys
    OPENAI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    HUGGINGFACE_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    
    # Server Config
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:3001"]
    
    # Vector DB
    VECTOR_DB_PATH: str = "./data/vector_db"
    
    # Model Config
    MODEL_NAME: str = "gpt-3.5-turbo"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    
    # Portfolio Config
    PORTFOLIO_NAME: str = "Ajay's Portfolio"
    OWNER_NAME: str = "Ajay"
    GITHUB_USERNAME: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

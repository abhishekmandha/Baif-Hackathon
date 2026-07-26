import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(dotenv_path=ROOT_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./baif_translation.db")
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "100"))
SUPPORTED_CONTENT_TYPES = [
    "video/mp4",
    "video/x-matroska",
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "text/plain",
]

import os
from pathlib import Path
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

root_dir = Path(__file__).resolve().parents[2]
load_dotenv(dotenv_path=root_dir / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./baif_translation.db")

engine_args = {
    "future": True,
    "echo": False,  # Set to True for SQL debugging
    "pool_pre_ping": True,  # Verify connections are alive before using
}

# Add PostgreSQL-specific arguments only if using a postgresql URL
if DATABASE_URL and DATABASE_URL.startswith("postgresql"):
    engine_args.update({
        "pool_size": 10,
        "max_overflow": 20,
        "pool_recycle": 3600,
        "connect_args": {"connect_timeout": 10},
    })

# Create engine with production-ready settings
engine = create_engine(DATABASE_URL, **engine_args)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    future=True,
)

Base = declarative_base()


def init_db() -> None:
    """Initialize database tables."""
    from .orm_models import User
    Base.metadata.create_all(bind=engine)

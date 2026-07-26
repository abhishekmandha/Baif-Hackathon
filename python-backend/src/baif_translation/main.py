from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import init_db
from .routes_auth import router as auth_router
from .routes_download import router as download_router
from .routes_history import router as history_router
from .routes_jobs import router as jobs_router
from .routes_upload import router as upload_router
from .users import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database and application resources on startup."""
    try:
        init_db()
        print("✓ Database initialized successfully")
    except Exception as e:
        print(f"✗ Database initialization failed: {e}")
    yield
    print("Application shutdown")


init_db()


app = FastAPI(
    title="BAIF Translation Platform API",
    description="Backend API scaffold for video and audio translation jobs.",
    version="0.1.0",
    lifespan=lifespan,
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8080",
        "http://192.168.1.10:3000",
        "http://192.168.1.10:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(download_router, prefix="/api")
app.include_router(history_router, prefix="/api")
app.include_router(users_router, prefix="/api")


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "BAIF Translation Platform API"}

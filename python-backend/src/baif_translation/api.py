from fastapi import APIRouter

from .routes_jobs import router as jobs_router
from .routes_upload import router as upload_router

router = APIRouter()

router.include_router(upload_router)
router.include_router(jobs_router)

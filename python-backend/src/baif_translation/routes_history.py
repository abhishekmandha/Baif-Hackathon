from fastapi import APIRouter

from .core.job_manager import job_store

router = APIRouter()


@router.get('/history')
def get_history():
    return {'jobs': [job.model_dump() for job in job_store.list_jobs()]}

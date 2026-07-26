from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .core.job_manager import job_store
from .models import Job

router = APIRouter()


class JobListResponse(BaseModel):
    jobs: List[Job]


@router.get('/jobs', response_model=JobListResponse)
def list_jobs():
    return JobListResponse(jobs=job_store.list_jobs())


@router.get('/jobs/{job_id}', response_model=Job)
def get_job(job_id: str):
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail='Job not found')
    return job

from fastapi import APIRouter, HTTPException

from .core.job_manager import job_store

router = APIRouter()


@router.get('/download/{job_id}')
def download_output(job_id: str):
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail='Job not found')
    return {
        'job_id': job.id,
        'message': 'Download endpoint ready',
        'available_outputs': [o.value for o in job.output_formats],
    }

from threading import Lock
from typing import Dict, List, Optional
from uuid import uuid4

from ..models import Job, JobStatus, OutputFormats


class InMemoryJobStore:
    """Small in-memory job store used by the current API scaffold."""

    def __init__(self) -> None:
        self._jobs: Dict[str, Job] = {}
        self._lock = Lock()

    def create_job(
        self,
        *,
        file_name: str,
        source_language: str,
        target_language: str,
        output_formats: Optional[List[OutputFormats]] = None,
    ) -> Job:
        job = Job(
            id=str(uuid4()),
            file_name=file_name,
            source_language=source_language,
            target_language=target_language,
            status=JobStatus.queued,
            progress=0,
            output_formats=output_formats or [OutputFormats.txt, OutputFormats.audio],
        )
        with self._lock:
            self._jobs[job.id] = job
        return job

    def list_jobs(self) -> List[Job]:
        with self._lock:
            return list(self._jobs.values())

    def get_job(self, job_id: str) -> Optional[Job]:
        with self._lock:
            return self._jobs.get(job_id)

    def update_job(self, job_id: str, **kwargs) -> Optional[Job]:
        with self._lock:
            job = self._jobs.get(job_id)
            if not job:
                return None
            for key, value in kwargs.items():
                if hasattr(job, key):
                    setattr(job, key, value)
            return job


job_store = InMemoryJobStore()

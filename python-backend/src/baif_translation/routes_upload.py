from typing import List, Optional, Sequence

from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel

from .core.file_validator import validate_upload_file
from .core.job_manager import job_store
from .models import OutputFormats

router = APIRouter()


class UploadResponse(BaseModel):
    job_id: str
    message: str


@router.post('/upload', response_model=UploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    source_language: str = Form('Hindi (auto-detect)'),
    target_language: str = Form('Marathi'),
    output_formats: Optional[object] = Form(default=None),
):
    validate_upload_file(file)

    normalized_formats = _normalize_output_formats(output_formats)
    job = job_store.create_job(
        file_name=file.filename or 'unknown',
        source_language=source_language,
        target_language=target_language,
        output_formats=normalized_formats,
    )
    return UploadResponse(job_id=job.id, message='Upload received successfully')


def _normalize_output_formats(output_formats: Optional[object]) -> List[OutputFormats]:
    if not output_formats:
        return [OutputFormats.txt, OutputFormats.audio, OutputFormats.srt, OutputFormats.video]

    if isinstance(output_formats, str):
        output_formats = [output_formats]
    elif isinstance(output_formats, (list, tuple, set)):
        output_formats = list(output_formats)
    else:
        output_formats = [str(output_formats)]

    normalized: List[OutputFormats] = []
    for value in output_formats:
        if not value:
            continue
        try:
            normalized.append(OutputFormats(str(value)))
        except ValueError:
            continue
    return normalized or [OutputFormats.txt, OutputFormats.audio]

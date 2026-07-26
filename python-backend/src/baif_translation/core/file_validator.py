from typing import Optional, Sequence

from fastapi import HTTPException, UploadFile

from ..config import MAX_FILE_SIZE_MB, SUPPORTED_CONTENT_TYPES


def validate_upload_file(
    file: UploadFile,
    allowed_types: Optional[Sequence[str]] = None,
) -> None:
    """Validate uploaded file type and size before job creation."""
    allowed = list(allowed_types or SUPPORTED_CONTENT_TYPES)

    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if file.size is not None and file.size > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large")

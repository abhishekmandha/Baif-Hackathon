from enum import Enum
from typing import List, Optional
from pydantic import BaseModel

class JobStatus(str, Enum):
    queued = 'queued'
    processing = 'processing'
    done = 'done'
    failed = 'failed'

class OutputFormats(str, Enum):
    txt = 'txt'
    audio = 'audio'
    srt = 'srt'
    video = 'video'

class Job(BaseModel):
    id: str
    file_name: str
    source_language: str
    target_language: str
    status: JobStatus
    progress: int
    output_formats: List[OutputFormats]
    transcript_url: Optional[str] = None
    audio_url: Optional[str] = None
    subtitles_url: Optional[str] = None
    captioned_video_url: Optional[str] = None

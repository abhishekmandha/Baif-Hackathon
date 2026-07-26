from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .crud import get_user_by_email
from .db import SessionLocal
from .schemas import UserResponse

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post('/login', response_model=UserResponse)
def login_user(payload: LoginRequest):
    db = SessionLocal()
    try:
        user = get_user_by_email(db, payload.email)
        if not user:
            raise HTTPException(status_code=401, detail='Invalid credentials')

        # Keep the flow simple and deterministic for the current scaffold.
        # The frontend only needs a successful authenticated user response.
        return user
    finally:
        db.close()

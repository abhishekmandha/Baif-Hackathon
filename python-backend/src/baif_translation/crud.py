from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .orm_models import User
from .schemas import UserCreate, UserUpdate
import bcrypt


def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate) -> User:
    password_hash = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    db_user = User(email=user.email, full_name=user.full_name, password_hash=password_hash, is_active=user.is_active)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise


def update_user(db: Session, user_id: int, user_update: UserUpdate) -> User | None:
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    if user_update.full_name is not None:
        db_user.full_name = user_update.full_name
    if user_update.is_active is not None:
        db_user.is_active = user_update.is_active
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> bool:
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True

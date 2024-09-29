from sqlalchemy.orm import Session

from database.db import get_db
from models.user_model import User
from schemas.user_schema import UserLoginResponse, UserLogin


def login_user(user:UserLogin) -> UserLoginResponse:
    db: Session = next(get_db())
    user_details = db.query(User).filter(User.email == user.email).first()
    return UserLoginResponse(id=user_details.id, name=user_details.name, role=user_details.role, message="User logged in successfully")
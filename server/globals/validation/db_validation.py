import bcrypt
from sqlalchemy.orm import Session

from database.db import get_db
from models.user_model import User

def existing_user_validation(email: str):
    db: Session = next(get_db())
    return db.query(User).filter(User.email == email).first()

def matching_password_check(login_password: str, db_password: str):
    return bcrypt.checkpw(login_password.encode('utf-8'), db_password.encode('utf-8'))
from sqlalchemy.orm import Session

from models.user_model import User


def user_validation(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()

# def matching_password_check(password: str, db: Session):
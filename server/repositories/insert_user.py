from typing import Optional, Union

from sqlalchemy.orm import Session

from database.db import get_db
from models.menti_model import Menti
from models.mentor_model import Mentor


def insert_user(user: Union[Mentor, Menti]) -> Optional[int]:
    db: Session = next(get_db())
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user.id
    except Exception as e:
        print(e)
        db.rollback()
        return None
    finally:
        db.close()

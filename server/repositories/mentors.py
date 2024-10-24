from sqlalchemy.orm import Session

from database.db import get_db
from mappers.get_all_mappers import mentor_mapper
from models.mentor_model import Mentor


def get_mentors():
    db: Session = next(get_db())
    mentors = db.query(Mentor).all()
    return mentor_mapper(mentors)

from sqlalchemy.orm import Session, aliased

from database.db import get_db
from mappers.get_all_mappers import mentis_mapper
from models.menti_model import Menti
from models.mentor_model import Mentor


def get_mentis():
    db: Session = next(get_db())
    mentor_alias = aliased(Mentor)
    mentis = db.query(Menti, mentor_alias.name).outerjoin(mentor_alias, Menti.mentor_id == mentor_alias.id).all()
    return mentis_mapper(mentis)
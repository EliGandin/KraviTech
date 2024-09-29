from typing import Optional

from models.menti_model import Menti
from models.mentor_model import Mentor
from models.utils.user_util import hash_password
from repositories.insert_user import insert_user
from schemas.menti_schema import MentiCreate
from schemas.mentor_schema import MentorCreate


def create_mentor(mentor: MentorCreate) -> Optional[int]:
    new_mentor = Mentor(
        name=mentor.name,
        email=mentor.email,
        phone_number=mentor.phone_number,
        password=hash_password(mentor.password),
        field=mentor.field,
        company=mentor.company,
        position=mentor.position,
        experience=mentor.experience
    )

    if not new_mentor:
        return None

    return insert_user(new_mentor)


def create_menti(menti: MentiCreate) -> Optional[int]:
    new_menti = Menti(
        name=menti.name,
        email=menti.email,
        phone_number=menti.phone_number,
        password=hash_password(menti.password),
        education=menti.education,
        experience=menti.experience,
        goals=menti.goals,
        comments=menti.comments
    )

    if not new_menti:
        return None

    return insert_user(new_menti)
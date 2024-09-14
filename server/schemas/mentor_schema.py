from typing import Optional

from schemas.user_schema import UserCreate, UserInDB


class MentorCreate(UserCreate):
    additional_property: Optional[str]


class MentorInDB(UserInDB):
    additional_property: Optional[str]

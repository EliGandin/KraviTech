from typing import Optional

from schemas.user_schema import UserCreate, UserInDB


class MentiCreate(UserCreate):
    another_property: Optional[str]


class MentiInDB(UserInDB):
    another_property: Optional[str]

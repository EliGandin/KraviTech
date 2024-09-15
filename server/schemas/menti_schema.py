from typing import Optional

from globals.enums.role_enum import Role
from schemas.user_schema import UserCreate, UserInDB


class MentiCreate(UserCreate):
    education: Optional[str]
    experience: Optional[str]
    role: Role = Role.MENTI


class MentiInDB(UserInDB):
    education: Optional[str]
    experience: Optional[str]

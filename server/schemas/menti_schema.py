from typing import Optional

from globals.enums.role_enum import Role
from schemas.user_schema import UserCreate, UserInDB


class MentiCreate(UserCreate):
    education: Optional[str] = None
    experience: Optional[str] = None
    goals: Optional[str] = None
    comments: Optional[str] = None
    mentor_id: Optional[int] = None
    role: Role = Role.MENTI


class MentiInDB(UserInDB):
    education: Optional[str]
    experience: Optional[str]
    goals: Optional[str]

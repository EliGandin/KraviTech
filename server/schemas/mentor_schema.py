from typing import Optional

from globals.enums.experience_enum import Experience
from globals.enums.field_enum import Field
from globals.enums.role_enum import Role
from schemas.user_schema import UserCreate, UserInDB


class MentorCreate(UserCreate):
    experience: Optional[Experience] = None
    field: Optional[Field] = Field.DEFAULT_FIELD
    company: Optional[str] = None
    position: Optional[str] = None
    role: Optional[Role] = Role.MENTOR


class MentorInDB(UserInDB):
    experience: Optional[Experience]
    field: Optional[Field]

from pydantic import BaseModel, EmailStr
from typing import Optional

from globals.enums.role_enum import Role


class UserBase(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]


class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True

from pydantic import BaseModel, EmailStr
from typing import Optional, Union

from globals.enums.role_enum import Role


class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone_number: Optional[str]
    password: str
    role: Role


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(UserBase):
    pass


class UserSignupResponse(BaseModel):
    message: str
    id:int

class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]


class UserLoginResponse(BaseModel):
    name: str
    id: int
    role: Role


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True

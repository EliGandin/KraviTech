from typing import Optional

from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db
from globals.enums.experience_enum import Experience
from globals.enums.field_enum import Field
from globals.enums.role_enum import Role
from models.mentor_model import Mentor
from schemas.mentor_schema import MentorCreate
from schemas.user_schema import UserLogin

user_router = APIRouter()


@user_router.post("/login", status_code=status.HTTP_200_OK)
async def login(user: UserLogin):
    print(user)


@user_router.post("/signup/mentor", status_code=status.HTTP_201_CREATED)
async def mentor_signup(mentor: MentorCreate, db: Session = Depends(get_db)):
    # existing_user = db.query(Mentor).filter(mentor.email == mentor.email).first()
    # if existing_user:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

    new_mentor = Mentor(
        name=mentor.name,
        email=mentor.email,
        password=mentor.password,
        field=mentor.field,
        company=mentor.company,
        position=mentor.position,
        experience=mentor.experience
    )

    db.add(new_mentor)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create mentor: {str(e)}")

@user_router.post("/signup/menti", status_code=status.HTTP_201_CREATED)
async def menti_signup():
    pass

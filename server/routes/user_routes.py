from typing import Optional, cast

from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.db import get_db
from globals.enums.experience_enum import Experience
from globals.enums.field_enum import Field
from globals.enums.role_enum import Role
from models.menti_model import Menti
from models.mentor_model import Mentor
from models.user_model import User
from schemas.menti_schema import MentiCreate
from schemas.mentor_schema import MentorCreate
from schemas.user_schema import UserLogin

user_router = APIRouter()


@user_router.post("/login", status_code=status.HTTP_200_OK)
async def login(user: UserLogin):
    print(user)


@user_router.post("/signup/mentor", status_code=status.HTTP_201_CREATED)
async def mentor_signup(mentor: MentorCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).where(cast(User.email, str) == mentor.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

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
    db.commit()

    return {"message": "Mentor created successfully", "id": new_mentor.id}


@user_router.post("/signup/menti", status_code=status.HTTP_201_CREATED)
async def menti_signup(menti: MentiCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).where(cast(User.email, str) == menti.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

    new_menti = Menti(
        name=menti.name,
        email=menti.email,
        password=menti.password,
        education=menti.education,
        experience=menti.experience,
        goals=menti.goals
    )

    db.add(new_menti)
    db.commit()

    return {"message": "Menti created successfully", "id": new_menti.id}

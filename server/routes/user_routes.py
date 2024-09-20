from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db
from globals.validation.db_validation import user_validation
from models.menti_model import Menti
from models.mentor_model import Mentor
from schemas.menti_schema import MentiCreate
from schemas.mentor_schema import MentorCreate
from schemas.user_schema import UserLogin, UserResponse, UserLoginResponse

user_router = APIRouter()


@user_router.post("/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponse)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = user_validation(user.email, db)

    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    return {
            "message": "User logged in successfully",
            "id": existing_user.id,
            "name": existing_user.name,
            "role": existing_user.role
            }


@user_router.post("/signup/mentor", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def mentor_signup(mentor: MentorCreate, db: Session = Depends(get_db)):
    existing_user = user_validation(mentor.email, db)

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

    try:
        db.add(new_mentor)
        db.commit()
        db.refresh(new_mentor)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Mentor: {e}")

    return {"message": "Mentor created successfully", "id": new_mentor.id}


@user_router.post("/signup/menti", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def menti_signup(menti: MentiCreate, db: Session = Depends(get_db)):
    existing_user = user_validation(menti.email, db)

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

    try:
        db.add(new_menti)
        db.commit()
        db.refresh(new_menti)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Menti: {e}")

    return {"message": "Menti created successfully", "id": new_menti.id}

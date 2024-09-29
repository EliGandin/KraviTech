from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db
from globals.validation.user_validation import user_validation
from models.mentor_model import Mentor
from schemas.menti_schema import MentiCreate
from schemas.mentor_schema import MentorCreate
from schemas.user_schema import UserLogin, UserResponse, UserLoginResponse
from services.user_initialization import create_menti, create_mentor

user_router = APIRouter()


# TODO: GET DB THROUGH ANNOTATION
# @user_router.post("/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponse)
# async def login(user: UserLogin, db: Session = Depends(get_db)):
#     existing_user = user_validation(user.email, db)
#
#     if not existing_user:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")
#
#     return {
#         "message": "User logged in successfully",
#         "id": existing_user.id,
#         "name": existing_user.name,
#         "role": existing_user.role
#     }


@user_router.post("/signup/mentor", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def mentor_signup(mentor: MentorCreate):
    validation = user_validation(mentor.email, mentor.password)

    if validation.is_valid is False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=validation.message)

    new_mentor_id = create_mentor(mentor)

    if not new_mentor_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Menti")

    return {"message": "Menti created successfully", "id": new_mentor_id}


@user_router.post("/signup/menti", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def menti_signup(menti: MentiCreate):
    validation = user_validation(menti.email, menti.password)

    if validation.is_valid is False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=validation.message)

    new_menti_id = create_menti(menti)

    if not new_menti_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Menti")

    return {"message": "Menti created successfully", "id": new_menti_id}

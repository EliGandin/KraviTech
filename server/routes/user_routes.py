from fastapi import APIRouter, status, HTTPException

from globals.validation.login_validation import login_validation
from globals.validation.user_validation import user_validation
from repositories.login_user import login_user
from schemas.menti_schema import MentiCreate
from schemas.mentor_schema import MentorCreate
from schemas.user_schema import UserLogin, UserSignupResponse, UserLoginResponse
from services.user_initialization import create_menti, create_mentor

router = APIRouter()


@router.post("/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponse)
async def login(user: UserLogin):
    validation = login_validation(user)

    if validation.is_valid is False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    user_details = login_user(user)

    return {
        "message": "User logged in successfully",
        "id": user_details.id,
        "name": user_details.name,
        "role": user_details.role
    }


@router.post("/signup/mentor", status_code=status.HTTP_201_CREATED, response_model=UserSignupResponse)
async def mentor_signup(mentor: MentorCreate):
    validation = user_validation(mentor.email, mentor.password)

    if validation.is_valid is False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=validation.message)

    new_mentor_id = create_mentor(mentor)

    if not new_mentor_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Menti")

    return {"message": "Mentor created successfully", "id": new_mentor_id}


@router.post("/signup/menti", status_code=status.HTTP_201_CREATED, response_model=UserSignupResponse)
async def menti_signup(menti: MentiCreate):
    validation = user_validation(menti.email, menti.password)

    if validation.is_valid is False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=validation.message)

    new_menti_id = create_menti(menti)

    if not new_menti_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred while creating Menti")

    return {"message": "Menti created successfully", "id": new_menti_id}

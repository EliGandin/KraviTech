from fastapi import APIRouter

from repositories.mentors import get_mentors

router = APIRouter()

@router.get("/")
def get_all_mentors():
    mentors = get_mentors()
    return {"data": mentors}
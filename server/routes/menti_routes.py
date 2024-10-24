from typing import List

from fastapi import APIRouter

from repositories.mentis import get_mentis
from schemas.menti_schema import MentiResponse


router = APIRouter()

@router.get("/")
def get_all_mentis():
    mentis = get_mentis()
    return {"data": mentis}
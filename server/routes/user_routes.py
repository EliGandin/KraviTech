from fastapi import APIRouter, status, exceptions

from schemas.user_schema import UserLogin

user_router = APIRouter()


@user_router.post("/login", status_code=status.HTTP_200_OK)
async def login(user: UserLogin):
    print(user)


@user_router.post("/signup/mentor", status_code=status.HTTP_201_CREATED)
async def mentor_signup():
    pass


@user_router.post("/signup/menti", status_code=status.HTTP_201_CREATED)
async def menti_signup():
    pass

from fastapi import HTTPException
from starlette import status


def password_validation(password: str) -> bool:
    if len(password) < 4:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters long.")
    return True
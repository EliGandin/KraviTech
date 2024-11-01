import logging

from fastapi import FastAPI, HTTPException, Depends
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from database.db import check_db_connection, engine, get_db
from globals.validation.validation_handler import validation_exception_handler

from routes import user_routes
from routes import mentor_routes
from routes import menti_routes
from models.user_model import Base

logging.basicConfig(level=logging.INFO)

app = FastAPI()  # TODO: Setting File

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, restrict as necessary
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.include_router(user_routes.router, prefix="/user", tags=["user"])
app.include_router(mentor_routes.router, prefix="/mentors", tags=["mentor"])
app.include_router(menti_routes.router, prefix="/mentis", tags=["menti"])


@app.on_event("startup")
async def on_startup():
    result = check_db_connection()
    if result["status"] == "unhealthy":
        raise HTTPException(status_code=500, detail=result["message"])

    logging.info("Starting table creation process...")

    try:
        Base.metadata.create_all(bind=engine)
        logging.info("Created all tables successfully")
    except Exception as e:
        logging.error(f"An error occurred while creating tables: {e}")


@app.get("/")
def read_root():
    return {"message": "Great Success"}

@app.delete("/test")
def e2e_cleanup(db = Depends(get_db)):
    db.execute(text("DELETE FROM users WHERE email = 'teste2e@test.com'"))
    db.commit()

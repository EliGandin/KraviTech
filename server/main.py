import logging

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from database.db import check_db_connection, engine
from globals.validation_handler import validation_exception_handler

from routes import user_routes
from models.user_model import Base
from models.mentor_model import Mentor
from models.menti_model import Menti

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
app.include_router(user_routes.user_router, prefix="/user", tags=["user"])


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

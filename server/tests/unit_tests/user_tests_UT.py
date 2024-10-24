from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from database.db import get_db
from globals.validation.validation_result import ValidationResult
from main import app
from models.user_model import User

client = TestClient(app)


@pytest.fixture
def mock_db_session():
    db_session = MagicMock(spec=Session)
    return db_session


@pytest.fixture(autouse=True)
def override_get_db(mock_db_session):
    app.dependency_overrides[get_db] = lambda: mock_db_session


@patch("routes.user_routes.login_validation", return_value=ValidationResult(True))
@patch("routes.user_routes.login_user")
def test_login_success(mock_login_user, mock_db_session):
    login_data = {
        "email": "test@test.com",
        "password": "1234"
    }

    mock_user = MagicMock()
    mock_user.id = 1
    mock_user.name = "Test User"
    mock_user.role = "menti"

    mock_db_session.query(User).filter().first.return_value = mock_user
    mock_login_user.return_value = mock_user

    response = client.post("user/login", json=login_data)

    assert response.status_code == 200
    assert response.json()["id"] == mock_user.id
    assert response.json()["name"] == mock_user.name
    assert response.json()["role"] == mock_user.role


@patch("routes.user_routes.login_validation", return_value=ValidationResult(False, "Incorrect email or password"))
def test_login_user_not_found(mock_db_session):
    login_data = {
        "email": "test@test.com",
        "password": "1234"
    }

    mock_db_session.query(User).filter().first.return_value = None

    response = client.post("user/login", json=login_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect email or password"


@patch("routes.user_routes.user_validation", return_value=ValidationResult(True))
@patch("routes.user_routes.create_mentor")
def test_mentor_signup_success(mock_create_mentor, mock_db_session):
    mentor_data = {
        "name": "Eli",
        "email": "test@test.com",
        "phone_number": "0545555555",
        "password": "1234",
        "field": "data",
        "experience": "high"
    }

    mock_db_session.query(User).filter().first.return_value = None
    mock_create_mentor.return_value = 1
    mock_new_mentor = MagicMock(id=1)

    response = client.post("user/signup/mentor", json=mentor_data)
    assert response.status_code == 201
    assert response.json()["message"] == "Mentor created successfully"
    assert response.json()["id"] == mock_new_mentor.id

@patch("routes.user_routes.user_validation", return_value=ValidationResult(False, "User with this email already exists"))
def test_mentor_signup_user_exists( mock_db_session):
    mentor_data = {
        "name": "Eli",
        "email": "test@test.commgm",
        "phone_number": "0545555555",
        "password": "1234",
        "field": "data",
        "experience": "high"
    }

    mock_db_session.query(User).filter().first.return_value = True

    response = client.post("user/signup/menti", json=mentor_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "User with this email already exists"


def test_mentor_signup_missing_fields(mock_db_session):
    incomplete_mentor_data = {
        "field": "data",
        "experience": "high"
    }

    response = client.post("user/signup/mentor", json=incomplete_mentor_data)

    assert response.status_code == 400
    assert response.json()["message"] == "Invalid input"


@patch("routes.user_routes.user_validation", return_value=ValidationResult(True))
@patch("routes.user_routes.create_menti")
def test_menti_signup_success(mock_create_menti, mock_db_session):
    menti_data = {
        "name": "Test Menti",
        "email": "menti@example.com",
        "phone_number": "0545555555",
        "password": "securepassword",
        "education": "Computer Science",
        "experience": "2 years",
        "goals": "Become a software developer"
    }

    mock_db_session.query(User).filter().first.return_value = None
    mock_create_menti.return_value = 1
    mock_new_menti = MagicMock(id=1)

    response = client.post("user/signup/menti", json=menti_data)

    assert response.status_code == 201
    assert response.json()["message"] == "Menti created successfully"
    assert response.json()["id"] == mock_new_menti.id

@patch("routes.user_routes.user_validation", return_value=ValidationResult(False, "User with this email already exists"))
def test_menti_signup_user_exists(mock_db_session):
    menti_data = {
        "name": "Test Menti",
        "email": "menti@example.com",
        "phone_number": "0545555555",
        "password": "securepassword",
        "education": "Computer Science",
        "experience": "2 years",
        "goals": "Become a software developer"
    }

    mock_db_session.query(User).filter().first.return_value = True

    response = client.post("user/signup/menti", json=menti_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "User with this email already exists"


def test_menti_signup_missing_fields(mock_db_session):
    incomplete_menti_data = {
        "field": "data",
        "experience": "high"
    }

    response = client.post("user/signup/menti", json=incomplete_menti_data)

    assert response.status_code == 400
    assert response.json()["message"] == "Invalid input"

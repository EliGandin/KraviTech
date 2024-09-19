from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from database.db import get_db
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


def test_mentor_signup_success(mock_db_session):
    mentor_data = {
    "name": "Eli",
    "email": "test@test.com",
    "password": "1234",
    "field":"data",
    "experience": "high"
    }

    mock_db_session.query(User).filter().first.return_value = None
    mock_new_mentor = MagicMock(id=1)
    mock_db_session.add = MagicMock()
    mock_db_session.commit = MagicMock()
    mock_db_session.refresh = MagicMock()
    mock_db_session.refresh = MagicMock(side_effect=lambda obj: setattr(obj, 'id', mock_new_mentor.id))

    response = client.post("user/signup/mentor", json=mentor_data)
    assert True
    assert response.status_code == 201
    assert response.json()["message"] == "Mentor created successfully"
    assert response.json()["id"] == mock_new_mentor.id
    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()


def test_mentor_signup_user_exists(mock_db_session):
    mentor_data = {
        "name": "Eli",
        "email": "test@test.commgm",
        "password": "1234",
        "field": "data",
        "experience": "high"
    }

    mock_db_session.query(User).filter().first.return_value = True
    mock_db_session.add = MagicMock()
    mock_db_session.commit = MagicMock()

    response = client.post("user/signup/menti", json=mentor_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "User already exists."


def test_menti_signup_success(mock_db_session):
    menti_data = {
        "name": "Test Menti",
        "email": "menti@example.com",
        "password": "securepassword",
        "education": "Computer Science",
        "experience": "2 years",
        "goals": "Become a software developer"
    }

    mock_db_session.query(User).filter().first.return_value = None
    mock_new_menti = MagicMock(id=1)
    mock_db_session.add = MagicMock()
    mock_db_session.commit = MagicMock()
    mock_db_session.refresh = MagicMock(side_effect=lambda obj: setattr(obj, 'id', mock_new_menti.id))

    response = client.post("user/signup/menti", json=menti_data)

    assert response.status_code == 201
    assert response.json()["message"] == "Menti created successfully"
    assert response.json()["id"] == mock_new_menti.id
    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()


def test_menti_signup_user_exists(mock_db_session):
    menti_data = {
        "name": "Test Menti",
        "email": "menti@example.com",
        "password": "securepassword",
        "education": "Computer Science",
        "experience": "2 years",
        "goals": "Become a software developer"
    }

    mock_db_session.query(User).filter().first.return_value = True
    mock_db_session.add = MagicMock()
    mock_db_session.commit = MagicMock()

    response = client.post("user/signup/menti", json=menti_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "User already exists."

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Great Success"}


def test_login():
    response = client.post("/user/login", json={"username": "test", "password": "test"})
    assert response.status_code == 200
    assert response.json() is None


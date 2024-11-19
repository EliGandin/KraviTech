import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { jest } from "@jest/globals";

import app from "../../app";
import { FieldErrors } from "../../globals/errors/fieldErrors";
import { createMentiMock, createMentorMock, existingEmailValidationMock } from "./mocks/mocks";

import { createMentor } from "../../repositories/mentors.repository";
import { createMenti } from "../../repositories/mentis.repository";
import { existingEmailValidation } from "../../globals/validations/existingEmailValidation";

jest.mock("../../globals/validations/existingEmailValidation");
jest.mock("../../repositories/mentors.repository");
jest.mock("../../repositories/mentis.repository");

describe("Signup Routes", () => {
  beforeAll(() => {
    (existingEmailValidation as jest.Mock).mockImplementation(existingEmailValidationMock);
    (createMentor as jest.Mock).mockImplementation(createMentorMock);
    (createMenti as jest.Mock).mockImplementation(createMentiMock);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // afterAll(() => {
  //   app.close(() => );
  // })

  describe("Mentor Scenarios", () => {
    it("should return 201 when a mentor is signing up", async () => {
      const response = await request(app)
        .post("/signup/mentor")
        .send({
          name: "Test",
          email: "test@test.test",
          phone_number: "0545555555",
          password: "1234",
          field: "DATA",
          experience: "HIGH",
        });

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("should return 400 for invalid mentor name", async () => {
      const response = await request(app)
        .post("/signup/mentor")
        .send({
          email: "test@test.test",
          phone_number: "0545555555",
          password: "1234",
          field: "DATA",
          experience: "HIGH",
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.text).toBe(FieldErrors.INVALID_NAME);
    });

    it("should return 400 for invalid mentor email", async () => {
      const response = await request(app)
        .post("/signup/mentor")
        .send({
          name: "Test",
          phone_number: "0545555555",
          password: "1234",
          field: "DATA",
          experience: "HIGH",
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.text).toBe(FieldErrors.INVALID_EMAIL);
    });
  });

  describe("Menti Scenarios", () => {
    it("should return 201 when a menti signs up", async () => {
      const response = await request(app)
        .post("/signup/menti")
        .send({
          "name": "Test",
          "email": "test@test.test",
          "phone_number": "0545555555",
          "password": "1234",
          "education": "TEL AVIV",
          "experience": "HIGH",
          "goals": "Get good",
          "comments": "Comments",
        });

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("should return 400 for invalid mentor email", async () => {
      const response = await request(app)
        .post("/signup/menti")
        .send({
          "name": "Test",
          "phone_number": "0545555555",
          "password": "1234",
          "education": "TEL AVIV",
          "experience": "HIGH",
          "goals": "Get good",
          "comments": "Comments",
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.text).toBe(FieldErrors.INVALID_EMAIL);
    });
  });
});
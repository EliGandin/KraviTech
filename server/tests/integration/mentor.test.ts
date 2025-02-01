import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import app from "@/app";
import { updateProfile } from "@/repositories/mentors.repository";
import { FieldErrors } from "@/globals/errors/fieldErrors";

import { updateProfileRepositoryMock } from "@/tests/integration/mocks/mentorRoutesMocks";

// Add all the mocks here
jest.mock("@/repositories/mentors.repository");

describe("Mentor Routes", () => {
  let server: ReturnType<typeof app.listen>;
  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.TEST_PORT || 8001}`);

      // Add all the mocks here
      (updateProfile as jest.Mock).mockImplementation(updateProfileRepositoryMock);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    server.close();
  });

  describe("Update Profile", () => {
    it("should return 200 when updating profile", async () => {
      const response = await request(app)
        .put("/mentors/UpdateProfile/1")
        .send({
          name: "Test",
          email: "test@test.com",
        });

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should return 400 for invalid email", async () => {
      const response = await request(app)
        .put("/mentors/UpdateProfile/1")
        .send({
          name: "Test",
          email: "test@test", // Invalid Email
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for invalid name", async () => {
      const response = await request(app)
        .put("/mentors/UpdateProfile/1")
        .send({
          name: "",
        }); // Invalid Name

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for no fields to update", async () => {
      const response = await request(app)
        .put("/mentors/UpdateProfile/1")
        .send({}); // No fields to update

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.text).toBe(FieldErrors.NO_FIELDS_MESSAGE);
    });
  });
});
import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import app from "@/app";
import { FieldErrors } from "@/globals/errors/fieldErrors";

import { newMessageRepositoryMock } from "@/tests/unit/mocks/adminRoutesMocks";
import { postNewMessage } from "@/repositories/admin.repository";

// Add all the mocks here
jest.mock("@/repositories/admin.repository");

describe("Admin Routes", () => {
  let server: ReturnType<typeof app.listen>;
  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.TEST_PORT || 8001}`);

      // Add all the mocks here
      (postNewMessage as jest.Mock).mockImplementation(newMessageRepositoryMock);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    server.close();
  });

  describe("Messages", () => {
    it("Should post new message", async () => {
      const response = await request(app)
        .post("/admin/message")
        .send({
          name: "Test",
          email: "test@test.com",
          phone_number: "0545595555",
          title: "title",
          message: "message",
        });

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("Should return 400 for invalid name", async () => {
      const response = await request(app)
        .post("/admin/message")
        .send({
          // name: "Test",
          email: "test@test.com",
          phone_number: "0545595555",
          title: "title",
          message: "message",
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.text).toBe(FieldErrors.INVALID_NAME);
    });
  });
});

import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import app from "@/app";
import { loginMock } from "@/tests/integration/mocks/mocks";
import { loginController } from "@/controllers/users/login.controller";

jest.mock("@/controllers/users/login.controller");


describe("Login User", () => {
  let server: ReturnType<typeof app.listen>;
  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.TEST_PORT || 8001}`);

      (loginController as jest.Mock).mockImplementation(loginMock);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    server.close();
  });

  describe("Login", () => {
    it("should return 200 when logging in", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "test@test.com",
          password: "1234",
        });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        id: 1,
        name: "Test",
        email: "test@test.com",
      });
    });

    it("should return 400 for invalid email", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "test@test", // Invalid Email
          password: "1234",
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for invalid password", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "test@test.com",
          password: "12",
        }); // password is too short

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
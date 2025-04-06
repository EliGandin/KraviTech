import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import app from "@/app";
import { addSubtaskMock, addTaskMock } from "@/tests/unit/mocks/taskRoutesMocks";
import { addSubtaskController, addTaskController } from "@/controllers/tasks.controller";

const taskId = "a6cb4f80-e3e3-45eb-9e8b-70d7eb7b53ac";

// Add all the mocks here
jest.mock("@/controllers/tasks.controller");

describe("Tasks Routes", () => {
  let server: ReturnType<typeof app.listen>;
  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.TEST_PORT || 8001}`);

      // Add all the mocks here
      (addSubtaskController as jest.Mock).mockImplementation(addSubtaskMock);
      (addTaskController as jest.Mock).mockImplementation(addTaskMock);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    server.close();
  });

  describe("Tasks", () => {
    it("should return 200 when adding tasks", async () => {
      const response = await request(app)
        .post(`/tasks/1`)
        .send({
          mentor_id: 1,
          task: {
            title: "Test",
            description: "Test Description",
          },
        });

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should return 400 for invalid title", async () => {
      const response = await request(app)
        .post(`/tasks/${taskId}`)
        .send({
          mentor_id: 1,
          task: {
            description: "Test Description",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for invalid description", async () => {
      const response = await request(app)
        .post(`/tasks/1`)
        .send({
          mentor_id: 1,
          task: {
            title: "Test",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe("Subtasks", () => {
    it("should return 200 when adding subtasks", async () => {
      const response = await request(app)
        .post(`/tasks/SubTask/${taskId}`)
        .send({
          taskId: 1,
          subtask: {
            title: "Test",
            description: "Test Description",
          },
        });

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should return 400 for invalid title", async () => {
      const response = await request(app)
        .post(`/tasks/SubTask/${taskId}`)
        .send({
          subtask: {
            description: "Test Description",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for invalid description", async () => {
      const response = await request(app)
        .post(`/tasks/SubTask/${taskId}`)
        .send({
          subtask: {
            title: "Test",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
import { jest } from "@jest/globals";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import app from "@/app";
import { addSubtaskMock, addTaskMock } from "@/tests/unit/mocks/taskRoutesMocks";
import { addSubtask, addTask } from "@/repositories/tasks.repository";


// Add all the mocks here
jest.mock("@/repositories/tasks.repository");

describe("Tasks Routes", () => {
  let server: ReturnType<typeof app.listen>;
  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.TEST_PORT || 8001}`);

      // Add all the mocks here
      (addSubtask as jest.Mock).mockImplementation(addSubtaskMock);
      (addTask as jest.Mock).mockImplementation(addTaskMock);
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
        .post("/tasks/1")
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
        .post("/tasks/1")
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
        .post("/tasks/1")
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
        .post("/tasks/SubTask/menti/1")
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
        .post("/tasks/SubTask/menti/1")
        .send({
          taskId: 1,
          subtask: {
            description: "Test Description",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should return 400 for invalid description", async () => {
      const response = await request(app)
        .post("/tasks/SubTask/menti/1")
        .send({
          taskId: 1,
          subtask: {
            title: "Test",
          },
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
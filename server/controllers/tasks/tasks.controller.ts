import { changeSubtaskStatus, changeTaskStatus } from "@/repositories/tasks.repository";

export const changeTaskStatusController = async (id: number, status: string) => {
  await changeTaskStatus(id, status.toUpperCase());
};

export const changeSubtaskStatusController = async (taskId: number, subtaskId: string, status: string) => {
  await changeSubtaskStatus(Number(taskId), subtaskId, status.toUpperCase());
};
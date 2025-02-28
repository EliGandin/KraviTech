import * as crypto from "node:crypto";

// import { changeSubtaskStatus, changeTaskStatus } from "@/repositories/tasks.repository";
import { SubTask, Task } from "@/globals/types/Task.type";
import { addSubtask, addTask, changeSubtaskStatus, changeTaskStatus } from "@/aws/dynamo/dynamodb";
import { TaskStatus } from "@/globals/constants";

export const addTaskController = async (task: Partial<Task>, menti_id: string, mentor_id: string) => {
  const newTask = {
    task_id: crypto.randomUUID(),
    menti_id,
    mentor_id,
    title: task.title ?? "",
    description: task.description ?? "",
    status: TaskStatus.NEW,
    created_date: new Date().toISOString(),
    in_progress_date: "",
    completed_date: "",
    sub_tasks_count: 0,
  };
  await addTask(newTask);
};

export const addSubtaskController = async (taskId: string, subtask: Partial<SubTask>) => {
  const newSubtask = {
    id: crypto.randomUUID(),
    title: subtask.title ?? "",
    description: subtask.description ?? "",
    status: TaskStatus.NEW,
    created_date: new Date().toISOString(),
    in_progress_date: null,
    completed_date: null,
  };

  await addSubtask(taskId, newSubtask);
};

export const changeTaskStatusController = async (id: string, status: string) => {
  await changeTaskStatus(id, status.toUpperCase());
};

export const changeSubtaskStatusController = async (taskId: string, subtaskId: string, status: string) => {
  await changeSubtaskStatus(taskId, subtaskId, status.toUpperCase());
};
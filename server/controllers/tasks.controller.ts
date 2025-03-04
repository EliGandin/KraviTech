import * as crypto from "node:crypto";

import { SubTask, Task } from "@/globals/types/Task.type";
import { TaskStatus } from "@/globals/constants";
import { addSubtask, addTask, changeSubtaskStatus, changeTaskStatus, getTasksByMentor } from "@/aws/dynamo/dynamodb";
import { getMentisTaskData } from "@/repositories/tasks.repository";
import { groupTasksByMenti } from "@/utils/mappers/taskMappers";

export const getTasksByMentorController = async (mentorId: string) => {
  const data = await getTasksByMentor(mentorId);

  if (!data) {
    throw new Error(`Tasks not found.`);
  }

  const mentisData = await getMentisTaskData(Number(mentorId));
  return groupTasksByMenti(data, mentisData);
};

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
import axios from "axios";

import {
  MentiTasks,
  MentorTasks,
  NewTask,
  Subtask,
  TaskDetails,
} from "@/global/interfaces/tasksInterfaces.ts";

export const getTasksByMentor = async (id: number): Promise<MentorTasks[]> => {
  const { data } = (await axios.get(`http://localhost:8000/tasks/mentor/${id}`))
    .data;

  return data;
};

export const getTasksByMenti = async (id: number): Promise<MentiTasks[]> => {
  const { data } = (await axios.get(`http://localhost:8000/tasks/menti/${id}`))
    .data;

  return data;
};

export const getTaskDetails = async (
  taskId: string,
): Promise<TaskDetails[]> => {
  const { data } = (
    await axios.get(`http://localhost:8000/tasks/TaskDetails/${taskId}`)
  ).data;

  return data;
};

export const addTask = (mentiId: string, task: NewTask): Promise<void> => {
  return axios.post(`http://localhost:8000/tasks/${mentiId}`, task);
};

export const addSubtask = async (taskId: string, subtask: Subtask) => {
  await axios.post(`http://localhost:8000/tasks/SubTask/${taskId}`, subtask);
};

export const changeTaskStatus = (id: number, status: string): Promise<void> => {
  return axios.put(`http://localhost:8000/tasks/ChangeTaskStatus/${id}`, {
    status,
  });
};

export const changeSubtaskStatus = (
  id: number,
  subtaskId: string,
  status: string,
): Promise<void> => {
  return axios.put(`http://localhost:8000/tasks/ChangeSubtaskStatus/${id}`, {
    subtaskId,
    status,
  });
};

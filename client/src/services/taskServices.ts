import axios from "axios";

import {
  MentiTasks,
  MentorTasks,
  NewTask,
  Subtask,
  TaskDetails,
} from "@/global/interfaces/tasksInterfaces.ts";

const URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`;

export const getTasksByMentor = async (id: number): Promise<MentorTasks[]> => {
  const { data } = (await axios.get(`${URL}/mentor/${id}`)).data;

  return data;
};

export const getTasksByMenti = async (id: number): Promise<MentiTasks[]> => {
  const { data } = (await axios.get(`${URL}/menti/${id}`)).data;

  return data;
};

export const getTaskDetails = async (
  taskId: string,
): Promise<TaskDetails[]> => {
  const { data } = (await axios.get(`${URL}/TaskDetails/${taskId}`)).data;

  return data;
};

export const addTask = (mentiId: string, task: NewTask): Promise<void> => {
  console.log(task);
  return axios.post(`${URL}/${mentiId}`, task);
};

export const addSubtask = async (taskId: string, subtask: Subtask) => {
  await axios.post(`${URL}/SubTask/${taskId}`, subtask);
};

export const changeTaskStatus = (id: number, status: string): Promise<void> => {
  return axios.put(`${URL}/ChangeTaskStatus/${id}`, {
    status,
  });
};

export const changeSubtaskStatus = (
  id: number,
  subtaskId: string,
  status: string,
): Promise<void> => {
  return axios.put(`${URL}/ChangeSubtaskStatus/${id}`, {
    subtaskId,
    status,
  });
};

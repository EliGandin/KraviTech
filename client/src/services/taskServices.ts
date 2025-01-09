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
  mentiId: number,
  taskId: number,
): Promise<TaskDetails[]> => {
  const { data } = (
    await axios.get(
      `http://localhost:8000/tasks/TaskDetails/${mentiId}/${taskId}`,
    )
  ).data;

  return data.subTasks;
};

export const addTask = (mentiId: number, task: NewTask): Promise<void> => {
  console.log(mentiId);

  return axios.post(`http://localhost:8000/tasks/${mentiId}`, task);
};

export const addSubtask = async (mentiId: number, subtask: Subtask) => {
  await axios.post(
    `http://localhost:8000/tasks/SubTask/menti/${mentiId}`,
    subtask,
  );
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

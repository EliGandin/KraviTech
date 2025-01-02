import axios from "axios";

import { MentorTasks } from "@/global/interfaces/tasksInterfaces.ts";

export const getTasksByMentor = async (id: number): Promise<MentorTasks[]> => {
  const { data } = (await axios.get(`http://localhost:8000/tasks/mentor/${id}`))
    .data;

  return data;
};

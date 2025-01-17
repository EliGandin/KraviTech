import axios from "axios";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { MentorDashboardData } from "@/global/interfaces/dashboardInterfaces.ts";

export const getMentors = async (): Promise<IMentor[]> => {
  const { data } = (await axios.get("http://localhost:8000/mentors")).data;
  return data;
};

export const getMentor = async (id: number): Promise<IMentor> => {
  const { data } = (await axios.get(`http://localhost:8000/mentors/${id}`))
    .data;
  return data;
};

export const deleteMentor = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:8000/mentors/${id}`);
};

export const changeMentorStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  await axios.put(`http://localhost:8000/mentors/ChangeStatus/${id}`, {
    status,
  });
};

export const updateProfile = async (
  id: number,
  data: Partial<IMentor>,
): Promise<void> => {
  await axios.put(`http://localhost:8000/mentors/UpdateProfile/${id}`, data);
};

export const getDashboardData = async (
  id: number,
): Promise<MentorDashboardData> => {
  const { data } = await axios.get(
    `http://localhost:8000/mentors/Dashboard/${id}`,
  );
  return data;
};

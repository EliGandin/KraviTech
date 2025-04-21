import axios from "axios";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { MentorDashboardData } from "@/global/interfaces/dashboardInterfaces.ts";

const URL = `${import.meta.env.VITE_BACKEND_URL}/mentors`;

export const getMentors = async (): Promise<IMentor[]> => {
  const { data } = await axios.get(`${URL}`);
  return data;
};

export const getMentor = async (id: number): Promise<IMentor> => {
  const { data } = await axios.get(`${URL}/${id}`);
  return data;
};

export const deleteMentor = async (id: number): Promise<void> => {
  await axios.delete(`${URL}/${id}`);
};

export const changeMentorStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  await axios.put(`${URL}/ChangeStatus/${id}`, {
    status,
  });
};

export const updateProfile = async (
  id: number,
  data: Partial<IMentor>,
): Promise<void> => {
  await axios.put(`${URL}/UpdateProfile/${id}`, data);
};

export const getDashboardData = async (
  id: number,
): Promise<MentorDashboardData> => {
  const { data } = await axios.get(`${URL}/Dashboard/${id}`);
  return data;
};

export const getProfileImage = async (id: number): Promise<string | null> => {
  const { data } = await axios.get(`${URL}/Image/${id}`);
  if (data.length === 0 || !data) {
    return null;
  }
  return data;
};

export const putProfileImage = async (id: number, formData: FormData) => {
  await axios.put(`${URL}/image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

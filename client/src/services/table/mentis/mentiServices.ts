import axios from "axios";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";

const URL = `${import.meta.env.VITE_BACKEND_URL}/mentis`;

export const getMentis = async (): Promise<IMenti[]> => {
  const { data } = await axios.get(`${URL}`);
  return data;
};

export const getMenti = async (id: number): Promise<IMenti> => {
  const { data } = await axios.get(`${URL}/${id}`);
  return data;
};

export const deleteMenti = async (id: number): Promise<void> => {
  await axios.delete(`${URL}/${id}`);
};

export const changeMentiStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  await axios.put(`${URL}/mentis/ChangeStatus/${id}`, {
    status,
  });
};

export const changeMentiOperator = async (
  id: number,
  operatorId: number,
): Promise<void> => {
  await axios.put(`${URL}/ChangeOperator/${id}`, {
    operator_id: operatorId,
  });
};

export const changeMentiMentor = async (
  id: number,
  mentorId: number,
): Promise<void> => {
  await axios.put(`${URL}/ChangeMentor/${id}`, {
    mentor_id: mentorId,
  });
};

export const updateProfile = async (
  id: number,
  data: Partial<IMenti>,
): Promise<void> => {
  await axios.put(`${URL}/UpdateProfile/${id}`, data);
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

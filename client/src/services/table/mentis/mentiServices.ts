import axios from "axios";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";

export const getMentis = async (): Promise<IMenti[]> => {
  const { data } = (await axios.get("http://localhost:8000/mentis")).data;
  return data;
};

export const getMenti = async (id: number): Promise<IMenti> => {
  const { data } = (await axios.get(`http://localhost:8000/mentis/${id}`)).data;
  return data;
};

export const deleteMenti = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:8000/mentis/${id}`);
};

export const changeMentiStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  await axios.put(`http://localhost:8000/mentis/ChangeStatus/${id}`, {
    status,
  });
};

export const changeMentiOperator = async (
  id: number,
  operatorId: number,
): Promise<void> => {
  await axios.put(`http://localhost:8000/mentis/ChangeOperator/${id}`, {
    operator_id: operatorId,
  });
};

export const changeMentiMentor = async (
  id: number,
  mentorId: number,
): Promise<void> => {
  await axios.put(`http://localhost:8000/mentis/ChangeMentor/${id}`, {
    mentor_id: mentorId,
  });
};

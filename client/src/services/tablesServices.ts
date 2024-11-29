import axios from "axios";

import { IMenti, IMentor } from "@/global/interfaces/userInterfaces";

export const getMentors = async (): Promise<IMentor[]> => {
  const { data } = (await axios.get("http://localhost:8000/mentors")).data;
  return data;
};

export const getMentis = async (): Promise<IMenti[]> => {
  const { data } = (await axios.get("http://localhost:8000/mentis")).data;
  return data;
};

export const deleteMentor = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:8000/mentors/${id}`);
};

export const deleteMenti = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:8000/mentis/${id}`);
};

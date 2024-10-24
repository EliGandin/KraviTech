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

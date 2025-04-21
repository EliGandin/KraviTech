import axios from "axios";

import {
  IMentiSignup,
  IMentorSignup,
} from "@/global/interfaces/signupInterfaces";

const URL = `${import.meta.env.VITE_BACKEND_URL}/signup`;

export const mentiSignup = async (data: IMentiSignup): Promise<void> => {
  return await axios.post(`${URL}/menti`, data);
};

export const mentorSignup = async (data: IMentorSignup): Promise<void> => {
  return await axios.post(`${URL}/mentor`, data);
};

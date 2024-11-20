import axios from "axios";

import {
  IMentiSignup,
  IMentorSignup,
} from "@/global/interfaces/signupInterfaces";

export const mentiSignup = async (data: IMentiSignup): Promise<void> => {
  return await axios.post("http://localhost:8000/signup/menti", data);
};

export const mentorSignup = async (data: IMentorSignup): Promise<void> => {
  return await axios.post("http://localhost:8000/signup/mentor", data);
};

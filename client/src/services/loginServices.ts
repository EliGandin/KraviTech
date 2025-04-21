import axios from "axios";
import { StatusCodes } from "http-status-codes";

import {
  ILoginResponse,
  IUserLogin,
} from "@/global/interfaces/loginInterfaces";

const URL = `${import.meta.env.VITE_BACKEND_URL}/login`;

export const userLogin = async (
  loginData: IUserLogin,
): Promise<ILoginResponse | undefined> => {
  const response = await axios.post(`${URL}`, loginData);
  if (response.status === StatusCodes.NOT_FOUND) {
    return undefined;
  }

  return response.data;
};

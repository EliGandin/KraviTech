import axios from "axios";
import { StatusCodes } from "http-status-codes";

import {
  ILoginResponse,
  IUserLogin,
} from "@/global/interfaces/loginInterfaces";

export const userLogin = async (
  loginData: IUserLogin,
): Promise<ILoginResponse | undefined> => {
  const response = await axios.post("http://localhost:8000/login", loginData);
  if (response.status === StatusCodes.NOT_FOUND) {
    return undefined;
  }

  return response.data;
};

import axios from "axios";

import {
  ILoginResponse,
  IUserLogin,
} from "@/global/interfaces/loginInterfaces";

export const userLogin = async (loginData: IUserLogin): Promise<ILoginResponse> => {
  const data = (await axios.post("http://localhost:8000/user/login", loginData)).data
  return data;
};

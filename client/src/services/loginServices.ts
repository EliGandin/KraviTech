import axios from "axios";

import {
  ILoginResponse,
  IUserLogin,
} from "@/global/interfaces/loginInterfaces";

export const userLogin = async (data: IUserLogin): Promise<ILoginResponse> => {
  return await axios.post("http://localhost:8000/user/login", data);
};

import {
  UserLoginInterface,
  UserResponseInterface,
} from "@/global/interfaces/userInterfaces";
import axios from "axios";

export const userLogin = async (
  data: UserLoginInterface,
): Promise<UserResponseInterface> => {
  return await axios.post("http://localhost:8000/user/login", data);
};

import axios from "axios";

import { Operator } from "@/global/interfaces/Props/MessageProps.ts";

const URL = `${import.meta.env.VITE_BACKEND_URL}/operator`;

export const getAllOperators = async (): Promise<Operator[]> => {
  const { data } = (await axios.get(`${URL}`)).data;

  return data;
};

import axios from "axios";

import { Operator } from "@/global/interfaces/Props/MessageProps.ts";

export const getAllOperators = async (): Promise<Operator[]> => {
  const { data } = (await axios.get("http://localhost:8000/operator")).data;

  return data;
};

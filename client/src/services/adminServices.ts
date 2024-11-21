import axios from "axios";
import { TPendingUsers } from "@/global/interfaces/userInterfaces.ts";

export const getPendingUsers = async (): Promise<TPendingUsers> => {
  const { data } = (await axios.get("http://localhost:8000/admin/pendingusers"))
    .data;

  return data;
};

export const activateUsers = async (id: number, role: string) => {
  await axios.put("http://localhost:8000/admin/activate", {
    id,
    role,
  });
};

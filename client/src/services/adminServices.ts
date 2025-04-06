import axios from "axios";

import { TPendingUsers } from "@/global/interfaces/Props/PendingUserCardProps";
import { Message, NewMessage } from "@/global/interfaces/Props/MessageProps";

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

export const getAllMessages = async (): Promise<Message[]> => {
  const { data } = (await axios.get("http://localhost:8000/admin/messages"))
    .data;

  return data;
};

export const updateMessage = async (
  id: number,
  operator_id: number | null,
): Promise<void> => {
  await axios.put("http://localhost:8000/admin/updatemessage", {
    id,
    operator_id,
  });
};

export const postContactMessage = async (data: NewMessage): Promise<void> => {
  await axios.post("http://localhost:8000/admin/message", data);
};

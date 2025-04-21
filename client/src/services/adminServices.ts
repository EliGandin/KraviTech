import axios from "axios";

import { TPendingUsers } from "@/global/interfaces/Props/PendingUserCardProps";
import { Message, NewMessage } from "@/global/interfaces/Props/MessageProps";

const URL = `${import.meta.env.VITE_BACKEND_URL}/admin`;

export const getPendingUsers = async (): Promise<TPendingUsers> => {
  const { data } = (await axios.get(`${URL}/pendingusers`)).data;

  return data;
};

export const activateUsers = async (id: number, role: string) => {
  await axios.put(`${URL}/activate`, {
    id,
    role,
  });
};

export const getAllMessages = async (): Promise<Message[]> => {
  const { data } = (await axios.get(`${URL}/messages`)).data;

  return data;
};

export const updateMessage = async (
  id: number,
  operator_id: number | null,
): Promise<void> => {
  await axios.put(`${URL}/updatemessage`, {
    id,
    operator_id,
  });
};

export const postContactMessage = async (data: NewMessage): Promise<void> => {
  await axios.post(`${URL}/message`, data);
};

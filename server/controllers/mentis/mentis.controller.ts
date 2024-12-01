import { changeStatus } from "@/repositories/mentis.repository";

export const changeStatusController = async (id: number, status: string) => {
  const formattedStatus = status.toUpperCase();
  await changeStatus(id, formattedStatus);
};
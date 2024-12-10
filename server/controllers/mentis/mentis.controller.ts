import { changeStatus, updateProfile } from "@/repositories/mentis.repository";
import { Menti } from "@/globals/types/User.types";

export const changeStatusController = async (id: number, status: string) => {
  const formattedStatus = status.toUpperCase();
  await changeStatus(id, formattedStatus);
};

export const updateProfileController = async (id: number, menti: Partial<Menti>) => {
  const keys = Object.keys(menti).filter((key) => menti[key as keyof Menti] !== undefined);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = [...keys.map((key) => menti[key as keyof Menti])];


  return updateProfile(id, setClause, values, keys.length + 1);
};
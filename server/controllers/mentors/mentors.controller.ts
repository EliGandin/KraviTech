import { changeStatus, updateProfile } from "@/repositories/mentors.repository";
import { Mentor } from "@/globals/types/User.types";

export const changeStatusController = async (id: number, status: string) => {
  const formattedStatus = status.toUpperCase();
  await changeStatus(id, formattedStatus);
};

export const updateProfileController = async (id: number, mentor: Partial<Mentor>) => {
  const formattedField = mentor.field?.toUpperCase();
  const formattedExperience = mentor.experience?.toUpperCase();
  const formattedMentor = { ...mentor, field: formattedField, experience: formattedExperience };

  const keys = Object.keys(formattedMentor).filter((key) => formattedMentor[key as keyof Mentor] !== undefined);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = [...keys.map((key) => formattedMentor[key as keyof Mentor])];


  return updateProfile(id, setClause, values, keys.length + 1);
};
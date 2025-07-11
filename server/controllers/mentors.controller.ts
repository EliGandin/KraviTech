import {
  changeStatus,
  getImageString,
  putProfileImageString,
  updateProfile,
} from "@/repositories/mentors.repository";
import { Mentor } from "@/globals/types/User.types";
import { getImageUrl, putImage } from "@/aws/s3/s3";
import { FieldErrors } from "@/globals/errors/fieldErrors";

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
    return { isValid: false, message: FieldErrors.NO_FIELDS_MESSAGE };
  }

  const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = [...keys.map((key) => formattedMentor[key as keyof Mentor])];

  await updateProfile(id, setClause, values, keys.length + 1);
  return { isValid: true };
};

export const getImagesController = async (id: number) => {
  const imageString = await getImageString(id);
  if (!imageString) {
    return undefined;
  }

  return await getImageUrl(imageString);
};

export const putProfileImageController = async (file: Express.Multer.File, fileType: string, id: number) => {
  const imageName = `mentor_${id}.${fileType}`;
  const result = await putImage(file, imageName);
  if (!result) {
    throw new Error("Error uploading image to s3");
  }

  await putProfileImageString(imageName, id);
};
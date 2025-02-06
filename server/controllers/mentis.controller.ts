import { changeStatus, getImageString, updateProfile } from "@/repositories/mentis.repository";
import { Menti } from "@/globals/types/User.types";
import { getImageUrl, putImage } from "@/aws/s3/s3";
import { putProfileImageString } from "@/repositories/mentis.repository";
import { ValidationResult } from "@/globals/types/ValidationResult";
import { FieldErrors } from "@/globals/errors/fieldErrors";

export const changeStatusController = async (id: number, status: string) => {
  const formattedStatus = status.toUpperCase();
  await changeStatus(id, formattedStatus);
};

export const updateProfileController = async (id: number, menti: Partial<Menti>): Promise<ValidationResult> => {
  const keys = Object.keys(menti).filter((key) => menti[key as keyof Menti] !== undefined);

  if (keys.length === 0) {
    return { isValid: false, message: FieldErrors.NO_FIELDS_MESSAGE };
  }

  const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = [...keys.map((key) => menti[key as keyof Menti])];


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
  const imageName = `menti_${id}.${fileType}`;
  const result = await putImage(file, imageName);
  if (!result) {
    throw new Error("Error uploading image to s3");
  }

  await putProfileImageString(imageName, id);
};
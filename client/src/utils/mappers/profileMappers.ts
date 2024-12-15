import { IMenti, IMentor } from "@/global/interfaces/userInterfaces.ts";
import {
  capitalizeName,
  formatPhoneNumber,
  capitalizeValue,
} from "@/utils/formatters/formatFields.ts";

export const mapMentor = (mentor: IMentor) => {
  const formattedName = capitalizeName(mentor.name);
  const formattedPhoneNumber = formatPhoneNumber(mentor.phone_number);
  const formattedExperience = capitalizeValue(mentor.experience);
  const formattedField = capitalizeValue(mentor.field);

  return {
    ...mentor,
    field: formattedField,
    experience: formattedExperience,
    name: formattedName,
    phone_number: formattedPhoneNumber,
  };
};

export const mapMenti = (menti: IMenti) => {
  const formattedName = capitalizeName(menti.name);
  const formattedPhoneNumber = formatPhoneNumber(menti.phone_number);
  const formattedExperience = capitalizeValue(menti.experience);

  return {
    ...menti,
    experience: formattedExperience,
    name: formattedName,
    phone_number: formattedPhoneNumber,
  };
};

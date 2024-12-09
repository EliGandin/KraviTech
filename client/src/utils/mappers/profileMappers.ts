import { IMenti, IMentor } from "@/global/interfaces/userInterfaces.ts";
import {
  capitalizeName,
  formatPhoneNumber,
} from "@/utils/formatters/formatFields.ts";

export const mapUser = (user: IMenti | IMentor) => {
  const formattedName = capitalizeName(user.name);
  const formattedPhoneNumber = formatPhoneNumber(user.phone_number);

  return {
    ...user,
    name: formattedName,
    phone_number: formattedPhoneNumber,
  };
};

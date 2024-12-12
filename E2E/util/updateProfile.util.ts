import { Mentor } from "./types";

export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "";

  return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
};

export const capitalizeName = (name: string | undefined): string => {
  if (!name) return "";

  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

export const mentorMapper = (mentor: Partial<Mentor>) => {
  const formattedName = capitalizeName(mentor.name);
  const formattedPhoneNumber = formatPhoneNumber(mentor.phone_number);
  const formattedStatus = mentor.status?.toUpperCase();

  return {
    ...mentor,
    name: formattedName,
    phone_number: formattedPhoneNumber,
    status: formattedStatus,
  };
};
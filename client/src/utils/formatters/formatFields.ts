export const capitalizeValue = (value: string | undefined): string => {
  if (!value) return "";

  const formattedValue = value.toLowerCase();
  return formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
};

export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "";

  return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
};

export const capitalizeName = (name: string | undefined): string => {
  if (!name) return "";

  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

export const normalizePhoneNumber = (
  phoneNumber: string | undefined,
): string => {
  if (!phoneNumber) return "";

  if (phoneNumber.startsWith("+972")) {
    phoneNumber.replace("+972", "0");
  }

  if (phoneNumber.indexOf("-") > 0) {
    phoneNumber.split("-").toString().replace(",", "");
  }
  return phoneNumber;
};

export const formatInitials = (name: string | undefined): string => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

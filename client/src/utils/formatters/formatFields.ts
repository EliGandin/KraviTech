export const capitalizeValue = (value: string | undefined): string => {
  if (!value) return "";
  
  const formattedValue = value.toLowerCase();
  return formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
};

export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "";

  return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
};

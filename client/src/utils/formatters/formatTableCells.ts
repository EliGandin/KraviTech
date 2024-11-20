export const capitalizeTableCells = (value: string): string => {
  const formattedValue = value.toLowerCase();
  return formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
};

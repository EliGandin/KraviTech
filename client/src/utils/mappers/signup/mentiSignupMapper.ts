import { z } from "zod";

import { MentiSignupFormSchema } from "@/schemas/signup/MentiSignupFormSchema.ts";
import { IMentiSignup } from "@/global/interfaces/signupInterfaces.ts";
import { normalizePhoneNumber } from "@/utils/formatters/formatFields.ts";

export const mentiSignupMapper = (
  data: z.infer<typeof MentiSignupFormSchema>,
): IMentiSignup => {
  const normalizedPhoneNumber = normalizePhoneNumber(data.phoneNumber);
  
  return { ...data, phone_number: normalizedPhoneNumber };
};

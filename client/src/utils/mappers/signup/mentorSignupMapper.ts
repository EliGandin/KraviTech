import { z } from "zod";

import { MentorSignupFormSchema } from "@/schemas/signup/MentorSignupFormSchema.ts";
import { IMentorSignup } from "@/global/interfaces/signupInterfaces.ts";
import { normalizePhoneNumber } from "@/utils/formatters/formatFields.ts";

export const mentorSignupMapper = (
  data: z.infer<typeof MentorSignupFormSchema>,
): IMentorSignup => {
  const normalizedPhoneNumber = normalizePhoneNumber(data.phoneNumber);

  return { ...data, phone_number: normalizedPhoneNumber };
};

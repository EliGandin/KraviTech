import { z } from "zod";
import { MentorSignupFormSchema } from "@/schemas/signup/MentorSignupFormSchema.ts";
import { IMentorSignup } from "@/global/interfaces/signupInterfaces.ts";

export const mentorSignupMapper = (
  data: z.infer<typeof MentorSignupFormSchema>,
): IMentorSignup => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    phone_number: data.phoneNumber,
    position: data.position,
    company: data.company,
    field: data.field,
    experience: data.experience,
  };
};

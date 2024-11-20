import { z } from "zod";

import { MentiSignupFormSchema } from "@/schemas/MentiSignupFormSchema.ts";
import { IMentiSignup } from "@/global/interfaces/signupInterfaces.ts";

export const mentiSignupMapper = (
  data: z.infer<typeof MentiSignupFormSchema>,
): IMentiSignup => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    phone_number: data.phoneNumber,
    goals: data.goals,
    education: data.education,
    experience: data.experience,
    comments: data.comments,
  };
};

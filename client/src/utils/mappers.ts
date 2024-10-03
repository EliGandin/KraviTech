import { z } from "zod";

import {
  IMentiSignup,
  IMentorSignup,
} from "@/global/interfaces/userInterfaces";
import { MentorSignupFormSchema } from "@/pages/Signup/schemas/mentorSchema";
import { MentiSignupFormSchema } from "@/pages/Signup/schemas/mentiSchema";

export const mentorMapper = (
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

export const mentiMapper = (
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

import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  education: z.string().optional(),
  experience: z.string().optional(),
  goals: z.string().optional(),
  comments: z.string().optional(),
});

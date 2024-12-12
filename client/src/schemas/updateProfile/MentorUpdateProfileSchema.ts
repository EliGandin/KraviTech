import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  company: z.string().optional(),
  field: z.string().optional(),
  experience: z.string().optional(),
});

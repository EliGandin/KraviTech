import { z } from "zod";

export const MentiSignupFormSchema = z
  .object({
    name: z.string({ required_error: "Full name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z.string().optional(),
    phoneNumber: z.string(),
    goals: z.string(),
    education: z.string().optional(),
    experience: z.string().optional(),
    comments: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

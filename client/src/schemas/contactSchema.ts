import { z } from "zod";

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string(),
  title: z.string(),
  message: z.string(),
});

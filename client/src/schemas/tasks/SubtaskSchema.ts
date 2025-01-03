import { z } from "zod";

export const SubtaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

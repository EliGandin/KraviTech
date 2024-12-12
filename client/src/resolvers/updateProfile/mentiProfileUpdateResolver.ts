import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateProfileSchema } from "@/schemas/updateProfile/MentiUpdateProfileSchema.ts";

export const mentiUpdateProfileResolver = {
  resolver: zodResolver(UpdateProfileSchema),
  defaultValues: {
    name: undefined,
    email: undefined,
    phone_number: undefined,
    education: undefined,
    goals: undefined,
    experience: undefined,
    comments: undefined,
  },
};

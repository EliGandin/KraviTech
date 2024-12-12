import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateProfileSchema } from "@/schemas/updateProfile/MentorUpdateProfileSchema.ts";

export const mentorUpdateProfileResolver = {
  resolver: zodResolver(UpdateProfileSchema),
  defaultValues: {
    name: undefined,
    email: undefined,
    phone_number: undefined,
    company: undefined,
    field: undefined,
    experience: undefined,
  },
};

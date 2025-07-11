import { zodResolver } from "@hookform/resolvers/zod";

import { MentorSignupFormSchema } from "@/schemas/signup/MentorSignupFormSchema.ts";

export const mentorSignupResolver = {
  resolver: zodResolver(MentorSignupFormSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    position: "",
    company: "",
  },
};

import { zodResolver } from "@hookform/resolvers/zod";
import { MentiSignupFormSchema } from "@/schemas/signup/MentiSignupFormSchema.ts";

export const mentiSignupResolver = {
  resolver: zodResolver(MentiSignupFormSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    education: "",
    experience: "",
    goals: "",
    comments: "",
  },
};

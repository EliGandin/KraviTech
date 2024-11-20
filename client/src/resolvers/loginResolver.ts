import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/LoginSchema.ts";

export const loginResolver = {
  resolver: zodResolver(LoginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
};

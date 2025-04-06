import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema } from "@/schemas/contactSchema.ts";

export const contactResolver = {
  resolver: zodResolver(contactSchema),
  defaultValues: {
    name: "",
    email: "",
    phone_number: "",
    title: "",
    message: "",
  },
};

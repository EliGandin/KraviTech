import { zodResolver } from "@hookform/resolvers/zod";

import { SubtaskSchema } from "@/schemas/tasks/SubtaskSchema.ts";

export const subtaskResolver = {
  resolver: zodResolver(SubtaskSchema),
  defaultValues: {
    title: "",
    description: "",
  },
};

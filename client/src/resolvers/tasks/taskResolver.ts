import { zodResolver } from "@hookform/resolvers/zod";

import { TaskSchema } from "@/schemas/tasks/TaskSchema.ts";

export const taskResolver = {
  resolver: zodResolver(TaskSchema),
  defaultValues: {
    title: "",
    description: "",
  },
};

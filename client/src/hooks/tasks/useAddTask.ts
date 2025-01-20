import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addTask } from "@/services/taskServices.ts";
import { NewTask } from "@/global/interfaces/tasksInterfaces.ts";

export const useAddTask = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateTask, isPending } = useMutation({
    mutationKey: ["addTask", id],
    mutationFn: (data: NewTask) => addTask(id, data),
    onSuccess: async () => {
      toast.success("Task has been added successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getTasksByMentor"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getTasksByMenti", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutateTask, isPending };
};

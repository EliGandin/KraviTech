import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addSubtask } from "@/services/taskServices.ts";
import { Subtask } from "@/global/interfaces/tasksInterfaces.ts";

export const useAddSubtask = (taskId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateSubtask, isPending } = useMutation({
    mutationKey: ["addSubtask", taskId],
    mutationFn: (data: Subtask) => addSubtask(taskId, data),
    onSuccess: async () => {
      toast.success("Subtask has been added successfully");
      await queryClient.invalidateQueries({
        queryKey: ["getTasksByMentor", taskId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getTasksByMenti", taskId],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutateSubtask, isPending };
};

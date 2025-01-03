import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addSubtask } from "@/services/tasks/mentorTaskServices.ts";
import { Subtask } from "@/global/interfaces/tasksInterfaces.ts";

export const useAddSubtask = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateSubtask, isPending } = useMutation({
    mutationKey: ["addSubtask", id],
    mutationFn: (data: Subtask) => addSubtask(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getTasksByMentor", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutateSubtask, isPending };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeTaskStatus } from "@/services/taskServices.ts";

export const useChangeTaskStatus = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateTaskStatus, isPending: isPendingStatusChange } =
    useMutation({
      mutationKey: ["changeTaskStatus", id],
      mutationFn: (status: string) => changeTaskStatus(id, status),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getTasksByMentor"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["getTasksByMenti"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["getTaskDetails", id],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return { mutateTaskStatus, isPendingStatusChange };
};

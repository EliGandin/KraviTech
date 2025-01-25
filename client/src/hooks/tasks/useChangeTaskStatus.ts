import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeTaskStatus } from "@/services/taskServices.ts";
import { toast } from "sonner";

export const useChangeTaskStatus = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateTaskStatus, isPending: isPendingStatusChange } =
    useMutation({
      mutationKey: ["changeTaskStatus", id],
      mutationFn: (status: string) => changeTaskStatus(id, status),
      onSuccess: async () => {
        toast.success("Task status has been added successfully");

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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeSubtaskStatus } from "@/services/taskServices.ts";

export const useChangeSubtaskStatus = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateSubtaskStatus, isPending: isPendingStatusChange } =
    useMutation({
      mutationKey: ["changeTaskStatus", id],
      mutationFn: ({
        subtaskId,
        status,
      }: {
        subtaskId: string;
        status: string;
      }) => changeSubtaskStatus(id, subtaskId, status),
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

  return { mutateSubtaskStatus, isPendingStatusChange };
};

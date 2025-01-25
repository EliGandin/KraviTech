import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateMessage } from "@/services/adminServices.ts";

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: updateMessageMutation } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: ({
      id,
      operator_id,
    }: {
      id: number;
      operator_id: number | null;
    }) => updateMessage(id, operator_id),
    onSuccess: async () => {
      toast.success("Message has been updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMessages"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { updateMessageMutation };
};

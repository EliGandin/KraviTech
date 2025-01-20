import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeMentiOperator } from "@/services/table/mentis/mentiServices.ts";

export const useChangeOperator = () => {
  const queryClient = useQueryClient();
  const { mutate: changeOperator } = useMutation({
    mutationKey: ["changeOperator"],
    mutationFn: ({ id, operatorId }: { id: number; operatorId: number }) =>
      changeMentiOperator(id, operatorId),
    onSuccess: async () => {
      toast.success("Operator has been changed successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { changeOperator };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMenti } from "@/services/table/mentis/mentiServices.ts";

export const useDeleteMenti = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: deactivateMenti } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: () => deleteMenti(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
      await queryClient.invalidateQueries({ queryKey: ["getMenti", id] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deactivateMenti };
};

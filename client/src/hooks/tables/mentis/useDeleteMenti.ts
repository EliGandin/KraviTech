import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMenti } from "@/services/tablesServices.ts";

export const useDeleteMenti = () => {
  const queryClient = useQueryClient();
  const { mutate: deactivateMenti } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: ({ id }: { id: number }) => deleteMenti(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deactivateMenti };
};

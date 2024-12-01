import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeMentiStatus } from "@/services/table/mentis/mentiServices.ts";

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: changeStatus } = useMutation({
    mutationKey: ["changeMentiStatus"],
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      changeMentiStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { changeStatus };
};

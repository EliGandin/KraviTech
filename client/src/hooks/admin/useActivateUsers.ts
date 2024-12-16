import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateUsers } from "@/services/adminServices.ts";

export const useActivateUsers = () => {
  const queryClient = useQueryClient();
  const { mutate: activate } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      activateUsers(id, role),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getPendingUsers"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getMentors"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { activate };
};

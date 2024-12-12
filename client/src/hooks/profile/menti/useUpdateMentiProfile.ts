import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { updateProfile } from "@/services/table/mentis/mentiServices.ts";

export const useUpdateProfile = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (data: Partial<IMenti>) => updateProfile(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMenti", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
};

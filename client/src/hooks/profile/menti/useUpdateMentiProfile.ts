import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { updateProfile } from "@/services/table/mentis/mentiServices.ts";

export const useUpdateProfile = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (data: Partial<IMenti>) => updateProfile(id, data),
    onSuccess: async () => {
      toast.success("Profile has been updated successfully");
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

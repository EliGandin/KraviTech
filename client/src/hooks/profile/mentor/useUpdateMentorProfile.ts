import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { updateProfile } from "@/services/table/mentors/mentorServices.ts";

export const useUpdateProfile = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (data: Partial<IMentor>) => updateProfile(id, data),
    onSuccess: async () => {
      toast.success("Profile has been updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMentor", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putProfileImage } from "@/services/table/mentis/mentiServices.ts";
import { toast } from "sonner";

export const useUpdateMentiProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (formData: FormData) => putProfileImage(id, formData),
    onSuccess: async () => {
      toast.success("Profile Picture has been updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMentiProfileImage", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { uploadImage };
};

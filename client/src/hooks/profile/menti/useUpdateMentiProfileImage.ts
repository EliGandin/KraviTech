import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putProfileImage } from "@/services/table/mentis/mentiServices.ts";

export const useUpdateMentiProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (formData: FormData) => putProfileImage(id, formData),
    onSuccess: async () => {
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

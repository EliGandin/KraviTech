import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { putProfileImage } from "@/services/table/mentors/mentorServices.ts";

export const useUpdateMentorProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useMutation({
    mutationKey: ["updateProfile", id],
    mutationFn: (formData: FormData) => putProfileImage(id, formData),
    onSuccess: async () => {
      toast.success("Profile Picture has been updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMentorProfileImage", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { uploadImage };
};

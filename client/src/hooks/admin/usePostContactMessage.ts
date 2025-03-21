import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { postContactMessage } from "@/services/adminServices";

export const usePostContactMessage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["contactMessage"],
    mutationFn: postContactMessage,
    onSuccess: async () => {
      toast.success("Message sent successfully");
      await queryClient.invalidateQueries({
        queryKey: ["getMessages"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

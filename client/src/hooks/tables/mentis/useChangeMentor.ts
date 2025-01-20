import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeMentiMentor } from "@/services/table/mentis/mentiServices.ts";

export const useChangeMentor = () => {
  const queryClient = useQueryClient();
  const { mutate: changeMentor } = useMutation({
    mutationKey: ["changeMentor"],
    mutationFn: ({ id, mentorId }: { id: number; mentorId: number }) =>
      changeMentiMentor(id, mentorId),
    onSuccess: async () => {
      toast.success("Mentor has been changed successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getMentis"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { changeMentor };
};

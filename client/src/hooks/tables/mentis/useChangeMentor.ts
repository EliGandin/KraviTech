import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeMentiMentor } from "@/services/table/mentis/mentiServices.ts";

export const useChangeMentor = () => {
  const queryClient = useQueryClient();
  const { mutate: changeMentor } = useMutation({
    mutationKey: ["changeMentor"],
    mutationFn: ({ id, mentorId }: { id: number; mentorId: number }) =>
      changeMentiMentor(id, mentorId),
    onSuccess: async () => {
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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMentor } from "@/services/table/mentors/mentorServices.ts";

export const useDeleteMentor = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate: deactivateMentor } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: () => deleteMentor(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentors"],
      });
      await queryClient.invalidateQueries({ queryKey: ["getMenti", id] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deactivateMentor };
};

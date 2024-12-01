import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMentor } from "@/services/table/mentors/mentorServices.ts";

export const useDeleteMentor = () => {
  const queryClient = useQueryClient();
  const { mutate: deactivateMentor } = useMutation({
    mutationKey: ["activateUsers"],
    mutationFn: ({ id }: { id: number }) => deleteMentor(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentors"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deactivateMentor };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeMentorStatus } from "@/services/table/mentors/mentorServices.ts";

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: changeStatus } = useMutation({
    mutationKey: ["changeMentorStatus"],
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      changeMentorStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMentors"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { changeStatus };
};

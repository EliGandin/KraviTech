import { useQuery } from "@tanstack/react-query";

import { MentorTasks } from "@/global/interfaces/tasksInterfaces.ts";
import { getTasksByMentor } from "@/services/tasks/mentorTaskServices.ts";

export const useGetTasksByMentor = (id: number) => {
  const { data: tasks, isLoading } = useQuery<MentorTasks[]>({
    queryKey: ["getTasksByMentor", id],
    queryFn: () => getTasksByMentor(id),
  });

  return { tasks, isLoading };
};

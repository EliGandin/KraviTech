import { useQuery } from "@tanstack/react-query";

import { getTasksByMenti } from "@/services/taskServices.ts";
import { MentiTasks } from "@/global/interfaces/tasksInterfaces.ts";

export const useGetTaskByMenti = (id: number) => {
  const { data: tasks, isLoading } = useQuery<MentiTasks[]>({
    queryKey: ["getTasksByMenti", id],
    queryFn: () => getTasksByMenti(id),
  });

  return { tasks, isLoading };
};

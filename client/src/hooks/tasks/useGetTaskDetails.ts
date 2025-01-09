import { useQuery } from "@tanstack/react-query";

import { getTaskDetails } from "@/services/taskServices.ts";
import { TaskDetails } from "@/global/interfaces/tasksInterfaces.ts";

export const useGetTaskDetails = (taskId: number, mentiId: number) => {
  const { data: taskDetails, isLoading } = useQuery<TaskDetails[]>({
    queryKey: ["getTaskDetails", taskId],
    queryFn: () => getTaskDetails(taskId, mentiId),
  });

  return { taskDetails, isLoading };
};

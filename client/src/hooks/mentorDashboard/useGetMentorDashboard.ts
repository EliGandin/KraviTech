import { useQuery } from "@tanstack/react-query";

import { getDashboardData } from "@/services/table/mentors/mentorServices.ts";
import { MentorDashboardData } from "@/global/interfaces/dashboardInterfaces.ts";

export const useGetMentorDashboard = (id: number) => {
  const { data, isLoading } = useQuery<MentorDashboardData>({
    queryKey: ["getMentorDashboard", id],
    queryFn: () => getDashboardData(id),
  });

  return { data, isLoading };
};

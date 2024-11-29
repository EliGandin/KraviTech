import { useQuery } from "@tanstack/react-query";

import { getPendingUsers } from "@/services/adminServices.ts";
import { TPendingUsers } from "@/global/interfaces/Props/PendingUserCardProps.ts";

export const useGetPendingUsers = () => {
  const { data: pendingUsers } = useQuery<TPendingUsers>({
    queryKey: ["getPendingUsers"],
    queryFn: getPendingUsers,
  });

  return { pendingUsers };
};

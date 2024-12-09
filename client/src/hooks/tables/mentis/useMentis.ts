import { useQuery } from "@tanstack/react-query";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { getMentis } from "@/services/table/mentis/mentiServices.ts";

export const useMentis = () => {
  const { data: mentis, isLoading } = useQuery<IMenti[]>({
    queryKey: ["getMentis"],
    queryFn: getMentis,
  });

  return { mentis, isLoading };
};

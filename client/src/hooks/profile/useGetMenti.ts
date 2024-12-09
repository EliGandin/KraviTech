import { useQuery } from "@tanstack/react-query";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { getMenti } from "@/services/table/mentis/mentiServices.ts";

export const useGetMenti = (id: number) => {
  const { data: menti, isLoading } = useQuery<IMenti>({
    queryKey: ["getMentor"],
    queryFn: () => getMenti(id),
  });

  return { menti, isLoading };
};

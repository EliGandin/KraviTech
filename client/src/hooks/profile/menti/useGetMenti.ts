import { useQuery } from "@tanstack/react-query";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { getMenti } from "@/services/table/mentis/mentiServices.ts";
import { mapMenti } from "@/utils/mappers/profileMappers.ts";

export const useGetMenti = (id: number) => {
  const { data: menti, isLoading } = useQuery<IMenti>({
    queryKey: ["getMenti", id],
    queryFn: () => getMenti(id),
    select: (data) => mapMenti(data),
  });

  return { menti, isLoading };
};

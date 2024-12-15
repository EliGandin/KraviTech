import { useQuery } from "@tanstack/react-query";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { getMentor } from "@/services/table/mentors/mentorServices.ts";
import { mapMentor } from "@/utils/mappers/profileMappers.ts";

export const useGetMentor = (id: number) => {
  const { data: mentor, isLoading } = useQuery<IMentor>({
    queryKey: ["getMentor", id],
    queryFn: () => getMentor(id),
    select: (data) => mapMentor(data),
  });

  return { mentor, isLoading };
};

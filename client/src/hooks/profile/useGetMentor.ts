import { useQuery } from "@tanstack/react-query";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { getMentor } from "@/services/table/mentors/mentorServices.ts";
import { mapUser } from "@/utils/mappers/profileMappers.ts";

export const useGetMentor = (id: number) => {
  const { data: mentor, isLoading } = useQuery<IMentor>({
    queryKey: ["getMentor"],
    queryFn: () => getMentor(id),
    select: (data) => mapUser(data) as IMentor,
  });

  return { mentor, isLoading };
};

import { useQuery } from "@tanstack/react-query";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import { getMentor } from "@/services/table/mentors/mentorServices.ts";

export const useGetMentor = (id: number) => {
  const { data: mentor } = useQuery<IMentor>({
    queryKey: ["getMentor"],
    queryFn: () => getMentor(id),
  });

  return { mentor };
};

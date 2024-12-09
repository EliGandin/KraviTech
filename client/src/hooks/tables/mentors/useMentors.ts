import { useQuery } from "@tanstack/react-query";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";

import { getMentors } from "@/services/table/mentors/mentorServices.ts";

export const useMentors = () => {
  const { data: mentors, isLoading } = useQuery<IMentor[]>({
    queryKey: ["getMentors"],
    queryFn: getMentors,
  });

  return { mentors, isLoading };
};

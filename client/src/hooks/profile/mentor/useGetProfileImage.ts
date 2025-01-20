import { useQuery } from "@tanstack/react-query";

import { getProfileImage } from "@/services/table/mentors/mentorServices.ts";

export const useGetProfileImage = (id: number) => {
  const { data: image } = useQuery<string | null>({
    queryKey: ["getMentorProfileImage", id],
    queryFn: () => getProfileImage(id),
  });

  return { image };
};

import { useQuery } from "@tanstack/react-query";

import { getProfileImage } from "@/services/table/mentis/mentiServices.ts";

export const useGetMentiProfileImage = (id: number) => {
  const { data: image } = useQuery<string | null>({
    queryKey: ["getMentiProfileImage", id],
    queryFn: () => getProfileImage(id),
  });

  return { image };
};

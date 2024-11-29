import { useQuery } from "@tanstack/react-query";

import { getAllOperators } from "@/services/operatorServices.ts";
import { Operator } from "@/global/interfaces/Props/MessageProps.ts";

export const useGetAllOperators = () => {
  const { data: operators } = useQuery<Operator[]>({
    queryKey: ["getAllOperators"],
    queryFn: getAllOperators,
  });

  return { operators };
};

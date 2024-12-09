import { useQuery } from "@tanstack/react-query";

import { getAllMessages } from "@/services/adminServices.ts";
import { Message } from "@/global/interfaces/Props/MessageProps.ts";

export const useGetAllMessages = () => {
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["getAllMessages"],
    queryFn: getAllMessages,
  });

  return { messages, isLoading };
};

import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { userLogin } from "@/services/loginServices.ts";
import { ILoginResponse } from "@/global/interfaces/loginInterfaces.ts";
import { userAtom } from "@/state/atoms/userAtom.ts";

export const useLogin = () => {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: (data: ILoginResponse) => {
      if (!data) {
        return;
      }

      setUser(data);
      navigate(`/app/tables`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate };
};

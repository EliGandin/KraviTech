import { useState } from "react";

import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

import { userLogin } from "@/services/loginServices.ts";
import { ILoginResponse } from "@/global/interfaces/loginInterfaces.ts";
import { userAtom } from "@/state/atoms/userAtom.ts";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: (data: ILoginResponse | undefined) => {
      if (!data) {
        return;
      }

      setUser(data);
      navigate(`/app/${data?.role}s/${data?.id}/dashboard`);
    },
    onError: (error) => {
      const e = error as AxiosError;
      if (e.response?.status === StatusCodes.NOT_FOUND) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    },
  });

  return { mutate, error };
};

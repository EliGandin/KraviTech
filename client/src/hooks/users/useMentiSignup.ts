import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { mentiSignup } from "@/services/signupServices.ts";
import Swal from "sweetalert2";

export const useMentiSignup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["signupMenti"],
    mutationFn: mentiSignup,
    onSuccess: async () => {
      await Swal.fire({
        title:
          "Your signup has been registered is now pending moderator activation",
        icon: "success",
      });
      navigate(`/login`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { mentorSignup } from "@/services/signupServices.ts";
import Swal from "sweetalert2";

export const useMentorSignup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["signupMentor"],
    mutationFn: mentorSignup,
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

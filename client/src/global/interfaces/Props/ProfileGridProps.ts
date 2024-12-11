import { z } from "zod";
import { useForm } from "react-hook-form";

import { IMenti, IMentor } from "@/global/interfaces/userInterfaces.ts";
import { UpdateProfileSchema } from "@/schemas/MentiUpdateProfileSchema.ts";

export interface MentiProfileGridProps {
  menti: IMenti | undefined;
}

export interface MentiEditableProfileGridProps extends MentiProfileGridProps {
  onSubmit: (data: z.infer<typeof UpdateProfileSchema>) => void;
  form: ReturnType<typeof useForm>;
}

export interface MentorProfileGridProps {
  mentor: IMentor | undefined;
}

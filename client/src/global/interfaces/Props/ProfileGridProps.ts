import { z } from "zod";
import { useForm } from "react-hook-form";

import { IMenti, IMentor } from "@/global/interfaces/userInterfaces.ts";
import { UpdateProfileSchema as MentiUpdateSchema } from "@/schemas/updateProfile/MentiUpdateProfileSchema.ts";
import { UpdateProfileSchema as MentorUpdateSchema } from "@/schemas/updateProfile/MentorUpdateProfileSchema.ts";

export interface MentiProfileGridProps {
  menti: IMenti | undefined;
}

export interface MentiEditableProfileGridProps extends MentiProfileGridProps {
  onSubmit: (data: z.infer<typeof MentiUpdateSchema>) => void;
  form: ReturnType<typeof useForm>;
}

export interface MentorProfileGridProps {
  mentor: IMentor | undefined;
}

export interface MentorEditableProfileGridProps extends MentorProfileGridProps {
  onSubmit: (data: z.infer<typeof MentorUpdateSchema>) => void;
  form: ReturnType<typeof useForm>;
}

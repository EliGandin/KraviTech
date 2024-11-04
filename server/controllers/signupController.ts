import { hash } from "bcrypt";

import { MentiSignup, MentorSignup } from "../globals/types/SignupTypes";
import { createMentor } from "../repositories/mentors";
import { createMenti } from "../repositories/mentis";

export const mentorSignupController = async (mentor: MentorSignup) => {
  const hashedPassword = await hash(mentor.password, 12);
  await createMentor({ ...mentor, password: hashedPassword });
}

export const mentiSignupController = async (menti: MentiSignup) => {
  const hashedPassword = await hash(menti.password, 12);
  await createMenti({ ...menti, password: hashedPassword });
}
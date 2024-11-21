import db from "@/db/db";
import { MentorSignup } from "@/globals/types/Signup.types";
import { Mentor } from "@/globals/types/User.types";
import { Status } from "@/globals/constants";

export const createMentor = async (mentor: MentorSignup): Promise<void> => {
  const query = `INSERT INTO mentors (name, email, phone_number, password, field, company, position, experience, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  await db.query(query, [mentor.name, mentor.email, mentor.phone_number, mentor.password, mentor.field, mentor.company, mentor.position, mentor.experience, Status.PENDING]);
};

export const getAllMentors = async (): Promise<Mentor[]> => {
  const query = `SELECT id,
                        name,
                        email,
                        phone_number,
                        field,
                        company,
                        position,
                        experience,
                        status
                 FROM mentors`;

  const { rows } = await db.query(query);
  return rows;
};

import { MentorSignup } from "../globals/types/SignupTypes";
import db from "../db/db";

export const createMentor = async (mentor: MentorSignup): Promise<void> => {
  const query = `INSERT INTO mentors (name, email, phone_number, password, field, company, position, experience)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

  await db.query(query, [mentor.name, mentor.email, mentor.phone_number, mentor.password, mentor.field, mentor.company, mentor.position, mentor.experience]);
}
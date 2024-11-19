import { MentiSignup } from "@/globals/types/Signup.types";
import db from "../db/db";
import { Menti } from "@/globals/types/User.types";

export const createMenti = async (menti: MentiSignup): Promise<void> => {
  const query = `INSERT INTO mentis (name, email, phone_number, password, education, experience, goals, comments)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

  await db.query(query, [menti.name, menti.email, menti.phone_number, menti.password, menti.education, menti.experience, menti.goals, menti.comments]);
};

export const getAllMentis = async (): Promise<Menti[]> => {
  const query = `SELECT id,
                        name,
                        email,
                        phone_number,
                        education,
                        experience,
                        goals,
                        comments,
                        operator_id,
                        mentor_id
                 FROM mentis`;

  const { rows } = await db.query(query);
  return rows;
};
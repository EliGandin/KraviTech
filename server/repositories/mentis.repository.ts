import db from "@/db/db";
import { MentiSignup } from "@/globals/types/Signup.types";
import { Menti } from "@/globals/types/User.types";
import { Status } from "@/globals/constants";

export const createMenti = async (menti: MentiSignup): Promise<void> => {
  const query = `INSERT INTO mentis (name, email, phone_number, password, education, experience, goals, comments,
                                     status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  await db.query(query, [menti.name, menti.email, menti.phone_number, menti.password, menti.education, menti.experience, menti.goals, menti.comments, Status.PENDING]);
};

export const getAllMentis = async (): Promise<Menti[]> => {
  const query = `SELECT mentis.id,
                        mentis.name,
                        mentis.email,
                        mentis.phone_number,
                        education,
                        mentis.experience,
                        goals,
                        comments,
                        operator_id,
                        admins.name  as operator_name,
                        mentis.status,
                        mentors.id   as mentor_id,
                        mentors.name as mentor_name
                 FROM mentis
                          LEFT JOIN
                      mentors
                      ON
                          mentis.mentor_id = mentors.id
                          LEFT JOIN
                      admins
                      ON
                          mentis.operator_id = admins.id`;

  const { rows } = await db.query(query);
  return rows;
};

export const getMenti = async (id: number): Promise<Menti> => {
  const query = `SELECT mentis.id,
                        mentis.name,
                        mentis.email,
                        mentis.phone_number,
                        education,
                        mentis.experience,
                        goals,
                        comments,
                        operator_id,
                        admins.name  as operator_name,
                        mentis.status,
                        mentis.mentor_id,
                        mentors.name as mentor_name,
                        mentis.start_date,
                        mentis.end_date
                 FROM mentis
                          LEFT JOIN mentors
                                    ON mentis.mentor_id = mentors.id
                          LEFT JOIN admins
                                    ON mentis.operator_id = admins.id
                 WHERE mentis.id = $1`;

  const { rows } = await db.query(query, [id]);
  return rows[0];
};

export const deleteMenti = async (id: number): Promise<void> => {
  const query = `UPDATE mentis
                 SET STATUS   = $1,
                     end_date = NOW()
                 WHERE id = $2`;

  await db.query(query, [Status.INACTIVE, id]);
};

export const changeStatus = async (id: number, status: string): Promise<void> => {
  const query = `UPDATE mentis
                 SET status = $1
                 WHERE id = $2`;

  await db.query(query, [status, id]);
};

export const changeOperator = async (id: number, operator_id: number): Promise<void> => {
  console.log(id, operator_id);
  const query = `UPDATE mentis
                 SET operator_id = $1
                 WHERE id = $2`;

  await db.query(query, [operator_id, id]);
};

export const changeMentor = async (id: number, mentor_id: number): Promise<void> => {
  const query = `UPDATE mentis
                 SET mentor_id = $1
                 WHERE id = $2`;

  await db.query(query, [mentor_id, id]);
};

export const updateProfile = async (id: number, setClause: string, values: (string | number | undefined)[], idPosition: number): Promise<void> => {
  const query = `UPDATE mentis
                 SET ${setClause}
                 where id = $${idPosition}`;

  await db.query(query, [...values, id]);
};
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
  const query = `SELECT id,
                        name,
                        email,
                        phone_number,
                        education,
                        experience,
                        goals,
                        comments,
                        operator_id,
                        status,
                        mentor_id
                 FROM mentis`;

  const { rows } = await db.query(query);
  return rows;
};

export const getMenti = async (id: number): Promise<Menti> => {
  const query = `SELECT id,
                        name,
                        email,
                        phone_number,
                        education,
                        experience,
                        goals,
                        comments,
                        operator_id,
                        status,
                        mentor_id,
                        start_date,
                        end_date
                 FROM mentis
                 WHERE id = $1`;

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
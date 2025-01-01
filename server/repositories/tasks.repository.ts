import db from "@/db/db";
import { Task } from "@/globals/types/Task.type";

export const getTasksByMentor = async (id: number): Promise<Task[]> => {
  const query = `SELECT id,
                        title,
                        description,
                        status,
                        created_date,
                        in_progress_date,
                        completed_date,
                        menti_id,
                        sub_tasks
                 FROM tasks
                 WHERE mentor_id = $1`;

  const { rows } = await db.query(query, [id]);
  return rows;
};

export const getTasksByMenti = async (id: number): Promise<Task[]> => {
  const query = `SELECT id,
                        title,
                        description,
                        status,
                        created_date,
                        in_progress_date,
                        completed_date,
                        menti_id,
                        sub_tasks
                 FROM tasks
                 WHERE menti_id = $1`;

  const { rows } = await db.query(query, [id]);
  return rows;
};
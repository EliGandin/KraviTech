import db from "@/db/db";
import { MentorSignup } from "@/globals/types/Signup.types";
import { Mentor } from "@/globals/types/User.types";
import { Status } from "@/globals/constants";
import { MentorDashboardData } from "@/globals/types/Dashboard.types";

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
                        status,
                        start_date,
                        end_date
                 FROM mentors`;

  const { rows } = await db.query(query);
  return rows;
};

export const getMentor = async (id: number): Promise<Mentor> => {
  const query = `SELECT mentor.id,
                        mentor.name,
                        mentor.email,
                        mentor.phone_number,
                        mentor.field,
                        mentor.company,
                        mentor.position,
                        mentor.experience,
                        mentor.status,
                        mentor.start_date,
                        mentor.end_date,
                        COUNT(menti.id) AS menti_count
                 FROM mentors mentor
                          LEFT JOIN mentis menti ON mentor.id = menti.mentor_id
                 WHERE mentor.id = $1
                 GROUP BY mentor.id, mentor.name, mentor.email, mentor.phone_number, mentor.field, mentor.company,
                          mentor.position, mentor.experience, mentor.status, mentor.start_date, mentor.end_date`;

  const { rows } = await db.query(query, [id]);
  return rows[0];
};

export const deleteMentor = async (id: number): Promise<void> => {
  const query = `UPDATE mentors
                 SET STATUS   = $1,
                     end_date = NOW()
                 WHERE id = $2`;

  await db.query(query, [Status.INACTIVE, id]);
};

export const changeStatus = async (id: number, status: string): Promise<void> => {
  const query = `UPDATE mentors
                 SET status = $1
                 WHERE id = $2`;

  await db.query(query, [status, id]);
};

export const updateProfile = async (id: number, setClause: string, values: (string | number | undefined)[], idPosition: number): Promise<void> => {
  const query = `UPDATE mentors
                 SET ${setClause}
                 where id = $${idPosition}`;

  await db.query(query, [...values, id]);
};

export const getDashboardData = async (id: number): Promise<MentorDashboardData> => {
  const query = `WITH menti_counts AS (SELECT mentor_id,
                                              COUNT(*) AS menti_count
                                       FROM mentis
                                       WHERE mentor_id = $1
                                       GROUP BY mentor_id),
                      menti_task_details AS (SELECT m.id        AS menti_id,
                                                    m.name      AS menti_name,
                                                    COUNT(t.id) AS total_tasks,
                                                    JSON_AGG(
                                                            JSON_BUILD_OBJECT(
                                                                    'task_id', t.id,
                                                                    'status', t.status
                                                            )
                                                    )           AS tasks
                                             FROM mentis m
                                                      LEFT JOIN tasks t ON m.id = t.menti_id
                                             WHERE m.mentor_id = $1
                                             GROUP BY m.id, m.name)
                 SELECT mc.menti_count,
                        COALESCE(JSON_AGG(
                                         JSON_BUILD_OBJECT(
                                                 'menti_id', mtd.menti_id,
                                                 'menti_name', mtd.menti_name,
                                                 'tasks', mtd.tasks
                                         )
                                 ), '[]'::JSON) AS mentis_tasks
                 FROM menti_counts mc
                          LEFT JOIN menti_task_details mtd ON mc.mentor_id = $1
                 GROUP BY mc.menti_count`;

  const { rows } = await db.query(query, [id]);
  return rows[0];
};
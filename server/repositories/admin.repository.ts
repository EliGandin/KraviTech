import db from "@/db/db";
import { Menti, Mentor } from "@/globals/types/User.types";
import { Status } from "@/globals/constants";

export const getAllPendingUsers = async (): Promise<(Menti | Mentor)[]> => {
  const pendingMentorsQuery = `SELECT id,
                                      name,
                                      email,
                                      phone_number,
                                      experience,
                                      status,
                                      start_date,
                                      'mentor' as role
                               FROM mentors
                               WHERE status = $1`;

  const pendingMentisQuery = `SELECT id,
                                     name,
                                     email,
                                     phone_number,
                                     education,
                                     experience,
                                     goals,
                                     comments,
                                     status,
                                     start_date,
                                     'menti' as role
                              FROM mentis
                              WHERE status = $1`;

  const { rows: pendingMentors } = await db.query(pendingMentorsQuery, [Status.PENDING]);
  const { rows: pendingMentis } = await db.query(pendingMentisQuery, [Status.PENDING]);

  return [...pendingMentors, ...pendingMentis];
};

export const activateUser = async (id: number, table: string): Promise<void> => {
  const query = `UPDATE ${table}
                 SET status = $1
                 WHERE id = $2`;

  await db.query(query, [Status.PREPRODUCTION, id]);
};
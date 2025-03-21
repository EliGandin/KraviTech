import db from "@/db/db";
import { Menti, Mentor } from "@/globals/types/User.types";
import { MessageStatus, Status } from "@/globals/constants";
import { Message, NewMessage } from "@/globals/types/Message.type";

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

export const getAllMessages = async (): Promise<Message[]> => {
  const query = `SELECT id,
                        name,
                        email,
                        phone_number,
                        title,
                        message,
                        status,
                        date,
                        operator_id
                 FROM messages
                 WHERE status = $1`;

  const { rows } = await db.query(query, [MessageStatus.OPEN]);
  return rows;
};

export const updateMessage = async (id: number, operator_id: number | null): Promise<void> => {
  const query = `UPDATE messages
                 SET operator_id = $1,
                     status      = $2
                 WHERE id = $3`;

  await db.query(query, [operator_id, MessageStatus.CLOSED, id]);
};

export const postNewMessage = async (data: NewMessage): Promise<void> => {
  const query = `INSERT INTO messages (name, email, phone_number, title, message)
                 values ($1, $2, $3, $4, $5)`;

  await db.query(query, [data.name, data.email, data.phone_number, data.title, data.message]);
};
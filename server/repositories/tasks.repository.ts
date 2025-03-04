import db from "@/db/db";

export const getMentisTaskData = async (mentorId: number) => {
  const query = `SELECT id, name
                 FROM mentis
                 WHERE mentor_id = $1`;

  const { rows } = await db.query(query, [mentorId]);

  return rows;
};
import db from "@/db/db";

export const getAllOperators = async () => {
  const query = `SELECT id, name
                 FROM admins`;


  const { rows } = await db.query(query);
  return rows;
};
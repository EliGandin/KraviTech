import db from "../db/db";

export const login = async (email: string) => {
  const tables = ["mentors", "mentis", "admins"];
  for (const table of tables) {
    const query = `SELECT id, name, password
                   FROM ${table}
                   WHERE email = $1`;

    const { rows } = await db.query(query, [email]);
    if (rows.length > 0) {
      return { ...rows[0], table };
    }
  }

  return null;
};
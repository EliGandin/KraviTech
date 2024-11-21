import { dbTables } from "@/globals/constants";
import { activateUser } from "@/repositories/admin.repository";
import { FieldErrors } from "@/globals/errors/fieldErrors";

export const activationController = async (id: number, role: string) => {
  const table = role + "s";
  if (!dbTables.includes(table))
    throw new Error(FieldErrors.INVALID_ROLE);

  await activateUser(id, table);
};
import { compare } from "bcrypt";

import { loginRepository } from "@/repositories/login.repository";

export const loginController = async (email: string, password: string) => {
  const user = await loginRepository(email);
  if (!user) {
    return null;
  }

  const matchingPassword = await compare(password, user.password);
  if (!matchingPassword) {
    return null;
  }

  const role = user.table.slice(0, -1);
  return { id: user.id, name: user.name, email, role };
};
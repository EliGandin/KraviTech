import { atom } from "recoil";

interface User {
  id: number;
  name: string;
  role: string;
}

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});

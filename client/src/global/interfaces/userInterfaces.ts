export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserResponseInterface {
  id: number;
  name: string;
  role: string;
  message: string;
}

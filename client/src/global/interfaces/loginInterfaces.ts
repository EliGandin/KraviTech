export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  name: string;
  role: string;
  message: string;
}

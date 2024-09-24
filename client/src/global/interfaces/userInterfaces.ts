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

export interface IMentiSignup {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  education: string | null;
  experience: string | null;
  goals: string;
  comments: string | null;
}

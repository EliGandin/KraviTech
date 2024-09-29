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
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  education?: string;
  experience?: string;
  goals: string;
  comments?: string;
}

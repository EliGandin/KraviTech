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

interface IUser {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface IMentiSignup extends IUser {
  education?: string;
  experience?: string;
  goals: string;
  comments?: string;
}

export interface IMentorSignup extends IUser {
  position?: string;
  field?: string;
  company?: string;
  experience?: string;
}

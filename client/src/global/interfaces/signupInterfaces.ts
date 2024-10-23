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

interface IUser {
  name: string;
  email: string;
  phone_number: string;
  role: "mentor" | "menti" | "admin";
  status: "Pending" | "Active" | "Inactive";
}

export interface IMenti extends IUser {
  education?: string;
  experience?: string;
  goals: string;
  comments?: string;
  mentor_name?: string;
  operator_name?: string;
}

export interface IMentor extends IUser {
  position?: string;
  field?: string;
  company?: string;
  experience?: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: "mentor" | "menti" | "admin";
  status: "Pending" | "Pre-production" | "Active" | "Inactive";
}

export interface IMenti extends IUser {
  education?: string;
  experience?: string;
  goals: string;
  comments?: string;
  mentor_name?: string;
  mentor_id?: string;
  operator_name?: string;
  operator_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface IMentor extends IUser {
  position?: string;
  field?: string;
  company?: string;
  experience?: string;
  menti_count?: number;
  start_date?: string;
  end_date?: string;
}

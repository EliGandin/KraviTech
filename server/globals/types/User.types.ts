export type Mentor = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  company: string;
  position: string;
  field: string;
  experience: string;
  status: string;
}

export type Menti = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  education?: string;
  experience?: string;
  goals: string;
  comments?: string;
  operator_id?: number;
  operator_name?: string;
  mentor_id?: number;
  mentor_name?: string;
  status: string;
}



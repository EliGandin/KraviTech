export interface Message {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  status: "OPEN" | "CLOSED";
  date: string;
  operator_id: number | null;
}

export interface Operator {
  id: number;
  name: string;
}

export interface NewMessage {
  name: string;
  email: string;
  phone_number: string;
  title: string;
  message: string;
}

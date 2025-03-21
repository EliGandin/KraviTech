export type Message = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  status: "OPEN" | "CLOSED";
  date: string;
  operator_id: number | null;
}

export type NewMessage = {
  name: string;
  email: string;
  phone_number: string;
  title: string;
  message: string;
}
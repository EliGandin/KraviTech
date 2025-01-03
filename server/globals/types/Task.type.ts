export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
  menti_id: number;
  mentor_id?: number;
  sub_tasks_count: number;
}

export type SubTask = {
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
}
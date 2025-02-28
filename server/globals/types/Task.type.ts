import * as crypto from "node:crypto";

export type Task = {
  task_id: number | string | crypto.UUID;
  title: string;
  description: string;
  status: string;
  created_date: string;
  in_progress_date?: string | null;
  completed_date?: string | null;
  menti_id: number | string;
  mentor_id?: number | string;
  sub_tasks_count: number;
}

export type SubTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_date: string | null;
  in_progress_date: string | null;
  completed_date: string | null;
}
export interface MentorTasks {
  menti_id: number;
  menti_name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
  menti_id: number;
  mentor_id?: number;
  sub_tasks: SubTasks[];
}

interface SubTasks {
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
}

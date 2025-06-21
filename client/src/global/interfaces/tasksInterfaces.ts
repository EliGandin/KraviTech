export interface MentorTasks {
  menti_id: number;
  menti_name: string;
  tasks: Task[];
}

export interface MentiTasks {
  id: number | string;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
  sub_tasks_count: number;
}

export interface Task {
  task_id: number | string;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
  due_date?: Date | string;
  menti_id?: number;
  mentor_id?: number;
  sub_tasks_count: number;
  sub_tasks?: TaskDetails[];
}

export interface TaskDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  in_progress_date: Date;
  completed_date: Date;
}

export interface Subtask {
  taskId: number | string;
  subtask: {
    title: string;
    description: string;
  };
}

export interface NewTask {
  mentor_id: number | string;
  task: {
    title: string;
    description: string;
    due_date: Date;
  };
}

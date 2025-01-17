export interface MentorDashboardData {
  menti_count: number;
  mentis_tasks: MentisTasks[];
}

export interface MentisTasks {
  menti_id: number;
  menti_name: string;
  tasks: ChartMentiTasks[];
}

interface ChartMentiTasks {
  task_id: number;
  status: string;
}

export type MentorDashboardData = {
  menti_count: number;
  mentis_tasks: {
    menti_id: number;
    menti_name: string;
    tasks: {
      task_id: number;
      status: string;
    }[];
  }
}
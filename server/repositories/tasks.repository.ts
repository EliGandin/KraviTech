import db from "@/db/db";
import { SubTask, Task } from "@/globals/types/Task.type";

export const getTasksByMentor = async (id: number): Promise<Task[]> => {
  const query = `SELECT t.menti_id,
                        m.name      AS menti_name,
                        json_agg(json_build_object(
                                'id', t.id,
                                'title', t.title,
                                'description', t.description,
                                'status', t.status,
                                'created_date', t.created_date,
                                'in_progress_date', t.in_progress_date,
                                'completed_date', t.completed_date,
                                'sub_tasks_count', jsonb_array_length(t.sub_tasks)
                                 )) AS tasks
                 FROM tasks t
                          JOIN mentis m ON t.menti_id = m.id
                 WHERE t.mentor_id = $1
                 GROUP BY t.menti_id, m.name
                 ORDER BY t.menti_id;`;

  const { rows } = await db.query(query, [id]);
  return rows;
};

export const getTaskDetails = async (taskId: number, mentiId: number): Promise<SubTask[]> => {
  const query = `SELECT jsonb_agg(sub_task) AS "subTasks"
                 FROM (SELECT jsonb_array_elements(sub_tasks) AS sub_task
                       FROM tasks
                       WHERE id = $1
                         AND menti_id = $2) subtask_elements`;

  const { rows } = await db.query(query, [taskId, mentiId]);
  return rows[0];
};

export const getTasksByMenti = async (id: number): Promise<Task[]> => {
  const query = `SELECT id,
                        title,
                        description,
                        status,
                        created_date,
                        in_progress_date,
                        completed_date,
                        jsonb_array_length(sub_tasks) AS sub_tasks_count
                 FROM tasks
                 WHERE menti_id = $1`;

  const { rows } = await db.query(query, [id]);
  return rows;
};

export const addSubtask = async (id: number, taskId: number, subtask: Partial<SubTask>): Promise<void> => {
  const query = `
      UPDATE tasks
      SET sub_tasks = sub_tasks || $3::jsonb
      WHERE menti_id = $1
        AND id = $2;
  `;

  const subtaskJson = [
    {
      title: subtask.title,
      description: subtask.description,
      status: "NEW",
      created_date: new Date().toISOString(),
      in_progress_date: null,
      completed_date: null,
    },
  ];

  await db.query(query, [id, taskId, JSON.stringify(subtaskJson)]);
};

export const addTask = async (mentiId: number, mentorId: number, task: Partial<Task>): Promise<void> => {
  const query = `INSERT INTO tasks (title, description, menti_id, mentor_id)
                 VALUES ($1, $2, $3, $4);`;

  await db.query(query, [task.title, task.description, mentiId, mentorId]);
};

export const changeTaskStatus = async (id: number, status: string): Promise<void> => {
  const query = `
      UPDATE tasks
      SET status           = $2,
          in_progress_date = CASE
                                 WHEN $2::task_status = 'IN PROGRESS' THEN CURRENT_DATE
                                 ELSE in_progress_date
              END,
          completed_date   = CASE
                                 WHEN $2::task_status = 'COMPLETED' THEN CURRENT_DATE
                                 ELSE completed_date
              END
      WHERE id = $1`;

  await db.query(query, [id, status]);
};

export const changeSubtaskStatus = async (taskId: number, subtaskId: string, status: string): Promise<void> => {
  const query = `
      WITH updated_task AS (SELECT id,
                                   jsonb_agg(
                                           CASE
                                               WHEN sub_task ->> 'id' = $2 THEN
                                                   jsonb_set(
                                                           jsonb_set(
                                                                   jsonb_set(sub_task, '{status}', to_jsonb($3::TEXT)), -- Update status
                                                                   '{in_progress_date}',
                                                                   CASE
                                                                       WHEN $3::task_status = 'IN PROGRESS'
                                                                           THEN to_jsonb(CURRENT_DATE::TEXT)
                                                                       ELSE sub_task -> 'in_progress_date'
                                                                       END
                                                           ),
                                                           '{completed_date}',
                                                           CASE
                                                               WHEN $3::task_status = 'COMPLETED'
                                                                   THEN to_jsonb(CURRENT_DATE::TEXT)
                                                               ELSE sub_task -> 'completed_date'
                                                               END
                                                   )
                                               ELSE sub_task
                                               END
                                   ) AS updated_sub_tasks
                            FROM tasks,
                                 jsonb_array_elements(sub_tasks) AS sub_task
                            WHERE id = $1
                            GROUP BY id)
      UPDATE tasks
      SET sub_tasks = updated_task.updated_sub_tasks
      FROM updated_task
      WHERE tasks.id = updated_task.id;
  `;

  await db.query(query, [taskId, subtaskId, status]);
};
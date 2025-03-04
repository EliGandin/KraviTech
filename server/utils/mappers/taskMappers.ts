import { Task } from "@/globals/types/Task.type";

export const groupTasksByMenti = (tasks: Task[], mentiList: { id: string; name: string }[]) => {
  const mentiMap = Object.fromEntries(mentiList.map(({ id, name }) => [id, name]));

  return tasks.reduce((acc, task) => {
    const { menti_id } = task;
    let mentiEntry = acc.find(entry => entry.menti_id === menti_id);

    if (!mentiEntry) {
      mentiEntry = {
        menti_id: menti_id.toString(),
        menti_name: mentiMap[menti_id] || "Unknown",
        tasks: [],
      };
      acc.push(mentiEntry);
    }

    mentiEntry.tasks.push(task);
    return acc;
  }, [] as { menti_id: string; menti_name: string; tasks: Task[] }[]);
};
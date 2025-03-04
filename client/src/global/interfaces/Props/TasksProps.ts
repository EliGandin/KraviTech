import { Task } from "@/global/interfaces/tasksInterfaces.ts";
import { Dispatch, SetStateAction } from "react";

export interface TaskListProps {
  mentiId: number | string;
  mentiName: string;
  tasks?: Task[];
}

export interface TaskDetailsProps {
  task: Task;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  mentiId?: number | string;
}

export interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  mentiId: number | string;
}

export interface ChangeTaskStatusProps {
  id: number | string;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  subtaskId?: string;
  setSubtaskId?: Dispatch<SetStateAction<string | undefined>>;
}

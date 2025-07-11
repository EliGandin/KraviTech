import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";

import TaskDetails from "./TaskDetails";
import { Task } from "@/global/interfaces/tasksInterfaces.ts";
import { TaskListProps } from "@/global/interfaces/Props/TasksProps.ts";
import AddTaskDialog from "@/pages/Tasks/AddTaskDialog.tsx";

const TaskList = ({ mentiId, mentiName, tasks }: TaskListProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
    useState<boolean>(false);

  const handleDialog = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex flex-row justify-between align-middle">
            Tasks for {mentiName}
            <Button
              onClick={() => {
                setIsAddTaskDialogOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tasks?.map((task: Task) => (
              <li
                key={task.task_id}
                className="rounded-lg border p-4 hover:bg-gray-50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <Badge
                    variant={
                      task.status === "IN_PROGRESS" ? "default" : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <p className="mb-2 text-sm text-gray-600">{task.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{task.sub_tasks_count} subtasks</span>
                  <span>
                    Created: {new Date(task.created_date).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => handleDialog(task)}
                >
                  View Details
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {dialogOpen && selectedTask && (
        <TaskDetails
          task={selectedTask}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}

      {isAddTaskDialogOpen && (
        <AddTaskDialog
          isOpen={isAddTaskDialogOpen}
          onClose={setIsAddTaskDialogOpen}
          mentiId={String(mentiId)}
        />
      )}
    </>
  );
};

export default TaskList;

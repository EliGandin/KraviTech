import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";

import { MentiTasks } from "@/global/interfaces/tasksInterfaces.ts";
import AddTaskDialog from "@/pages/Tasks/AddTaskDialog.tsx";
import { useParams } from "react-router-dom";
import { useGetTaskByMenti } from "@/hooks/tasks/mentis/useGetTasksByMenti.ts";
import Loader from "@/components/shared/Loader.tsx";
import TaskDetails from "@/pages/Tasks/TaskDetails.tsx";

const MentiDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<MentiTasks | null>(null);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
    useState<boolean>(false);

  const { id } = useParams();
  const { tasks, isLoading } = useGetTaskByMenti(Number(id));

  const handleDialog = (task: MentiTasks) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Card className="mx-auto mt-4 w-5/6">
        <CardHeader>
          <CardTitle className="my-auto flex flex-row justify-between align-middle">
            Your Tasks
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
            {tasks?.map((task: MentiTasks) => (
              <li
                key={task.id}
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
          mentiId={Number(id)}
        />
      )}

      {isAddTaskDialogOpen && (
        <AddTaskDialog
          isOpen={isAddTaskDialogOpen}
          onClose={setIsAddTaskDialogOpen}
          mentiId={Number(id)}
        />
      )}
    </>
  );
};

export default MentiDashboard;

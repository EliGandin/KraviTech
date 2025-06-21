// import { useState } from "react";
//
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button.tsx";
// import { PlusCircle } from "lucide-react";
//
// import TaskDetails from "./TaskDetails";
// import { Task } from "@/global/interfaces/tasksInterfaces.ts";
// import { TaskListProps } from "@/global/interfaces/Props/TasksProps.ts";
// import AddTaskDialog from "@/pages/Tasks/AddTaskDialog.tsx";
//
// const TaskList = ({ mentiId, mentiName, tasks }: TaskListProps) => {
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
//     useState<boolean>(false);
//
//   const handleDialog = (task: Task) => {
//     setSelectedTask(task);
//     setDialogOpen(true);
//   };
//
//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle className="my-auto flex flex-row justify-between align-middle">
//             Tasks for {mentiName}
//             <Button
//               onClick={() => {
//                 setIsAddTaskDialogOpen(true);
//               }}
//             >
//               <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
//             </Button>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-2">
//             {tasks?.map((task: Task) => (
//               <li
//                 key={task.task_id}
//                 className="rounded-lg border p-4 hover:bg-gray-50"
//               >
//                 <div className="mb-2 flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">{task.title}</h3>
//                   <Badge
//                     variant={
//                       task.status === "IN_PROGRESS" ? "default" : "secondary"
//                     }
//                   >
//                     {task.status}
//                   </Badge>
//                 </div>
//                 <p className="mb-2 text-sm text-gray-600">{task.description}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>{task.sub_tasks_count} subtasks</span>
//                   <span>
//                     Created: {new Date(task.created_date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="mt-2"
//                   onClick={() => handleDialog(task)}
//                 >
//                   View Details
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//
//       {dialogOpen && selectedTask && (
//         <TaskDetails
//           task={selectedTask}
//           dialogOpen={dialogOpen}
//           setDialogOpen={setDialogOpen}
//         />
//       )}
//
//       {isAddTaskDialogOpen && (
//         <AddTaskDialog
//           isOpen={isAddTaskDialogOpen}
//           onClose={setIsAddTaskDialogOpen}
//           mentiId={String(mentiId)}
//         />
//       )}
//     </>
//   );
// };
//
// export default TaskList;

"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, AlertTriangle } from "lucide-react";

import TaskDetails from "./TaskDetails";
import type { Task } from "@/global/interfaces/tasksInterfaces.ts";
import type { TaskListProps } from "@/global/interfaces/Props/TasksProps.ts";
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

  const getDueDateStatus = (dueDate: string | Date) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        status: "overdue",
        text: `${Math.abs(diffDays)} days overdue`,
        variant: "destructive" as const,
      };
    } else if (diffDays === 0) {
      return {
        status: "today",
        text: "Due today",
        variant: "default" as const,
      };
    } else if (diffDays <= 3) {
      return {
        status: "soon",
        text: `Due in ${diffDays} days`,
        variant: "secondary" as const,
      };
    } else {
      return {
        status: "future",
        text: `Due in ${diffDays} days`,
        variant: "outline" as const,
      };
    }
  };

  const formatDueDate = (dueDate: string | Date) => {
    return new Date(dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
            {tasks?.map((task: Task) => {
              // Fixed: Call the function properly and use correct variable name
              const dueDateInfo = task.due_date
                ? getDueDateStatus(task.due_date)
                : null;

              return (
                <li
                  key={task.task_id}
                  className="rounded-lg border p-4 hover:bg-gray-50"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      {dueDateInfo?.status === "overdue" && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <Badge
                        variant={
                          task.status === "IN_PROGRESS"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="mb-2 text-sm text-gray-600">
                    {task.description}
                  </p>

                  <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
                    <span>{task.sub_tasks_count} subtasks</span>
                    <span>
                      Created:{" "}
                      {new Date(task.created_date).toLocaleDateString()}
                    </span>
                  </div>

                  {task.due_date && (
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Due: {formatDueDate(task.due_date)}
                      </span>
                      {dueDateInfo && (
                        <Badge
                          variant={dueDateInfo.variant}
                          className="text-xs"
                        >
                          {dueDateInfo.text}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleDialog(task)}
                  >
                    View Details
                  </Button>
                </li>
              );
            })}
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

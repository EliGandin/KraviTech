import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import CommentSection from "./CommentSection";

// // Mock API calls - replace with your actual API
// const fetchTaskDetails = async (taskId: number) => {
//   // Simulated API call
//   return {
//     id: taskId,
//     title: "Complete React Tutorial",
//     description: "Go through the entire React tutorial on the official website",
//     status: "In Progress",
//     subtasks: [
//       { id: 1, title: "Setup development environment", completed: true },
//       { id: 2, title: "Learn about components", completed: false },
//       { id: 3, title: "Understand state and props", completed: false },
//     ],
//   };
// };
//
// const addSubtask = async (taskId: number, subtaskTitle: string) => {
//   // Simulated API call
//   console.log(`Adding subtask "${subtaskTitle}" to task ${taskId}`);
//   return { id: Date.now(), title: subtaskTitle, completed: false };
// };

const task = {
  id: 1,
  title: "Complete React Tutorial",
  description: "Go through the entire React tutorial on the official website",
  status: "In Progress",
  subtasks: [
    { id: 1, title: "Setup development environment", completed: true },
    { id: 2, title: "Learn about components", completed: false },
    { id: 3, title: "Understand state and props", completed: false },
  ],
};

interface TaskDetailProps {
  taskId: number;
  onClose: () => void;
}

const TaskDetails = ({ taskId, onClose }: TaskDetailProps) => {
  const [newSubtask, setNewSubtask] = useState("");
  console.log(taskId);
  // const queryClient = useQueryClient();

  // const {
  //   data: task,
  //   isLoading,
  //   error,
  // } = useQuery(["task", taskId], () => fetchTaskDetails(taskId));
  //
  // const addSubtaskMutation = useMutation(
  //   (subtaskTitle: string) => addSubtask(taskId, subtaskTitle),
  //   {
  //     onSuccess: (newSubtask) => {
  //       queryClient.setQueryData(["task", taskId], (oldData: any) => ({
  //         ...oldData,
  //         subtasks: [...oldData.subtasks, newSubtask],
  //       }));
  //       setNewSubtask("");
  //     },
  //   },
  // );

  // if (isLoading) return <div>Loading task details...</div>;
  // if (error) return <div>Error loading task details</div>;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>TITLE</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p>DESCRIPTION</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Subtasks</h3>
            <ul className="space-y-2">
              {task?.subtasks?.map((subtask) => (
                <li key={subtask.id} className="flex items-center">
                  <Checkbox
                    id={`subtask-${subtask.id}`}
                    checked={subtask.completed}
                  />
                  <label htmlFor={`subtask-${subtask.id}`} className="ml-2">
                    {subtask.title}
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex">
              <Input
                placeholder="New subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="mr-2"
              />
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          </div>
          <CommentSection />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;

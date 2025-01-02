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
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { TaskDetailsProps } from "@/global/interfaces/Props/TasksProps.ts";

const TaskDetails = ({ task, dialogOpen, setDialogOpen }: TaskDetailsProps) => {
  const [newSubtask, setNewSubtask] = useState<string>("");

  const addSubtask = () => {
    if (!newSubtask.length) return;

    console.log("Adding subtask:", newSubtask);
    setNewSubtask("");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl p-9">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{task.title}</span>
            <Badge
              variant={task.status === "IN_PROGRESS" ? "default" : "secondary"}
            >
              {task.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p>{task.description}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Subtasks</h3>
            <ul className="space-y-2">
              {task.sub_tasks.map((subtask, index) => (
                <li key={index} className="flex items-center">
                  <Checkbox
                    id={`subtask-${index}`}
                    checked={subtask.status === "COMPLETED"}
                  />
                  <label
                    htmlFor={`subtask-${index}`}
                    className="ml-2 flex-grow"
                  >
                    {subtask.title}
                  </label>
                  <Badge
                    variant={
                      subtask.status === "IN_PROGRESS" ? "default" : "secondary"
                    }
                    className="ml-2"
                  >
                    {subtask.status}
                  </Badge>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex">
              <Input
                placeholder="New subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="mr-2"
              />
              <Button onClick={addSubtask}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          </div>
          <div>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(task.created_date).toLocaleString()}
            </p>
            {task.in_progress_date && (
              <p>
                <strong>Started:</strong>{" "}
                {new Date(task.in_progress_date).toLocaleString()}
              </p>
            )}
            {task.completed_date && (
              <p>
                <strong>Completed:</strong>{" "}
                {new Date(task.completed_date).toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <Button className="mx-auto mt-6 w-1/3">Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;

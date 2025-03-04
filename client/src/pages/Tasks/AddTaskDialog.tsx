import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";

import { TaskSchema } from "@/schemas/tasks/TaskSchema.ts";
import { taskResolver } from "@/resolvers/tasks/taskResolver.ts";
import { useAddTask } from "@/hooks/tasks/useAddTask.ts";
import { AddTaskDialogProps } from "@/global/interfaces/Props/TasksProps.ts";

const AddTaskDialog = ({ isOpen, onClose, mentiId }: AddTaskDialogProps) => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof TaskSchema>>(taskResolver);
  const { mutateTask, isPending } = useAddTask(String(mentiId));

  function onSubmit(task: z.infer<typeof TaskSchema>) {
    if (!task.title || !task.description) {
      return;
    }

    mutateTask({ mentor_id: String(id), task });
    onClose(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill in the details below to add a new task
        </DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
          <div>
            <div className="space-y-2 text-lg">
              <Label htmlFor="new-subtask-title">Title</Label>
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => <Input placeholder="Title" {...field} />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subtask-description">Description</Label>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Textarea placeholder="Description" {...field} />
                )}
              />
            </div>
            <DialogFooter>
              <Button className="mx-auto mt-3 w-1/3" disabled={isPending}>
                Add Task
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;

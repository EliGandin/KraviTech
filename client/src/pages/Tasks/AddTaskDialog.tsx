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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { useParams } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import type { TaskSchema } from "@/schemas/tasks/TaskSchema.ts";
import { taskResolver } from "@/resolvers/tasks/taskResolver.ts";
import { useAddTask } from "@/hooks/tasks/useAddTask.ts";
import type { AddTaskDialogProps } from "@/global/interfaces/Props/TasksProps.ts";

const AddTaskDialog = ({ isOpen, onClose, mentiId }: AddTaskDialogProps) => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof TaskSchema>>(taskResolver);
  const { mutateTask, isPending } = useAddTask(String(mentiId));

  function onSubmit(task: z.infer<typeof TaskSchema>) {
    if (!task.title || !task.description || !task.due_date) {
      return;
    }
    console.log(task);
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
          <div className="space-y-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Controller
                name="due_date"
                control={form.control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
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

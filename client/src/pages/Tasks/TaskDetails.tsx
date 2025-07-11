import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Loader from "@/components/shared/Loader.tsx";
import { TaskDetailsProps } from "@/global/interfaces/Props/TasksProps.ts";
import { TaskSchema } from "@/schemas/tasks/TaskSchema.ts";
import { taskResolver } from "@/resolvers/tasks/taskResolver.ts";
import { useGetTaskDetails } from "@/hooks/tasks/useGetTaskDetails.ts";
import { useAddSubtask } from "@/hooks/tasks/useAddSubtask.ts";
import ChangeStatus from "@/pages/Tasks/ChangeStatus.tsx";

const TaskDetails = ({ task, dialogOpen, setDialogOpen }: TaskDetailsProps) => {
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState<boolean>(false);
  const [selectedSubtaskId, setSelectedSubtaskId] = useState<
    string | undefined
  >(undefined);
  const { taskDetails, isLoading } = useGetTaskDetails(String(task.task_id));
  const { mutateSubtask, isPending } = useAddSubtask(String(task.task_id));

  const form = useForm<z.infer<typeof TaskSchema>>(taskResolver);

  function onSubmit(subtask: z.infer<typeof TaskSchema>) {
    if (!subtask.title || !subtask.description) {
      return;
    }

    mutateSubtask({ taskId: String(task.task_id), subtask });
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl scroll-mr-10 overflow-y-auto pt-10">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-2xl">{task.title}</span>
              <Badge
                variant={
                  task.status === "IN_PROGRESS" ? "default" : "secondary"
                }
              >
                {task.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex-1">
                <DialogDescription className="text-lg font-semibold">
                  Description
                </DialogDescription>
                <p>{task.description}</p>
              </div>
              <Button
                className="h-5/6"
                onClick={() => setIsStatusChangeOpen(true)}
              >
                Change Status
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Subtasks</h3>
              <Accordion type="single" collapsible className="w-full">
                {taskDetails?.length ? (
                  taskDetails?.map((subtask, index) => (
                    <AccordionItem key={index} value={`subtask-${index}`}>
                      <AccordionTrigger>
                        <div className="flex w-full items-center justify-between">
                          <span>{subtask.title}</span>
                          <Badge
                            onClick={() => {
                              setSelectedSubtaskId(subtask.id);
                              setIsStatusChangeOpen(true);
                            }}
                            variant={
                              subtask.status === "IN_PROGRESS"
                                ? "default"
                                : "secondary"
                            }
                            className="ml-2"
                          >
                            {subtask.status}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">{subtask.description}</p>
                        <div className="text-sm text-gray-500">
                          <p>
                            Created:{" "}
                            {new Date(subtask.created_date).toLocaleString()}
                          </p>
                          {subtask.in_progress_date && (
                            <p>
                              Started:{" "}
                              {new Date(
                                subtask.in_progress_date,
                              ).toLocaleString()}
                            </p>
                          )}
                          {subtask.completed_date && (
                            <p>
                              Completed:{" "}
                              {new Date(
                                subtask.completed_date,
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <p>No subtasks</p>
                )}
              </Accordion>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
                <div>
                  <h4 className="font-semibold">Add New Subtask</h4>
                  <div className="space-y-2 text-lg">
                    <Label htmlFor="new-subtask-title">Title</Label>
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field }) => (
                        <Input placeholder="Title" {...field} />
                      )}
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
                  <Button className="mt-3" disabled={isPending}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Subtask
                  </Button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Task Dates</h3>
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
        </DialogContent>
      </Dialog>

      {isStatusChangeOpen && (
        <ChangeStatus
          id={task.task_id}
          dialogOpen={isStatusChangeOpen}
          setDialogOpen={setIsStatusChangeOpen}
          subtaskId={selectedSubtaskId}
          setSubtaskId={setSelectedSubtaskId}
        />
      )}
    </>
  );
};

export default TaskDetails;

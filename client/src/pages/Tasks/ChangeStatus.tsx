import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";

import { useChangeTaskStatus } from "@/hooks/tasks/useChangeTaskStatus.ts";
import { ChangeTaskStatusProps } from "@/global/interfaces/Props/TasksProps.ts";
import { useChangeSubtaskStatus } from "@/hooks/tasks/useChangeSubtaskStatus.ts";

const statusArray = ["New", "In Progress", "Completed", "Cancelled"];

const ChangeStatus = ({
  id,
  dialogOpen,
  setDialogOpen,
  subtaskId,
  setSubtaskId,
}: ChangeTaskStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const { mutateTaskStatus, isPendingStatusChange } = useChangeTaskStatus(id);
  const { mutateSubtaskStatus } = useChangeSubtaskStatus(id);

  const handleChangeStatus = () => {
    if (!selectedStatus) {
      return;
    }

    if (subtaskId) {
      mutateSubtaskStatus({ subtaskId, status: selectedStatus });
    } else {
      mutateTaskStatus(selectedStatus);
    }
    setDialogOpen(false);
  };

  const handleDialog = () => {
    setDialogOpen(false);
    if (setSubtaskId) {
      setSubtaskId(undefined);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>Select the new status</DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value) => setSelectedStatus(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusArray?.map((status: string) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleChangeStatus} disabled={isPendingStatusChange}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatus;

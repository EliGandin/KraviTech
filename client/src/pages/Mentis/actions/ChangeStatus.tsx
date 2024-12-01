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

import { useChangeStatus } from "@/hooks/tables/mentis/useChangeStatus.ts";
import { ActionProps } from "@/global/interfaces/Props/ActionProps.ts";

const statusArray = ["Active", "Inactive", "Pending", "Success"];

// interface ChangeStatusProps {
//   id: number;
//   dialogOpen: boolean;
//   setDialogOpen: Dispatch<SetStateAction<boolean>>;
// }

const ChangeStatus = ({ id, dialogOpen, setDialogOpen }: ActionProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const { changeStatus } = useChangeStatus();

  const handleChangeStatus = () => {
    if (!selectedStatus) {
      return;
    }

    changeStatus({ id, status: selectedStatus });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          <Button onClick={handleChangeStatus}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatus;

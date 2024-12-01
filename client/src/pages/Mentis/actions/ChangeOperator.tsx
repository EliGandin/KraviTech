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

import { useGetAllOperators } from "@/hooks/operators/useGetAllOperators.ts";
import { ActionProps } from "@/global/interfaces/Props/ActionProps.ts";
import { useChangeOperator } from "@/hooks/tables/mentis/useChangeOperator.ts";

const ChangeOperator = ({ id, dialogOpen, setDialogOpen }: ActionProps) => {
  const [selectedOperator, setSelectedOperator] = useState<number>(0);

  const { operators } = useGetAllOperators();
  const { changeOperator } = useChangeOperator();

  const handleChangeOperator = () => {
    if (!selectedOperator) {
      return;
    }

    changeOperator({ id, operatorId: selectedOperator });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Operator</DialogTitle>
          <DialogDescription>Select the new operator</DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value) => setSelectedOperator(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {operators?.map((operator) => (
              <SelectItem key={operator.id} value={String(operator.id)}>
                {operator.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleChangeOperator}>Change Operator</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeOperator;

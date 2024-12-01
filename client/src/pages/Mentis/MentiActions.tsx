import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Swal from "sweetalert2";

import { useDeleteMenti } from "@/hooks/tables/mentis/useDeleteMenti.ts";
import ChangeStatus from "@/pages/Mentis/actions/ChangeStatus.tsx";
import ChangeOperator from "@/pages/Mentis/actions/ChangeOperator.tsx";
import ChangeMentor from "@/pages/Mentis/actions/ChangeMentor.tsx";
import { Link } from "react-router-dom";

const Actions = {
  ChangeStatus: "Change Status",
  ChangeOperator: "Change Operator",
  ChangeMentor: "Change Mentor",
};

interface MentiActionProps {
  id: number;
}

const MentiActions = ({ id }: MentiActionProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [selectedAction, setSelectedAction] = useState<string>("");

  const { deactivateMenti } = useDeleteMenti();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this menti?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });

    if (result.isConfirmed) {
      deactivateMenti({ id });
    }
  };

  const handleSelectAction = (value: string) => {
    setDialogOpen(true);
    setSelectedAction(value);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to={`/mentis/${id}`}>View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleSelectAction(Actions.ChangeStatus)}
          >
            Change Status
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSelectAction(Actions.ChangeOperator)}
          >
            Change Operator
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSelectAction(Actions.ChangeMentor)}
          >
            Change Mentor
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedAction === Actions.ChangeStatus && (
        <ChangeStatus
          id={id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}

      {selectedAction === Actions.ChangeOperator && (
        <ChangeOperator
          id={id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}

      {selectedAction === Actions.ChangeMentor && (
        <ChangeMentor
          id={id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};

export default MentiActions;

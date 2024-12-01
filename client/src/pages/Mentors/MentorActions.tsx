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

import { useDeleteMentor } from "@/hooks/tables/mentors/useDeleteMentor.ts";
import ChangeStatus from "./actions/ChangeStatus.tsx";

interface MentorActionProps {
  id: number;
}

const Actions = {
  ChangeStatus: "Change Status",
};

const MentorActions = ({ id }: MentorActionProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>("");

  const { deactivateMentor } = useDeleteMentor();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this menti?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });

    if (result.isConfirmed) {
      deactivateMentor({ id });
    }
  };

  const handleDialog = () => {
    setSelectedAction(Actions.ChangeStatus);
    setDialogOpen(true);
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
          <DropdownMenuItem onClick={() => console.log(id)}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDialog}>
            Change Status
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
    </>
  );
};

export default MentorActions;

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

import { useDeleteMenti } from "@/hooks/tables/mentis/useDeleteMenti.ts";

interface MentiActionProps {
  id: number;
}

const MentiActions = ({ id }: MentiActionProps) => {
  const { deactivateMenti } = useDeleteMenti();

  const handleDelete = () => {
    deactivateMenti({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => console.log(id)}>
          Change Status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Change Operator</DropdownMenuItem>
        <DropdownMenuItem>Change Mentor</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MentiActions;

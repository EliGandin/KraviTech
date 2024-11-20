import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

import { IMenti } from "@/global/interfaces/userInterfaces";

export const MentiColumns = (): ColumnDef<IMenti>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: () => <div className="text-left">Phone Number</div>,
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phone_number");
      const formattedPhoneNumber =
        phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);

      return <div>{formattedPhoneNumber}</div>;
    },
  },
  {
    accessorKey: "education",
    header: () => <div className="text-left">Education</div>,
  },
  {
    accessorKey: "experience",
    header: () => <div className="text-left">Experience</div>,
  },
  {
    accessorKey: "goals",
    header: () => <div className="text-left">Goals</div>,
  },
  {
    accessorKey: "comments",
    header: () => <div className="text-left">Comments</div>,
  },
  {
    accessorKey: "mentor_name",
    header: () => <div className="text-left">Mentor Name</div>,
  },
  {
    accessorKey: "operator_name",
    header: () => <div className="text-left">Operator Name</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const action = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(action.name)}
            >
              Change Status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

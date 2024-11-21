import { ColumnDef } from "@tanstack/react-table";
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
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox.tsx";

import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import {
  capitalizeValue,
  formatPhoneNumber,
} from "@/utils/formatters/formatFields.ts";

export const MentorColumns = (): ColumnDef<IMentor>[] => [
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
      return <div>{formatPhoneNumber(row.getValue("phone_number"))}</div>;
    },
  },
  {
    accessorKey: "position",
    header: () => <div className="text-left">Position</div>,
  },
  {
    accessorKey: "field",
    header: () => <div className="text-left">Field</div>,
    cell: ({ row }) => {
      return <div>{capitalizeValue(row.getValue("field"))}</div>;
    },
  },
  {
    accessorKey: "company",
    header: () => <div className="text-left">Company</div>,
  },
  {
    accessorKey: "experience",
    header: () => <div className="text-left">Experience</div>,
    cell: ({ row }) => {
      return <div>{capitalizeValue(row.getValue("experience"))}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return <div>{capitalizeValue(row.getValue("status"))}</div>;
    },
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
            <DropdownMenuItem>Change Mentor</DropdownMenuItem>
            <DropdownMenuItem>Change Operator</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

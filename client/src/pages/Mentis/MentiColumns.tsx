import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox.tsx";

import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import {
  capitalizeValue,
  formatPhoneNumber,
} from "@/utils/formatters/formatFields.ts";
import MentiActions from "@/pages/Mentis/MentiActions.tsx";

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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: "education",
    header: () => <div className="text-left">Education</div>,
  },
  {
    accessorKey: "experience",
    header: () => <div className="text-left">Experience</div>,
    cell: ({ row }) => {
      return <div>{capitalizeValue(row.getValue("experience"))}</div>;
    },
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
    cell: ({ row }) => {
      return <div>{row.original.operator_name || "N/A"}</div>;
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
      return <MentiActions id={row.original.id} />;
    },
  },
];

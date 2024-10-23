import { ColumnDef } from "@tanstack/react-table";

import { IMentor } from "@/global/interfaces/userInterfaces";

export const MentorColumns = (): ColumnDef<IMentor>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "field",
    header: "Field",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "experience",
    header: "Experience",
  },
];

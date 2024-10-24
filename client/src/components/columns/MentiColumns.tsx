import { ColumnDef } from "@tanstack/react-table";

import { IMenti } from "@/global/interfaces/userInterfaces";

export const MentiColumns = (): ColumnDef<IMenti>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
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
];

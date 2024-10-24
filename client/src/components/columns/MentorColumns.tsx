import { ColumnDef } from "@tanstack/react-table";

import { IMentor } from "@/global/interfaces/userInterfaces";

export const MentorColumns = (): ColumnDef<IMentor>[] => [
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
    accessorKey: "position",
    header: () => <div className="text-left">Position</div>,
  },
  {
    accessorKey: "field",
    header: () => <div className="text-left">Field</div>,
    cell: ({ row }) => {
      const field: string = row.getValue("field");
      const formattedField = field.charAt(0).toUpperCase() + field.slice(1);

      return <div>{formattedField}</div>;
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
      const experience: string = row.getValue("experience");
      const formattedExperience =
        experience.charAt(0).toUpperCase() + experience.slice(1);

      return <div>{formattedExperience}</div>;
    },
  },
];

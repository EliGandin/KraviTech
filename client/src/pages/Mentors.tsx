import { MentorColumns } from "@/components/ui/table/mentors/MentorColumns";
import TableComponent from "@/components/ui/table/TableComponent";

const arr = [
  {
    name: "John",
    email: "test.com",
    phone_number: "1234567890",
    position: "CEO",
    field: "IT",
    company: "ABC",
    experience: "10 years",
  },
];

const Mentors = () => {
  const columns = MentorColumns();

  return (
    <div className="mx-auto mt-4 flex h-[80vh] w-[80vw] flex-col justify-start rounded-xl bg-slate-200">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentors</p>
        <p>Here is a list of all the mentors</p>
      </div>

      <div>
        <TableComponent data={arr} columns={columns} />
      </div>
    </div>
  );
};

export default Mentors;

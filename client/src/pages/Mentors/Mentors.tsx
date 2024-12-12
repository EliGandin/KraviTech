import { MentorColumns } from "@/pages/Mentors/MentorColumns.tsx";
import TableComponent from "@/components/shared/TableComponent.tsx";
import { useMentors } from "@/hooks/tables/mentors/useMentors.ts";
import Loader from "@/components/shared/Loader.tsx";

const Mentors = () => {
  const { mentors, isLoading } = useMentors();
  const columns = MentorColumns();

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto mt-4 flex h-[80vh] w-[95vw] flex-col justify-start rounded-xl bg-slate-100 p-4">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentors</p>
        <p>Here is a list of all the mentors</p>
      </div>
      <div className="my-4 rounded-md border border-black">
        {mentors && <TableComponent data={mentors} columns={columns} />}
      </div>
    </div>
  );
};

export default Mentors;

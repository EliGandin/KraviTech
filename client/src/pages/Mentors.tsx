import { useQuery } from "@tanstack/react-query";

import { MentorColumns } from "@/components/columns/MentorColumns";
import TableComponent from "@/components/ui/TableComponent";
import { getMentors } from "@/services/tablesServices";
import { IMentor } from "@/global/interfaces/userInterfaces";

const Mentors = () => {
  const { data } = useQuery<IMentor[]>({
    queryKey: ["getMentors"],
    queryFn: getMentors,
  });

  const columns = MentorColumns();

  return (
    <div className="mx-auto mt-4 flex h-[80vh] w-[95vw] flex-col justify-start rounded-xl bg-slate-100 p-4">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentors</p>
        <p>Here is a list of all the mentors</p>
      </div>
      <div className="my-4 rounded-md border border-black">
        {data && <TableComponent data={data} columns={columns} />}
      </div>
    </div>
  );
};

export default Mentors;

import { useQuery } from "@tanstack/react-query";

import { MentiColumns } from "@/components/columns/MentiColumns";
import TableComponent from "@/components/ui/TableComponent";
import { IMenti } from "@/global/interfaces/userInterfaces";
import { getMentis } from "@/services/tablesServices";

const Mentis = () => {
  const { data } = useQuery<IMenti[]>({
    queryKey: ["getMentors"],
    queryFn: getMentis,
  });

  const columns = MentiColumns();

  return (
    <div className="mx-auto mt-4 flex h-[80vh] w-[95vw] flex-col justify-start rounded-xl bg-slate-100 p-4">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentis</p>
        <p>Here is a list of all the mentis</p>
      </div>
      <div className="my-4 rounded-md border border-black">
        {data && <TableComponent data={data} columns={columns} />}
      </div>
    </div>
  );
};

export default Mentis;

import { MentiColumns } from "@/pages/Mentis/MentiColumns.tsx";
import TableComponent from "@/components/ui/TableComponent.tsx";
import { useMentis } from "@/hooks/tables/mentis/useMentis.ts";

const Mentis = () => {
  const { mentis } = useMentis();
  const columns = MentiColumns();

  return (
    <div className="mx-auto mt-4 flex h-[80vh] w-[98vw] flex-col justify-start rounded-xl bg-slate-100 p-4">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentis</p>
        <p>Here is a list of all the mentis</p>
      </div>
      <div className="my-4 rounded-md border border-black">
        {mentis && <TableComponent data={mentis} columns={columns} />}
      </div>
    </div>
  );
};

export default Mentis;

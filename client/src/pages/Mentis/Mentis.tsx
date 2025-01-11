import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MentiColumns } from "@/pages/Mentis/MentiColumns.tsx";
import TableComponent from "@/components/shared/TableComponent.tsx";
import { useMentis } from "@/hooks/tables/mentis/useMentis.ts";
import Loader from "@/components/shared/Loader.tsx";

const Mentis = () => {
  const { mentis, isLoading } = useMentis();
  const columns = MentiColumns();

  if (isLoading) return <Loader />;

  return (
    <Card className="mx-auto mb-2 mt-4 h-fit w-[95vw] px-4 pt-4">
      <CardHeader>
        <CardTitle>Mentis</CardTitle>
        <CardDescription>Here is a list of all the mentis</CardDescription>
      </CardHeader>
      <CardContent>
        {mentis && <TableComponent data={mentis} columns={columns} />}
      </CardContent>
    </Card>
  );
};

export default Mentis;

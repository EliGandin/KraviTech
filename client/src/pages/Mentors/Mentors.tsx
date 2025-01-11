import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MentorColumns } from "@/pages/Mentors/MentorColumns.tsx";
import TableComponent from "@/components/shared/TableComponent.tsx";
import { useMentors } from "@/hooks/tables/mentors/useMentors.ts";
import Loader from "@/components/shared/Loader.tsx";

const Mentors = () => {
  const { mentors, isLoading } = useMentors();
  const columns = MentorColumns();

  if (isLoading) return <Loader />;

  return (
    <Card className="mx-auto mb-2 mt-4 h-fit w-[95vw] px-4 pt-4">
      <CardHeader>
        <CardTitle>Mentors</CardTitle>
        <CardDescription>Here is a list of all the mentors</CardDescription>
      </CardHeader>
      <CardContent>
        {mentors && <TableComponent data={mentors} columns={columns} />}
      </CardContent>
    </Card>
  );
};

export default Mentors;

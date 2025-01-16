import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PieChartMentiTasks from "@/pages/Mentors/Dashboard/Stats/PieChartMentiTasks.tsx";
import TotalNumber from "@/pages/Mentors/Dashboard/Stats/TotalNumber.tsx";

const Statistics = () => {
  return (
    <div className="mx-2 flex flex-row justify-around">
      <PieChartMentiTasks />
      <TotalNumber />
      {/*<Notofications />*/}
    </div>
  );
};

export default Statistics;

import PieChartMentiTasks from "@/pages/Mentors/Dashboard/Stats/PieChartMentiTasks.tsx";
import TotalNumber from "@/pages/Mentors/Dashboard/Stats/TotalNumber.tsx";
import Notifications from "@/pages/Mentors/Dashboard/Stats/Notifications.tsx";

const Statistics = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <PieChartMentiTasks />
        <TotalNumber />
      </div>
      <Notifications />
    </div>
  );
};

export default Statistics;

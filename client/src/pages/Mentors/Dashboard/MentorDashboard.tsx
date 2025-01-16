import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Statistics from "@/pages/Mentors/Dashboard/Statistics.tsx";
import Dashboard from "@/pages/Mentors/Dashboard/Dashboard.tsx";

const MentorDashboard = () => {
  return (
    <Tabs defaultValue="Statistics" className="mx-auto mt-6 w-5/6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="Statistics">Statistics</TabsTrigger>
        <TabsTrigger value="Tasks">Tasks</TabsTrigger>
      </TabsList>
      <TabsContent value="Statistics">
        <Statistics />
      </TabsContent>

      <TabsContent value="Tasks">
        <Dashboard />
      </TabsContent>
    </Tabs>
  );
};

export default MentorDashboard;

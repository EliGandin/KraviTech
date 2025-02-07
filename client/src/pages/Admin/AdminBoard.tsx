import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import Messages from "@/pages/Admin/Messages/Messages.tsx";
import PendingUsers from "@/pages/Admin/PendingUsers/PendingUsers.tsx";

const AdminBoard = () => {
  return (
    <Card className="mx-auto mb-2 mt-4 h-fit w-[95vw] px-4 pt-4">
      <CardHeader>
        <CardTitle>Admin Board</CardTitle>
        <CardDescription>
          Here is Where you handle user activation and messages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="PendingUsers" className="mx-auto mt-6">
          <TabsList className="mx-auto grid w-[40vw] grid-cols-2">
            <TabsTrigger value="PendingUsers">User Activation</TabsTrigger>
            <TabsTrigger value="Messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="PendingUsers">
            <PendingUsers />
          </TabsContent>

          <TabsContent value="Messages">
            <Messages />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminBoard;

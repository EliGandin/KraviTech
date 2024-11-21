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
    <div className="mx-auto mt-4 flex h-[80vh] w-[98vw] flex-col justify-start rounded-xl bg-slate-100 p-4">
      <div className="mx-auto mt-2 flex flex-col rounded-md border border-slate-950 p-1">
        <p>Mentis</p>
        <p>Here is a list of all the mentis</p>
      </div>

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
    </div>
  );
};

export default AdminBoard;

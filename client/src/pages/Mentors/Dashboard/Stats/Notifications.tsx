import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Notifications = () => {
  return (
    <Card className="mt-2 flex w-full flex-col">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>No new notifications</CardDescription>
      </CardContent>
      <CardFooter>
        <CardDescription>Updated 2 minutes ago</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Notifications;

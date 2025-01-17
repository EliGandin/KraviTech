import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TotalNumber = () => {
  return (
    <Card className="ml-2 w-full">
      <CardHeader>
        <CardTitle>Total Number of Mentis</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>1000</CardDescription>
      </CardContent>
      <CardFooter>
        <CardDescription>Updated 2 minutes ago</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default TotalNumber;

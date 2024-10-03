import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupMenti from "./SignupPages/SignupMenti.tsx";
import SignupMentor from "./SignupPages/SignupMentor.tsx";

const Signup = () => {
  return (
    <Tabs defaultValue="Menti" className="mx-auto mt-6 w-1/2">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="Menti">Menti</TabsTrigger>
        <TabsTrigger value="Mentor">Mentor</TabsTrigger>
      </TabsList>
      <TabsContent value="Menti">
        <SignupMenti />
      </TabsContent>

      <TabsContent value="Mentor">
        <SignupMentor />
      </TabsContent>
    </Tabs>
  );
};

export default Signup;

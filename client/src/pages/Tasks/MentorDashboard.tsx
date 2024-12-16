import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";

interface Mentee {
  id: number;
  name: string;
  tasksCount: number;
}

// Mock API call - replace with your actual API
const fetchMentees = async (): Promise<Mentee[]> => {
  // Simulated API call
  return [
    { id: 1, name: "Alice Johnson", tasksCount: 3 },
    { id: 2, name: "Bob Smith", tasksCount: 2 },
    // Add more mentees as needed
  ];
};

const MentorDashboard = () => {
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const {
    data: mentees,
    isLoading,
    error,
  } = useQuery<Mentee[], Error>({
    queryKey: ["mentees"],
    queryFn: fetchMentees,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Mentor Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Mentees</CardTitle>
            <CardDescription>
              Select a mentee to view their tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mentees?.map((mentee) => (
                <li
                  key={mentee.id}
                  className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100"
                  onClick={() => setSelectedMentee(mentee.id)}
                >
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${mentee.name}`}
                      />
                      <AvatarFallback>
                        {mentee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mentee.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {mentee.tasksCount} tasks
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          {selectedMentee ? (
            <TaskList
              menteeId={selectedMentee}
              onSelectTask={setSelectedTask}
            />
          ) : (
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                Select a mentee to view their tasks
              </p>
            </CardContent>
          )}
        </Card>
      </div>
      {selectedTask && (
        <TaskDetails
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <Button
        className="fixed bottom-4 right-4"
        onClick={() => {
          /* Add new task logic */
        }}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
      </Button>
    </div>
  );
};

export default MentorDashboard;

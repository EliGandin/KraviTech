import { useState } from "react";

import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TaskList from "./TaskList";
import { useGetTasksByMentor } from "@/hooks/tasks/mentors/useGetTasksByMentor.ts";
import Loader from "@/components/shared/Loader.tsx";
import { MentorTasks } from "@/global/interfaces/tasksInterfaces.ts";

type SelectedMenti = {
  mentiId: number;
  mentiName: string;
};

const MentorDashboard = () => {
  const [selectedMenti, setSelectedMenti] = useState<SelectedMenti | null>(
    null,
  );

  const { id } = useParams();
  const { tasks, isLoading } = useGetTasksByMentor(Number(id));

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Mentor Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Mentis</CardTitle>
            <CardDescription>
              Select a menti to view their tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks?.map((task) => (
                <li
                  key={task.menti_id}
                  className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100"
                  onClick={() =>
                    setSelectedMenti({
                      mentiId: task.menti_id,
                      mentiName: task.menti_name,
                    })
                  }
                >
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=Menti${task.menti_id}`}
                      />
                      <AvatarFallback>M{task.menti_id}</AvatarFallback>
                    </Avatar>
                    <span>{task.menti_name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {tasks.length} tasks
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          {selectedMenti ? (
            <TaskList
              mentiId={selectedMenti.mentiId}
              mentiName={selectedMenti.mentiName}
              tasks={
                tasks?.find(
                  (el: MentorTasks) => el.menti_id === selectedMenti.mentiId,
                )?.tasks
              }
            />
          ) : (
            <CardContent className="p-8 text-center align-middle">
              <p className="text-gray-500">
                Select a menti to view their tasks
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MentorDashboard;

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  title: string;
  status: "Not Started" | "In Progress" | "Completed";
  subtasks: number;
  comments: number;
}

// Mock API call - replace with your actual API
const fetchTasks = async (menteeId: number): Promise<Task[]> => {
  // Simulated API call
  return [
    {
      id: 1,
      title: "Complete React Tutorial",
      status: "In Progress",
      subtasks: 3,
      comments: 2,
    },
    {
      id: 2,
      title: "Review TypeScript Basics",
      status: "Not Started",
      subtasks: 2,
      comments: 0,
    },
    // Add more tasks as needed
  ];
};

interface TaskListProps {
  menteeId: number;
  onSelectTask: (taskId: number) => void;
}

export default function TaskList({ menteeId, onSelectTask }: TaskListProps) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks", menteeId],
    queryFn: () => fetchTasks(menteeId),
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks?.map((task) => (
            <li
              key={task.id}
              className="rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <Badge
                  variant={
                    task.status === "In Progress" ? "default" : "secondary"
                  }
                >
                  {task.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{task.subtasks} subtasks</span>
                <span>{task.comments} comments</span>
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => onSelectTask(task.id)}
              >
                View Details
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

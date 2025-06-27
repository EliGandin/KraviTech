import { useMemo } from "react";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader.tsx";
import { useGetMentorDashboard } from "@/hooks/mentorDashboard/useGetMentorDashboard.ts";

const PieChartMentiTasks = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMentorDashboard(Number(id));

  const chartData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    data?.mentis_tasks.forEach((menti) => {
      menti.tasks.forEach((task) => {
        statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
      });
    });
    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      fill: `var(--color-${status.toLowerCase()})`,
    }));
  }, [data]);

  const totalTasks = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  const chartConfig: ChartConfig = useMemo(() => {
    return chartData.reduce((config, { status }) => {
      config[status.toLowerCase()] = {
        label: status,
        color: `hsl(var(--chart-${Object.keys(config).length + 1}))`,
      };
      return config;
    }, {} as ChartConfig);
  }, [chartData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Status Distribution</CardTitle>
        <CardDescription>All Mentis`&apos;` Tasks</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {data?.menti_count} Mentis
        </div>
        <div className="leading-none text-muted-foreground">
          Showing task status distribution for all mentis
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartMentiTasks;

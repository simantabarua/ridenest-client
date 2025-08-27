import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface UserDistributionChartProps {
  drivers: number;
  riders: number;
}

const COLORS = ["#0088FE", "#00C49F"];

const UserDistributionChart = ({
  drivers,
  riders,
}: UserDistributionChartProps) => {
  const data = [
    { name: "Drivers", value: drivers },
    { name: "Riders", value: riders },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(Number(percent) * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;

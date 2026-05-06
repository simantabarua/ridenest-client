import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface UserDistributionChartProps {
  drivers: number;
  riders: number;
}

const COLORS = ["#3b82f6", "#10b981"];

const UserDistributionChart = ({
  drivers,
  riders,
}: UserDistributionChartProps) => {
  const data = [
    { name: "Drivers", value: drivers },
    { name: "Riders", value: riders },
  ];

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">User Distribution</CardTitle>
        <CardDescription className="font-medium text-muted-foreground">
          Drivers vs Riders ratio
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.9)", 
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                itemStyle={{ color: "#fff", fontWeight: "bold" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-xs font-bold text-muted-foreground ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Drivers</p>
            <p className="text-2xl font-black text-blue-500">{drivers}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Riders</p>
            <p className="text-2xl font-black text-emerald-500">{riders}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;

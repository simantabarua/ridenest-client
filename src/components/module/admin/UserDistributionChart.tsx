import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface UserDistributionChartProps {
  drivers: number;
  riders: number;
}

const COLORS = ["var(--primary)", "var(--secondary)"];

const UserDistributionChart = ({
  drivers,
  riders,
}: UserDistributionChartProps) => {
  const data = [
    { name: "Drivers", value: drivers },
    { name: "Riders", value: riders },
  ];

  return (
    <Card className="rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)] overflow-hidden h-full">
      <CardHeader className="p-3.5 pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-foreground">User Distribution</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Drivers vs Riders ratio
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3.5 pt-0 flex flex-col items-center">
        <div className="h-[155px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="var(--foreground)"
                    strokeWidth={1.5}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--background)", 
                  border: "2px solid var(--foreground)",
                  borderRadius: "0px",
                  boxShadow: "2px 2px 0px 0px var(--foreground)"
                }}
                itemStyle={{ color: "var(--foreground)", fontWeight: "bold", fontSize: 11 }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={24} 
                iconType="rect"
                formatter={(value) => <span className="text-[10px] font-black text-foreground uppercase ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full mt-3 pt-3 border-t border-foreground/15">
          <div className="text-center">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Drivers</p>
            <p className="text-lg font-black text-foreground">{drivers}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Riders</p>
            <p className="text-lg font-black text-foreground">{riders}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;

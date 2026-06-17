import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  title: string;
  value: number;
}

interface StatsBarChartProps {
  data: ChartData[];
}

const COLORS = ["var(--primary)", "var(--secondary)", "var(--accent)", "#ff4500", "#8b5cf6"];

const StatsBarChart = ({ data }: StatsBarChartProps) => {
  return (
    <Card className="rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)]">
      <CardHeader className="p-3.5 pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-foreground">Platform Overview</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Key performance metrics distribution
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3.5 pt-0">
        <div className="h-[210px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.15)" />
              <XAxis 
                dataKey="title" 
                axisLine={{ stroke: "var(--foreground)", strokeWidth: 1.5 }} 
                tickLine={{ stroke: "var(--foreground)", strokeWidth: 1.5 }} 
                tick={{ fill: "var(--foreground)", fontSize: 10, fontWeight: 700 }}
                dy={5}
              />
              <YAxis 
                axisLine={{ stroke: "var(--foreground)", strokeWidth: 1.5 }} 
                tickLine={{ stroke: "var(--foreground)", strokeWidth: 1.5 }} 
                tick={{ fill: "var(--foreground)", fontSize: 10, fontWeight: 700 }}
              />
              <Tooltip 
                cursor={{ fill: "var(--foreground)", opacity: 0.08 }}
                contentStyle={{ 
                  backgroundColor: "var(--background)", 
                  border: "2px solid var(--foreground)",
                  borderRadius: "0px",
                  boxShadow: "2px 2px 0px 0px var(--foreground)"
                }}
                itemStyle={{ color: "var(--foreground)", fontWeight: "bold", fontSize: 11 }}
                labelStyle={{ color: "var(--muted-foreground)", fontWeight: "bold", fontSize: 10, marginBottom: "2px" }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 0, 0, 0]} 
                barSize={30}
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="var(--foreground)" strokeWidth={1.5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsBarChart;
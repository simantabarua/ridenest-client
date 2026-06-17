import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, className, trend }: StatCardProps) => (
  <Card className={cn(
    "relative rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]",
    className
  )}>
    <CardContent className="p-3.5 flex items-center justify-between gap-3">
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/85">{title}</p>
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-black tracking-tight text-foreground">
            {value}
          </h3>
          {trend && (
            <span className={cn(
              "text-[9px] font-black px-1 py-0.2 rounded-none border border-foreground uppercase tracking-tighter",
              trend.isUp 
                ? "text-green-600 bg-green-500/15" 
                : "text-rose-600 bg-rose-500/15"
            )}>
              {trend.isUp ? "▲" : "▼"} {trend.value}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-primary/20 text-foreground">
        <Icon className="h-4.5 w-4.5" />
      </div>
    </CardContent>
  </Card>
);

export default StatCard;

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
    "group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
    className
  )}>
    <div className="absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
              {value}
            </h3>
            {trend && (
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                trend.isUp 
                  ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                  : "text-rose-500 bg-rose-500/10 border-rose-500/20"
              )}>
                {trend.isUp ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Subtle decorative line */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted/30">
        <div className="h-full w-1/3 rounded-full bg-primary/30 transition-all duration-500 group-hover:w-full group-hover:bg-primary/50" />
      </div>
    </CardContent>
  </Card>
);

export default StatCard;

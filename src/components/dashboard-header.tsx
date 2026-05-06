import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Badge } from "@/components/ui/badge";

export default function DashboardHeader() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { name, role } = userInfo?.data || {};

  return (
    <div className="mb-4 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-2xl tracking-tight">
          Welcome back, {name}!
        </h1>
        <Badge variant="secondary" className="w-fit h-6 px-3 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border-0">
          {role}
        </Badge>
      </div>
      <p className="text-muted-foreground  text-base  leading-relaxed max-w-2xl">
        Here's your dashboard overview for today.
      </p>
    </div>
  );
}
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Badge } from "@/components/ui/badge";

export default function DashboardHeader() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { name, role } = userInfo?.data || {};

  return (
    <div className="mb-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Welcome back, {name}!
        </h1>
        <Badge variant="secondary" className="self-start sm:self-center">
          {role}
        </Badge>
      </div>
      <p className="text-muted-foreground mt-2 text-lg">
        Here's your dashboard overview
      </p>
    </div>
  );
}
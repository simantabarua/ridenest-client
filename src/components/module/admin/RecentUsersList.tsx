import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllUserQuery } from "@/redux/features/admin/admin.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Loading from "@/components/loading";
import { UserPlus } from "lucide-react";

export default function RecentUsersList() {
  const { data: usersData, isLoading } = useGetAllUserQuery(undefined);
  const users = usersData?.data?.data?.slice(0, 5) || [];

  if (isLoading) return <Loading variant="bars" />;

  return (
    <Card className="rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <UserPlus className="h-4 w-4 text-primary" />
          Recent Signups
        </CardTitle>
        <Button variant="outline" size="sm" asChild className="h-7 rounded-none border-2 border-foreground bg-background text-foreground font-black text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all">
          <Link to="/admin/user-management">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3.5 pt-0">
        <div className="space-y-2.5">
          {users.map((user: any) => (
            <div key={user._id} className="flex items-center gap-2.5 pb-2.5 border-b border-foreground/15 last:border-b-0 last:pb-0">
              <Avatar className="h-8 w-8 rounded-none border-2 border-foreground">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback className="bg-primary/20 text-foreground font-black text-xs rounded-none">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black truncate text-foreground leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate max-w-[140px] leading-tight">
                  {user.email}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <Badge variant="outline" className="rounded-none border border-foreground bg-primary/10 text-foreground font-black text-[9px] px-1 py-0 uppercase tracking-tighter">
                  {user.role}
                </Badge>
                <span className="text-[9px] text-muted-foreground font-bold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

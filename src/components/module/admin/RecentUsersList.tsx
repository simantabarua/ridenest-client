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
  const users = usersData?.data?.data?.slice(0, 6) || [];

  if (isLoading) return <Loading variant="bars" />;

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Recent Signups
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/10 font-semibold">
          <Link to="/admin/user-management">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user: any) => (
            <div key={user._id} className="flex items-center gap-4 group">
              <Avatar className="h-10 w-10 border border-border/50 transition-transform group-hover:scale-110">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold leading-none group-hover:text-primary transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {user.email}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0 border-primary/20 text-primary">
                  {user.role}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-medium">
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

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserPlus, UserMinus, Mail, Phone, Users } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetAllUserStatsQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/admin.api";
import Loading from "@/components/loading";
import type { IUser } from "@/types/user.type";
import StatCard from "@/components/module/admin/StatCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const UserCard = ({
  user,
  onSuspend,
  onActivate,
  onDelete,
}: {
  user: IUser;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const actionButton = (
    label: string,
    Icon: React.ElementType,
    action: () => void,
    variant: "outline" | "destructive" = "outline"
  ) => (
    <Button variant={variant} size="sm" onClick={action} className="gap-1">
      <Icon className="w-4 h-4" /> {label}
    </Button>
  );

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* User Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-inner">
              <span className="text-primary font-bold text-lg">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.role}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone || "No phone"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 lg:self-center">
            {actionButton("Suspend", UserMinus, () =>
              onSuspend(user._id as string)
            )}
            {actionButton("Activate", UserPlus, () =>
              onActivate(user._id as string)
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {actionButton("Delete", Trash2, () => {}, "destructive")}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete{" "}
                    <span className="font-semibold">{user.name}</span> and their
                    data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(user._id as string)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UserManagementPage() {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);
  const { data: userStats } = useGetAllUserStatsQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const stats = userStats?.data || [];
  const userList = users?.data?.data || [];

  const handleSuspendUser = async (userId: string) => {
    try {
      const res = await updateUser({
        userId,
        data: { isSuspend: true },
      }).unwrap();

      if (res.success) toast.success("User suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      const res = await updateUser({
        userId,
        data: { isActive: "ACTIVE" },
      }).unwrap();
      if (res.success) toast.success("User activated successfully");
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return <Loading variant="bars" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all users on the platform
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border">
            <Users className="text-muted-foreground" />
            <span className="font-medium">{userList.length} users</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {stats.map((stat: { title: string; value: string }) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={Users}
            />
          ))}
        </div>

        {/* Users */}
        {userList.length === 0 ? (
          <Card className="border-0 shadow-lg text-center py-16">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="text-muted-foreground" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no users registered on the platform yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userList.map((user: IUser) => (
              <UserCard
                key={user._id}
                user={user}
                onSuspend={handleSuspendUser}
                onActivate={handleActivateUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

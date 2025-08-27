import { Card, CardContent } from "@/components/ui/card";
import {
  useDeleteUserMutation,
  useGetDriverStatsQuery,
  useGetDriversQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/admin.api";
import StatCard from "@/components/module/admin/StatCard";
import Loading from "@/components/loading";
import { toast } from "sonner";
import { User2 } from "lucide-react";
import DriverCard from "@/components/module/admin/DriverCard";
import type { IDriverInfo } from "@/types/driver.type";

export default function DriverManagementPage() {
  const { data: driverStats, isLoading: statsLoading } =
    useGetDriverStatsQuery(undefined);
  const { data: driversData, isLoading: driversLoading } =
    useGetDriversQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const stats = driverStats?.data || [];
  const drivers = driversData?.data || [];

  const handleApproveDriver = async (userId: string) => {
    try {
      const res = await updateUser({
        userId,
        data: { isApproved: true, isSuspend: false },
      }).unwrap();

      if (res.success) toast.success("User suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };
  const handleSuspendDriver = async (userId: string) => {
    try {
      const res = await updateUser({
        userId,
        data: { isSuspend: true, isApproved: false },
      }).unwrap();

      if (res.success) toast.success("User suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };

  const handleRejectDriver = async (userId: string) => {

    try {
      const res = await updateUser({
        userId,
        data: { isApproved: false },
      }).unwrap();

      if (res.success) toast.success("User activated successfully");
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };

  const handleDeleteDriver = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (statsLoading || driversLoading) return <Loading variant="bars" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Driver Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all drivers on the platform
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border">
            <span className="font-medium">{drivers.length} drivers</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat: { title: string; value: string }) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={User2}
            />
          ))}
        </div>

        {/* Drivers List */}
        {drivers.length === 0 ? (
          <Card className="border-0 shadow-lg text-center py-16">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No drivers found</h3>
              <p className="text-muted-foreground">
                There are no drivers registered on the platform yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {drivers?.map((driver: IDriverInfo) => (
              <DriverCard
                key={driver._id}
                driver={driver}
                onApprove={handleApproveDriver}
                onReject={handleRejectDriver}
                onSuspend={handleSuspendDriver}
                onDelete={handleDeleteDriver}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

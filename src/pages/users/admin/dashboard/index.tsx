import DashboardHeader from "@/components/dashboard-header";
import Loading from "@/components/loading";
import StatCard from "@/components/module/admin/StatCard";
import StatsBarChart from "@/components/module/admin/StatsBarChart";
import UserDistributionChart from "@/components/module/admin/UserDistributionChart";
import RecentRidesTable from "@/components/module/admin/RecentRidesTable";
import RecentUsersList from "@/components/module/admin/RecentUsersList";
import { useGetAdminStatsQuery } from "@/redux/features/admin/admin.api";
import { Users, Car, User, Route, DollarSign, Activity, Bell, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatItem {
  title: string;
  value: string;
}

export default function AdminDashboard() {
  const { data: adminStats, isLoading } = useGetAdminStatsQuery(undefined);
  const stats = adminStats?.data || [];

  // Get stats by title
  const getStatValue = (title: string): number => {
    const stat = stats.find((s: StatItem) => s.title === title);
    return stat ? parseInt(stat.value) : 0;
  };

  const totalUsers = getStatValue("Total Users");
  const totalDrivers = getStatValue("Total Drivers");
  const totalRiders = getStatValue("Total Riders");
  const totalRides = getStatValue("Total Rides");
  const totalRevenue = getStatValue("Total Revenue");

  const barChartData = [
    { title: "Users", value: totalUsers },
    { title: "Drivers", value: totalDrivers },
    { title: "Riders", value: totalRiders },
    { title: "Rides", value: totalRides },
    { title: "Revenue", value: totalRevenue },
  ];

  const iconMap: Record<string, React.ComponentType> = {
    "Total Users": Users,
    "Total Drivers": Car,
    "Total Riders": User,
    "Total Rides": Route,
    "Total Revenue": DollarSign,
  };

  if (isLoading) {
    return <Loading variant="bars" fullScreen />;
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 space-y-4 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <DashboardHeader />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat: StatItem, index: number) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={iconMap[stat.title] || Users}
          />
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <StatsBarChart data={barChartData} />
        </div>
        <div>
          <UserDistributionChart drivers={totalDrivers} riders={totalRiders} />
        </div>
      </div>

      {/* Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8">
        <div className="lg:col-span-2">
          <RecentRidesTable />
        </div>
        <div>
          <RecentUsersList />
        </div>
      </div>
    </div>
  );
}

import DashboardHeader from "@/components/dashboard-header";
import StatCard from "@/components/module/admin/StatCard";
import StatsBarChart from "@/components/module/admin/StatsBarChart";
import UserDistributionChart from "@/components/module/admin/UserDistributionChart";
import { useGetAdminStatsQuery } from "@/redux/features/admin/admin.api";

import { Users, Car, User, Route, DollarSign } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: StatItem, index: number) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={iconMap[stat.title] || Users}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsBarChart data={barChartData} />
          <UserDistributionChart drivers={totalDrivers} riders={totalRiders} />
        </div>
      </div>
    </div>
  );
}

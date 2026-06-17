import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Car, Star, Clock, DollarSign, Play } from "lucide-react";
import {
  useGetDriverStatsQuery,
  useGetMyRidesQuery,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import {
  useGetAvailabilityQuery,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driver.api";
import RideCard from "@/components/module/ride/RideCard";
import DashboardHeader from "@/components/dashboard-header";
import StatCard from "@/components/module/admin/StatCard";

export default function DriverDashboard() {
  const { data: availability } = useGetAvailabilityQuery(undefined);
  const { data: recentRides } = useGetMyRidesQuery(undefined);
  const [setAvailability] = useSetAvailabilityMutation();
  const { data: driverStats } = useGetDriverStatsQuery(undefined);
  const stats = driverStats?.data;
  const isOnline = availability?.data?.isAvailable;

  const toggleOnlineStatus = async () => {
    try {
      await setAvailability({ isAvailable: !isOnline }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const statIcons: Record<string, any> = {
    "Total Rides": Car,
    "Rating": Star,
    "Hours Online": Clock,
    "Earnings": DollarSign,
  };

  return (
    <div className="min-h-screen space-y-4 animate-in fade-in duration-700">
      {/* Header */}
      <DashboardHeader />

      <div className="container max-w-6xl mx-auto px-4 pb-8 space-y-5">
        {/* Online Status Card */}
        <Card
          className={`rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)]`}
        >
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-none border-2 border-foreground flex items-center justify-center shrink-0 ${
                    isOnline ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                  }`}
                >
                  {isOnline ? (
                    <div className="w-5 h-5 bg-background rounded-none border border-foreground animate-pulse"></div>
                  ) : (
                    <Pause className="w-5 h-5 text-white fill-current" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-foreground">
                    {isOnline ? "Online & Ready" : "Offline / Paused"}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-none">
                    {isOnline
                      ? "Actively receiving ride requests nearby"
                      : "Go online to start receiving ride offers"}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={toggleOnlineStatus}
                variant={isOnline ? "destructive" : "default"}
                className="rounded-none border-2 border-foreground font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all"
              >
                {isOnline ? (
                  <>
                    <Pause className="mr-1 h-3.5 w-3.5 fill-current" />
                    Go Offline
                  </>
                ) : (
                  <>
                    <Play className="mr-1 h-3.5 w-3.5 fill-current" />
                    Go Online
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats?.map(
            (stat: { title: string; value: string }, index: number) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={statIcons[stat.title] || Car}
                className="bg-card"
              />
            )
          )}
        </div>

        {/* Recent Rides */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black uppercase tracking-wider text-foreground">Recent Journeys</h2>
          </div>
          {recentRides?.data?.length === 0 ? (
            <Card className="rounded-none border-2 border-dashed border-foreground bg-muted/10 p-8 text-center">
              <p className="text-xs text-muted-foreground">
                No recent rides in your dispatch log.
              </p>
              <Button size="sm" onClick={toggleOnlineStatus} className="mt-4 rounded-none border-2 border-foreground bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--foreground)] transition-all">
                Go Online to Start
              </Button>
            </Card>
          ) : (
            <div className="grid gap-3">
              {recentRides?.data?.map((ride: IRide) => (
                <RideCard key={ride._id} ride={ride} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

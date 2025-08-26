import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Car, Star, Clock, DollarSign } from "lucide-react";
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

  const statIcons = [
    <Car className="w-5 h-5" />,
    <Star className="w-5 h-5" />,
    <Clock className="w-5 h-5" />,
    <DollarSign className="w-5 h-5" />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <DashboardHeader />

        {/* Online Status Card */}
        <Card
          className={`mb-6 ${
            isOnline ? "border-green-200" : "border-gray-200"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {isOnline ? (
                    <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <Pause className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {isOnline ? "Online" : "Offline"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isOnline
                      ? "Receiving ride requests"
                      : "Go online to start"}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleOnlineStatus}
                variant={isOnline ? "destructive" : "default"}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats?.map(
            (stat: { title: string; value: string }, index: number) => (
              <Card
                key={index}
                className="border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {statIcons[index]}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Recent Rides */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Rides</h2>
          </div>
          {recentRides?.data?.length === 0 ? (
            <Card className="border border-border p-8 text-center">
              <p className="text-muted-foreground">
                You don't have any recent rides
              </p>
              <Button className="mt-4">Go Online to Start</Button>
            </Card>
          ) : (
            <div className="space-y-5">
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

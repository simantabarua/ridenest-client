import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Car,
  DollarSign,
  Clock,
  Star,
  MapPin,
  TrendingUp,
  Target,
  Pause,
  Calendar,
} from "lucide-react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import getStatusColor from "@/utils/getStatus";
import type { IRide } from "@/redux/features/ride/ride.types";
import {
  useGetEarningsQuery,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driver.api";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);

  const { data: rides } = useGetMyRidesQuery(undefined);

  const { data: earnings } = useGetEarningsQuery(undefined);
  const [setAvailability] = useSetAvailabilityMutation();
  console.log(earnings);

  const stats = {
    todayEarnings: "$156.80",
    todayRides: 8,
    todayHours: "6.5",
    weeklyEarnings: "$892.50",
    weeklyTarget: "$1000",
    weeklyProgress: 89,
    rating: 4.9,
    totalRides: 1247,
  };

  const toggleOnlineStatus = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    try {
      const res = await setAvailability({ isAvailable: newStatus }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Driver Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, John!</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Online</span>
            <Switch checked={isOnline} onCheckedChange={toggleOnlineStatus} />
          </div>
        </div>

        {/* Online Status Card */}
        <Card
          className={`mb-6 ${
            isOnline ? "border-green-200 bg-green-50" : "border-gray-200"
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
                size="sm"
                variant={isOnline ? "outline" : "default"}
                className={isOnline ? "border-red-300 text-red-700" : ""}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
                <DollarSign className="w-3 h-3 mr-1 text-green-600" />
                Today's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold">{stats.todayEarnings}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-green-500">+12%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
                <Car className="w-3 h-3 mr-1 text-blue-600" />
                Today's Rides
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold">{stats.todayRides}</div>
              <div className="text-xs text-muted-foreground">
                {stats.todayHours} hours
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-600" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold">{stats.rating}</div>
              <div className="text-xs text-muted-foreground">
                {stats.totalRides} rides
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
                <Target className="w-3 h-3 mr-1 text-purple-600" />
                Weekly Target
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold">{stats.weeklyProgress}%</div>
              <Progress value={stats.weeklyProgress} className="mt-1 h-1.5" />
              <div className="text-xs text-muted-foreground mt-1">
                {stats.weeklyEarnings} of {stats.weeklyTarget}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Rides</h2>
          </div>
          <div className="space-y-4">
            {rides?.data?.map((ride: IRide) => (
              <Card
                key={ride._id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    {/* Left Content */}
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(ride.status)}>
                            {ride.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{ride.createdAt}</span>
                            <span>•</span>
                            <span>{ride.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">Pickup</div>
                            <div className="text-sm text-muted-foreground">
                              {ride.destinationLocation}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              Destination
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ride.pickupLocation}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{ride.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{ride.distance}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex items-center justify-between lg:justify-end lg:space-x-6 mt-4 lg:mt-0">
                      {/* Price and Rating */}
                      <div className="text-right space-y-2">
                        <div className="text-xl font-bold">{ride.fare}tk</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

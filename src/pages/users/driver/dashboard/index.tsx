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
  Navigation,
  Target,
  CheckCircle,
  Pause,
} from "lucide-react";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
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
  const recentRides = [
    {
      id: "DR001",
      time: "2:30 PM",
      from: "123 Main St",
      to: "456 Oak Ave",
      earnings: "$18.50",
      duration: "15 min",
      rating: 5,
      passenger: "Alex Johnson",
    },
    {
      id: "DR002",
      time: "1:45 PM",
      from: "Downtown Office",
      to: "Airport",
      earnings: "$32.00",
      duration: "25 min",
      rating: 5,
      passenger: "Sarah Davis",
    },
  ];
  const upcomingRequests = [
    {
      id: "RQ001",
      pickup: "789 Business Ave",
      destination: "City Center",
      distance: "2.1 mi",
      estimatedEarnings: "$15.50",
      estimatedTime: "8 min",
      passengerRating: 4.8,
      time: "2 min ago",
    },
  ];

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
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
            <Button variant="outline" size="sm" className="text-xs h-7">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentRides.map((ride, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <Car className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {ride.from} → {ride.to}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground space-x-2">
                          <span>{ride.time}</span>
                          <span>•</span>
                          <span>{ride.duration}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{ride.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{ride.earnings}</div>
                      <Badge variant="secondary" className="text-xs h-5">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Requests */}
        {isOnline && upcomingRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Incoming Request</h2>
            <Card className="border-0 shadow-sm border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-sm">Ride Request</h3>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 text-xs h-5"
                        >
                          {upcomingRequests[0].time}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {upcomingRequests[0].pickup} →{" "}
                        {upcomingRequests[0].destination}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{upcomingRequests[0].distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{upcomingRequests[0].estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{upcomingRequests[0].passengerRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-lg font-bold text-blue-600">
                      {upcomingRequests[0].estimatedEarnings}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 h-7 text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

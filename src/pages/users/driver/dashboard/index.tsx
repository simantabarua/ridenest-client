"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Bell,
  Settings,
  Activity,
  Target,
  CheckCircle,
  Pause,
  Play,
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
    {
      id: "DR003",
      time: "12:20 PM",
      from: "Shopping Mall",
      to: "Residential Area",
      earnings: "$12.75",
      duration: "12 min",
      rating: 4,
      passenger: "Mike Wilson",
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
    {
      id: "RQ002",
      pickup: "Hotel Downtown",
      destination: "Train Station",
      distance: "3.5 mi",
      estimatedEarnings: "$22.00",
      estimatedTime: "12 min",
      passengerRating: 4.9,
      time: "5 min ago",
    },
  ];

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    console.log("Online status:", !isOnline);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, John! Ready to earn?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Online Status</span>
              <Switch checked={isOnline} onCheckedChange={toggleOnlineStatus} />
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Online Status Card */}
        <Card
          className={`border-0 shadow-lg mb-8 ${
            isOnline ? "border-green-200 bg-green-50" : "border-gray-200"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {isOnline ? (
                    <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <Pause className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {isOnline ? "You're Online" : "You're Offline"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isOnline
                      ? "You're receiving ride requests"
                      : "Go online to start receiving requests"}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleOnlineStatus}
                size="lg"
                variant={isOnline ? "outline" : "default"}
                className={
                  isOnline ? "border-red-300 text-red-700 hover:bg-red-50" : ""
                }
              >
                {isOnline ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Go Offline
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Go Online
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Today's Earnings
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.todayEarnings}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">+12%</span>
                    <span>from yesterday</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Today's Rides
                  </CardTitle>
                  <Car className="w-4 h-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.todayRides}</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.todayHours} hours online
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Rating
                  </CardTitle>
                  <Star className="w-4 h-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.rating}</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.totalRides} total rides
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Target
                  </CardTitle>
                  <Target className="w-4 h-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.weeklyProgress}%
                  </div>
                  <Progress value={stats.weeklyProgress} className="mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {stats.weeklyEarnings} of {stats.weeklyTarget}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Rides */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Recent Rides</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentRides.map((ride, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{ride.from}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-medium">{ride.to}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{ride.time}</span>
                              <span>•</span>
                              <span>{ride.duration}</span>
                              <span>•</span>
                              <span>{ride.passenger}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{ride.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {ride.earnings}
                          </div>
                          <Badge variant="secondary" className="text-xs">
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
                <h2 className="text-2xl font-semibold mb-4">
                  Incoming Requests
                </h2>
                <div className="space-y-4">
                  {upcomingRequests.map((request, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-lg border-blue-200 bg-blue-50"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Navigation className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">Ride Request</h3>
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-800"
                                >
                                  {request.time}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                                <span>{request.pickup}</span>
                                <span>→</span>
                                <span>{request.destination}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{request.distance}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{request.estimatedTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{request.passengerRating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="text-2xl font-bold text-blue-600">
                              {request.estimatedEarnings}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button variant="outline" size="sm">
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Driver Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Earnings Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  My Ratings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Trip History
                </Button>
              </CardContent>
            </Card>

            {/* Today's Performance */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Today's Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Acceptance Rate
                    </span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. Trip Rating
                    </span>
                    <span className="font-semibold">4.8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Online Time
                    </span>
                    <span className="font-semibold">
                      {stats.todayHours} hrs
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      $24.12/hr
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average hourly rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hot Zones */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Hot Zones</CardTitle>
                <CardDescription>Areas with high demand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium">Downtown</div>
                    <div className="text-sm text-muted-foreground">
                      High demand
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    Hot
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">Airport</div>
                    <div className="text-sm text-muted-foreground">
                      Medium demand
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">Shopping District</div>
                    <div className="text-sm text-muted-foreground">
                      Steady demand
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Good
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Safety Reminders */}
            <Card className="border-0 shadow-lg border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Safety Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Vehicle inspection due in 15 days</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Insurance up to date</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Background check verified</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Car,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";

export default function RiderDashboard() {
  const stats = [
    {
      title: "Total Rides",
      value: "47",
      change: "+12%",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Money Spent",
      value: "$342",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const { data: recentRides, isLoading } = useGetMyRidesQuery(undefined);

  const quickActions = [
    {
      title: "Book a Ride",
      description: "Request a ride now",
      icon: Car,
      action: "/rider/request-ride",
      color: "bg-blue-500",
    },
    {
      title: "View History",
      description: "Check your past rides",
      icon: Clock,
      action: "/rider/ride-history",
      color: "bg-purple-500",
    },
  ];

  if (isLoading) {
    return <Loading variant="bars" />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back, Alex!
          </h1>
          <p className="text-muted-foreground">Here's your ride overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 sm:text-2xl">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3">
                    {action.description}
                  </CardDescription>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-36 justify-start p-0 h-auto"
                  >
                    <Link to={action.action}>
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Rides */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold sm:text-2xl">Recent Rides</h2>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentRides?.data?.map((ride: IRide) => (
              <Card key={ride._id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="font-medium truncate">
                            {ride.pickupLocation}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
                          <span className="font-medium truncate">
                            {ride.destinationLocation}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{ride.createdAt}</span>
                          <span>•</span>
                          {/* <span>{ride.driver}</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">
                        {ride.fare} tk
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {ride.status.replace("_", " ")}
                      </Badge>
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

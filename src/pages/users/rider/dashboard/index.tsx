import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Clock, Star, DollarSign } from "lucide-react";
import {
  useGetMyRidesQuery,
  useGetRiderStatsQuery,
} from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";
import RideCard from "@/components/module/ride/RideCard";
import DashboardHeader from "@/components/dashboard-header";
import EmergencySOS from "@/pages/test";

export default function RiderDashboard() {
  const { data: recentRides, isLoading } = useGetMyRidesQuery(undefined);
  const { data: riderStats } = useGetRiderStatsQuery(undefined);
  const stats = riderStats?.data || [];

  const quickActions = [
    {
      title: "Book a Ride",
      description: "Request a ride now",
      icon: Car,
      action: "/rider/request-ride",
      color: "bg-primary",
    },
    {
      title: "View History",
      description: "Check your past rides",
      icon: Clock,
      action: "/rider/ride-history",
      color: "bg-secondary",
    },
  ];

  const statIcons = [
    <Car className="w-5 h-5" />,
    <Star className="w-5 h-5" />,
    <Clock className="w-5 h-5" />,
    <DollarSign className="w-5 h-5" />,
  ];

  if (isLoading) {
    return <Loading variant="bars" />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map(
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

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <div
                      className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <action.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-1">
                        {action.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Recent Rides</h2>
          </div>

          {recentRides?.data?.length === 0 ? (
            <Card className="border border-border p-8 text-center">
              <p className="text-muted-foreground">
                You don't have any recent rides
              </p>
              <Button className="mt-4">Book Your First Ride</Button>
            </Card>
          ) : (
            <div className="space-y-5">
              {recentRides?.data?.map((ride: IRide) => (
                <RideCard key={ride._id} ride={ride} />
              ))}
            </div>
          )}
        </div>

        <EmergencySOS isActiveRide={true} />
      </div>
    </div>
  );
}

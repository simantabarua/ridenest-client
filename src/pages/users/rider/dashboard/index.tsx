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
    <div className="space-y-10">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(
          (stat: { title: string; value: string }, index: number) => (
            <Card
              key={index}
              className="border border-border bg-background shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                  {statIcons[index]}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="border border-border bg-background shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <action.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1 line-clamp-1">
                      {action.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full h-11 font-semibold shadow-sm transition-transform active:scale-[0.98]">
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Recent Rides</h2>
          <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
             <Link to="/rider/ride-history">View All</Link>
          </Button>
        </div>

        {recentRides?.data?.length === 0 ? (
          <Card className="border border-border border-dashed bg-muted/10 p-12 text-center">
            <div className="max-w-xs mx-auto">
              <Car className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                You don't have any recent rides yet
              </p>
              <Button asChild className="mt-6 shadow-sm">
                 <Link to="/rider/request-ride">Book Your First Ride</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {recentRides?.data?.map((ride: IRide) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Clock, Star, DollarSign, History, ShieldCheck, Zap } from "lucide-react";
import {
  useGetMyRidesQuery,
  useGetRiderStatsQuery,
} from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";
import RideCard from "@/components/module/ride/RideCard";
import DashboardHeader from "@/components/dashboard-header";
import StatCard from "@/components/module/admin/StatCard";

export default function RiderDashboard() {
  const { data: recentRides, isLoading } = useGetMyRidesQuery(undefined);
  const { data: riderStats } = useGetRiderStatsQuery(undefined);
  const stats = riderStats?.data || [];

  const quickActions = [
    {
      title: "Book a Ride",
      description: "Fast and reliable rides at your doorstep",
      icon: Zap,
      action: "/rider/request-ride",
      color: "from-primary to-primary/80",
      iconColor: "text-primary-foreground",
    },
    {
      title: "Ride History",
      description: "Review your past journeys and receipts",
      icon: History,
      action: "/rider/ride-history",
      color: "from-secondary to-secondary/80",
      iconColor: "text-secondary-foreground",
    },
  ];

  const statIcons: Record<string, any> = {
    "Total Rides": Car,
    "Rating": Star,
    "Time Saved": Clock,
    "Total Spent": DollarSign,
  };

  if (isLoading) {
    return <Loading variant="bars" fullScreen />;
  }

  return (
    <div className="min-h-screen space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="relative">
        <DashboardHeader />
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container max-w-7xl mx-auto p-4 space-y-12">
        {/* Stats Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Platform Insights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat: { title: string; value: string }, index: number) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={statIcons[stat.title] || Car}
                className="bg-card/30"
              />
            ))}
          </div>
        </section>

        {/* Quick Actions & Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <CardHeader className="p-6">
                    <div className="flex items-start gap-5">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} ${action.iconColor} shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <action.icon className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-bold">{action.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground/80 leading-relaxed">
                          {action.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button asChild className="w-full h-11 font-bold tracking-wide shadow-md hover:shadow-primary/20 transition-all active:scale-[0.98]">
                      <Link to={action.action}>
                        Launch Action
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Side Promotion/Info Card */}
          <Card className="relative overflow-hidden border-primary/20 bg-primary/5 backdrop-blur-md self-start">
            <div className="absolute top-0 right-0 p-4">
              <ShieldCheck className="h-12 w-12 text-primary/20" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold pt-4">Safety First</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your safety is our top priority. All our drivers are verified and rides are tracked in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  24/7 Support Available
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Verified Drivers Only
                </div>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 transition-colors">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Recent Journeys</h2>
              <p className="text-sm text-muted-foreground">Monitor and manage your latest ride activity</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/5 font-bold tracking-wide">
               <Link to="/rider/ride-history" className="flex items-center gap-2">
                 View All Activity
                 <ArrowRight className="h-4 w-4" />
               </Link>
            </Button>
          </div>

          {recentRides?.data?.length === 0 ? (
            <Card className="border border-border border-dashed bg-muted/5 py-16 text-center rounded-3xl">
              <div className="max-w-xs mx-auto space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/10">
                  <Car className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold pt-4">No rides found</h3>
                  <p className="text-sm text-muted-foreground">
                    Your recent ride activity will appear here once you start booking.
                  </p>
                </div>
                <Button asChild className="px-8 h-12 rounded-full font-bold shadow-lg shadow-primary/20">
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
        </section>
      </div>
    </div>
  );
}

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
      bgClass: "bg-primary/20",
    },
    {
      title: "Ride History",
      description: "Review your past journeys and receipts",
      icon: History,
      action: "/rider/ride-history",
      bgClass: "bg-secondary/20",
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
    <div className="min-h-screen space-y-4 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="relative">
        <DashboardHeader />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pb-8 space-y-6">
        {/* Stats Grid */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Platform Insights</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat: { title: string; value: string }, index: number) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={statIcons[stat.title] || Car}
                className="bg-card"
              />
            ))}
          </div>
        </section>

        {/* Quick Actions & Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Zap className="h-4.5 w-4.5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none border-2 border-foreground ${action.bgClass} text-foreground`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <CardTitle className="text-sm font-bold">{action.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground leading-snug">
                          {action.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <Button asChild size="sm" className="w-full h-8 rounded-none border-2 border-foreground bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all">
                      <Link to={action.action}>
                        Launch Action
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Side Promotion/Info Card */}
          <Card className="rounded-none border-2 border-foreground bg-primary/10 text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)] self-start">
            <CardHeader className="p-4 pb-2 relative">
              <div className="absolute top-2 right-2">
                <ShieldCheck className="h-8 w-8 text-foreground/15" />
              </div>
              <CardTitle className="text-xs font-black uppercase tracking-wider text-foreground">Safety Protocol</CardTitle>
              <CardDescription className="text-xs text-muted-foreground/90 mt-1 leading-normal">
                Verified drivers & real-time trip tracking for your security.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <div className="h-2 w-2 rounded-none border border-foreground bg-primary" />
                  24/7 Live Support
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <div className="h-2 w-2 rounded-none border border-foreground bg-primary" />
                  Real-time GPS Monitoring
                </div>
                <Button variant="outline" size="sm" className="w-full h-7 rounded-none border-2 border-foreground bg-background text-foreground font-black text-[10px] uppercase tracking-wider hover:bg-muted transition-colors">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-black uppercase tracking-wider text-foreground">Recent Journeys</h2>
              <p className="text-xs text-muted-foreground">Monitor and manage your latest ride activity</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-primary hover:bg-primary/5 font-black text-xs uppercase tracking-wider">
               <Link to="/rider/ride-history" className="flex items-center gap-1">
                 View All
                 <ArrowRight className="h-3 w-3" />
               </Link>
            </Button>
          </div>

          {recentRides?.data?.length === 0 ? (
            <Card className="rounded-none border-2 border-dashed border-foreground bg-muted/10 py-10 text-center">
              <div className="max-w-xs mx-auto space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-none border-2 border-foreground bg-muted/20">
                  <Car className="h-6 w-6 text-foreground/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold">No rides found</h3>
                  <p className="text-xs text-muted-foreground">
                    Your recent ride activity will appear here once you start booking.
                  </p>
                </div>
                <Button asChild size="sm" className="px-6 h-8 rounded-none border-2 border-foreground bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--foreground)] transition-all">
                   <Link to="/rider/request-ride">Book Your First Ride</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-3">
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

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, MapPin, Calendar, Clock, Navigation2, MoreHorizontal } from "lucide-react";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface RideCardProps {
  ride: IRide;
}

export default function RideCard({ ride }: RideCardProps) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const userRole = userInfo?.data?.role?.toLowerCase();

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          dot: "bg-emerald-500",
          label: "Completed"
        };
      case "cancelled":
        return {
          color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
          dot: "bg-rose-500",
          label: "Cancelled"
        };
      case "in_progress":
      case "accepted":
      case "ongoing":
      case "intransit":
        return {
          color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
          dot: "bg-amber-500 animate-pulse",
          label: "In Progress"
        };
      case "requested":
        return {
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
          dot: "bg-blue-500",
          label: "Requested"
        };
      default:
        return {
          color: "text-muted-foreground bg-muted border-border",
          dot: "bg-muted-foreground",
          label: status
        };
    }
  };

  const status = getStatusConfig(ride.status);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date),
        time: new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(date)
      };
    } catch (e) {
      return { date: dateString, time: "" };
    }
  };

  const { date, time } = formatDate(ride.createdAt);

  const detailPath = userRole ? `/${userRole}/ride/${ride._id}` : `/rider/ride/${ride._id}`;

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Subtle background glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative flex flex-col md:flex-row items-stretch px-4 gap-4">
        {/* Left: Visual Route & Vehicle */}
        <div className="flex flex-row md:flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-border/50 pb-4 md:pb-0 md:pr-6 lg:pr-8">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Car className="h-7 w-7" />
            </div>
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${status.dot}`} />
          </div>
          
          <div className="hidden md:flex flex-col items-center gap-1 mt-2">
            <div className="h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
            <Navigation2 className="h-4 w-4 text-muted-foreground/40 rotate-180" />
          </div>
        </div>

        {/* Center: Trip Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${status.color} border font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {time}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{ride.estimatedDistance ? `${ride.estimatedDistance} km` : "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">Pickup</p>
              <p className="font-normal text-foreground line-clamp-1 group-hover:text-primary transition-colors" title={ride.pickupLocation}>
                {ride.pickupLocation}
              </p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-1 lg:text-right">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">Destination</p>
              <p className="font-normal text-foreground line-clamp-1 group-hover:text-primary transition-colors" title={ride.destinationLocation}>
                {ride.destinationLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Pricing & Actions */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 lg:pl-8 lg:min-w-[140px]">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-sm font-medium text-muted-foreground">৳</span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {ride.fare}
              </span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Total Fare</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" asChild className="h-9 px-4 font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Link to={detailPath}>
                View Details
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

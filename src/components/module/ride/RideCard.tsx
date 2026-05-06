import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, MapPin,  Calendar } from "lucide-react";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";

interface RideCardProps {
  ride: IRide;
}

export default function RideCard({ ride }: RideCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "in_progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "requested":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Status Indicator Bar (Left on Desktop, Top on Mobile) */}
          <div
            className={`w-full h-1 sm:w-1.5 sm:h-auto ${
              getStatusColor(ride.status).split(" ")[0]
            }`}
          ></div>
          
          <div className="flex-1 p-5">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              {/* Left Side: Ride Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Locations */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-foreground truncate max-w-[150px] sm:max-w-[200px]" title={ride.pickupLocation}>
                        {ride.pickupLocation}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-bold text-foreground truncate max-w-[150px] sm:max-w-[200px]" title={ride.destinationLocation}>
                        {ride.destinationLocation}
                      </span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{ride.estimatedDistance ? `${ride.estimatedDistance} km` : "Distance N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(ride.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Price, Status and Action */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:min-w-[140px] border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                <div className="flex flex-col items-start lg:items-end">
                  <div className="flex items-center text-primary font-black text-2xl tracking-tight">
                    <span className="text-sm font-medium mr-1">৳</span>
                    {ride.fare}
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(ride.status)} capitalize text-[10px] px-2 py-0 h-5 mt-1`}
                  >
                    {ride.status.replace("_", " ")}
                  </Badge>
                </div>
                
                <Button variant="secondary" size="sm" asChild className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Link to={`/rider/ride/${ride._id}`}>
                    Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

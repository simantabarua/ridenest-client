import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, MapPin, DollarSign } from "lucide-react";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";

interface RideCardProps {
  ride: IRide;
}

export default function RideCard({ ride }: RideCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-700";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      case "in_progress":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div
            className={`h-1 ${getStatusColor(ride.status).split(" ")[0]}`}
          ></div>
          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <span className="font-semibold text-foreground truncate">
                      {ride.pickupLocation}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
                    <span className="font-semibold text-foreground truncate">
                      {ride.destinationLocation}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{ride.estimatedDistance || "-"}</span>
                    </div>
                    <span>•</span>
                    <span>{ride.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end mb-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground mr-1" />
                  <div className="font-bold text-xl text-foreground">
                    {ride.fare}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(ride.status)} font-medium mb-2`}
                >
                  {ride.status.replace("_", " ")}
                </Badge>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to={`/rider/ride/${ride._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

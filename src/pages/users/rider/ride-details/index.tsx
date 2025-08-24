import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MessageCircle, User } from "lucide-react";
import { useParams } from "react-router";
import { useGetRideByIdQuery } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import { formatDate, formatTime } from "@/utils/dateTimeFormater";
import Loading from "@/components/loading";
import TimeLine from "@/components/timeline";

export default function RideDetailsPage() {
  const { rideId } = useParams<{ rideId: string }>();
  const { data: ride, isLoading } = useGetRideByIdQuery(rideId);
  const rideDetails: IRide = ride?.data;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  console.log(rideDetails);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Ride Details</h1>
              <p className="text-muted-foreground">
                Review your trip information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Ride Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Trip #{rideDetails?._id}
                    </CardTitle>
                    <CardDescription>
                      {formatDate(rideDetails.createdAt)} at{" "}
                      {formatTime(rideDetails.createdAt)}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(rideDetails.status)}>
                    {rideDetails.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Route */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                      <div>
                        <div className="font-medium">Pickup</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(rideDetails.pickedUpAt as string)} at{" "}
                          {formatTime(rideDetails.pickedUpAt as string)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                      <div>
                        <div className="font-medium">Destination</div>
                        <div className="text-sm text-muted-foreground">
                          {rideDetails.destinationLocation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Info */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {rideDetails.distance}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Distance
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10</div>
                      <div className="text-sm text-muted-foreground">
                        Est. Time
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Driver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">
                        {rideDetails.driver}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{rideDetails.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Trip Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <TimeLine items={rideDetails.timestamps} />
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pricing Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span>{rideDetails.fare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Distance ({rideDetails.distance})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Time ({rideDetails.inTransitAt})
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{rideDetails.fare}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

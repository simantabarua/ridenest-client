import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MessageCircle, User, Clock } from "lucide-react";
import { useParams } from "react-router";
import { useGetRideByIdQuery } from "@/redux/features/ride/ride.api";
import { formatDate, formatTime } from "@/utils/dateTimeFormater";
import Loading from "@/components/loading";
import TimeLine from "@/components/timeline";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function RideDetailsPage() {
  const { rideId } = useParams<{ rideId: string }>();
  const { data: ride, isLoading: isRideLoading } = useGetRideByIdQuery(rideId);
  const { data: userInfo, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  
  const rideDetails = ride?.data;
  const userRole = userInfo?.data?.role;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "in_transit":
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isRideLoading || isUserLoading) return <Loading fullScreen variant="bars" />;

  if (!rideDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Ride Found</h1>
          <p className="text-muted-foreground">
            We couldn't find a ride with that ID
          </p>
        </div>
      </div>
    );
  }

  const {
    timestamps,
    _id,
    pickupLocation,
    destinationLocation,
    estimatedDistance,
    fare,
    driver,
    rider,
    totalFare,
    status,
  } = rideDetails;

  const isDriverOrAdmin = userRole === "DRIVER" || userRole === "ADMIN";

  return (
    <div className="min-h-screen py-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">Ride Details</h1>
            <p className="text-muted-foreground text-lg">
              {isDriverOrAdmin ? "Detailed overview of the trip and rider" : "Detailed overview of your journey"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Ride Status Card */}
            <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="border-b border-border/50 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Trip #{_id.slice(-8).toUpperCase()}</CardTitle>
                    <CardDescription className="font-medium">
                      {formatDate(rideDetails.createdAt)} at {formatTime(rideDetails.createdAt)}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(status)} px-3 py-1 rounded-full font-bold uppercase tracking-wider border`}>
                    {status?.replace("_", " ") || "UNKNOWN"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Route Visual */}
                  <div className="relative space-y-8 pl-8">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-muted-foreground/20 to-rose-500" />
                    
                    <div className="relative">
                      <div className="absolute -left-[26px] top-1 h-4 w-4 rounded-full border-4 border-background bg-emerald-500 shadow-sm" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Pickup Point</div>
                        <div className="text-lg font-semibold leading-snug">{pickupLocation}</div>
                        {timestamps?.requestedAt && (
                          <div className="text-xs text-muted-foreground font-medium">
                            Requested at: {new Date(timestamps.requestedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[26px] top-1 h-4 w-4 rounded-full border-4 border-background bg-rose-500 shadow-sm" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Destination</div>
                        <div className="text-lg font-semibold leading-snug">{destinationLocation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Info Grid */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Distance</div>
                      <div className="text-2xl font-black text-primary">{estimatedDistance} km</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Status</div>
                      <div className="text-lg font-bold text-foreground capitalize">{status?.replace("_", " ") || "N/A"}</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Base Fare</div>
                      <div className="text-2xl font-black text-primary">৳{fare}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Trip Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <TimeLine items={timestamps || {}} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Person Information (Driver or Rider) */}
            <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="text-lg font-bold">
                  {isDriverOrAdmin ? "Rider Information" : "Your Driver"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                    {isDriverOrAdmin && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">
                      {isDriverOrAdmin ? (rider?.name ?? "N/A") : (driver?.name ?? "No Driver Assigned")}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold">
                        {isDriverOrAdmin ? "4.9 (Rider Rating)" : (driver?.rating ?? "N/A")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {isDriverOrAdmin ? (rider?.email ?? "N/A") : (driver?.license ? `License: ${driver.license}` : "Contact for details")}
                    </p>
                  </div>

                  <div className="flex w-full gap-3 pt-2">
                    <Button className="flex-1 font-bold shadow-lg shadow-primary/20">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="text-lg font-bold">Pricing Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Base Fare</span>
                  <span>৳{fare}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Distance Charge</span>
                  <span>৳0.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Booking Fee</span>
                  <span>৳0.00</span>
                </div>
                <div className="pt-4 border-t border-border/50 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Total Paid</div>
                    <div className="text-3xl font-black text-primary leading-none">৳{totalFare || fare}</div>
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary font-bold">PAID</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

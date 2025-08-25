import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Star, Users } from "lucide-react";
import {
  useGetActiveRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import { toast } from "sonner";

export default function ActiveRidePage() {
  const { data: rides } = useGetActiveRidesQuery(undefined);
  const activeRide: IRide = rides?.data?.[0] || null;

  const steps = [
    {
      id: 2,
      name: "Accepted",
      status: "accept",
      time: activeRide?.timestamps?.acceptedAt,
    },
    {
      id: 3,
      name: "Picked Up",
      status: "pickup",
      time: activeRide?.timestamps?.pickedUpAt,
    },
    {
      id: 4,
      name: "In Transit",
      status: "start",
      time: activeRide?.timestamps?.inTransitAt,
    },
    {
      id: 5,
      name: "Completed",
      status: "complete",
      time: activeRide?.timestamps?.completedAt,
    },
  ];

  const nextStepIndex = steps.findIndex((step) => !step.time);

  const [updateRideStatus] = useUpdateRideStatusMutation();

  const handleRequest = async (requestId: string, status: string) => {
    try {
      await updateRideStatus({
        rideId: requestId,
        status: status,
      }).unwrap();

      toast.success("Request Accepted");
    } catch (error) {
      toast.error("Failed to accept the request. Please try again.");
      console.log(error);
    }
  };
  if (!activeRide)
    return (
      <Card className="container border-0 shadow-sm text-center py-8">
        <CardContent>
          <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">No Active Rides</h3>
          <p className="text-muted-foreground text-sm">
            You're all caught up! No active rides at the moment.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              Active Ride
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track your current trip progress
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                    <div>
                      <div className="text-xs md:text-sm font-medium text-muted-foreground">
                        Pickup Location
                      </div>
                      <div className="text-sm md:text-base">
                        {activeRide.pickupLocation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2"></div>
                    <div>
                      <div className="text-xs md:text-sm font-medium text-muted-foreground">
                        Destination
                      </div>
                      <div className="text-sm md:text-base">
                        {activeRide.destinationLocation}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        Distance
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {activeRide.distance}km
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        Earnings
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {activeRide.fare}tk
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">
                  Passenger Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-base md:text-lg">
                          {activeRide.rider.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs md:text-sm">Rating</span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {activeRide.rider.email}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">
                  Trip Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 md:space-y-4">
                  {steps.map((step, index) => {
                    const isNextStep = index === nextStepIndex;
                    const isCompleted = !!step.time;

                    return (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4 ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm md:text-base font-medium ${
                              isCompleted ? "text-green-600" : ""
                            }`}
                          >
                            {step.name}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {step.time || "Pending"}
                          </div>
                        </div>
                        {isNextStep && (
                          <Button
                            size="sm"
                            className="ml-2 h-7 md:h-8 text-xs md:text-sm"
                            onClick={() =>
                              handleRequest(activeRide._id, step.status)
                            }
                          >
                            Done
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Users, CheckCircle, XCircle } from "lucide-react";
import {
  useGetRequestedRideQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import { toast } from "sonner";

export default function IncomingRequestsPage() {
  const { data: rides } = useGetRequestedRideQuery(undefined);
  const requests = rides?.data || [];

  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await updateRideStatus({
        rideId: requestId,
        status: "accept",
      }).unwrap();

      toast.success("Request Accepted");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to accept the request. Please try again."
      );
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await updateRideStatus({
        rideId: requestId,
        status: "reject",
      }).unwrap();

      toast.success("Request Declined");
    } catch (error) {
      toast.error("Failed to decline the request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Incoming Requests</h1>
            <p className="text-muted-foreground text-sm">
              Review and accept ride requests
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request: IRide) => (
              <Card key={request._id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs text-muted-foreground">
                      {request.timestamps.requestedAt}
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-sm">
                          {request.rider.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-medium">Pickup</div>
                        <div className="text-xs text-muted-foreground">
                          {request.pickupLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-medium">Destination</div>
                        <div className="text-xs text-muted-foreground">
                          {request.destinationLocation}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {request.distance}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary">
                        {request.fare}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Est. Earnings
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                      onClick={() => handleAcceptRequest(request._id)}
                      disabled={isLoading}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleDeclineRequest(request._id)}
                      disabled={isLoading}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-sm text-center py-8">
              <CardContent>
                <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  No Incoming Requests
                </h3>
                <p className="text-muted-foreground text-sm">
                  You're all caught up! New requests will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

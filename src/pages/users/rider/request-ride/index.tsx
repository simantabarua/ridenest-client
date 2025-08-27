import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DestinationCard from "@/pages/public/home/components/DestinationCard";
import { useAppSelector } from "@/redux/hooks";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const shortenAddress = (address: string | null, maxLength = 25): string => {
  if (!address) return "Not selected";

  const parts = address.split(",").slice(0, 4);
  const mainPart = parts.join(", ").trim();

  return mainPart.length > maxLength
    ? `${mainPart.substring(0, maxLength)}...`
    : mainPart;
};

export default function RequestRidePage() {
  const tripDetails = useAppSelector((state) => state.trip);
  const {
    pickupLocation,
    destinationLocation,
    estimatedDistance,
    estimatedTime,
    fare,
    totalFare,
  } = tripDetails;
  const [requestRide] = useRequestRideMutation();

  const handleRideRequest = async () => {
    const rideInfo = {
      pickupLocation: pickupLocation as string,
      destinationLocation: destinationLocation as string,
      estimatedDistance: estimatedDistance as number,
      estimatedTime: estimatedTime as number,
      fare: fare as number,
      totalFare: totalFare as number,
    };
    try {
      const response = await requestRide(rideInfo).unwrap();
      if (response.success) {
        toast.success("Ride Requested!", {
          description: "Your ride has been successfully requested.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error requesting ride:", error.data?.message);
      toast.error("Failed to request ride", {
        description: error.data?.message || "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 sm:text-3xl">
            Request a Ride
          </h1>
          <p className="text-muted-foreground">Where would you like to go?</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <DestinationCard />
          </div>
          <div className="w-full lg:w-80">
            <Card className="border-0 shadow-sm lg:sticky lg:top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Pickup</div>
                      <div className="text-xs text-muted-foreground ">
                        {shortenAddress(pickupLocation)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Destination</div>
                      <div className="text-xs text-muted-foreground ">
                        {shortenAddress(destinationLocation)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Distance</span>
                    <span>
                      {estimatedDistance
                        ? `${estimatedDistance.toFixed(1)} mi`
                        : "0.0 mi"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fare rate</span>
                    <span>৳{fare?.toFixed(2)}/km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated time</span>
                    <span>
                      {estimatedTime ? `${estimatedTime} min` : "0 min"}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total fare</span>
                    <span>৳{totalFare?.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!destinationLocation}
                  onClick={handleRideRequest}
                >
                  Request Ride
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                {!destinationLocation && (
                  <p className="text-xs text-muted-foreground text-center">
                    Please enter a destination to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

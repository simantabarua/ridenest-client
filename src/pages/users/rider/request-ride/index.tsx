import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DestinationCard from "@/pages/public/home/components/DestinationCard";
import { useAppSelector } from "@/redux/hooks";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const shortenAddress = (address: string | null, maxLength = 25): string => {
  if (!address) return "Not selected";
  const parts = address.split(",");
  const mainPart = parts[0].trim();
  if (mainPart.length > maxLength) {
    return `${mainPart.substring(0, maxLength)}...`;
  }
  return mainPart;
};

export default function RequestRidePage() {
  const pickupLocation = useAppSelector((state) => state.trip.pickupLocation);
  const destinationLocation = useAppSelector(
    (state) => state.trip.destinationLocation
  );
  const distance = useAppSelector((state) => state.trip.distance);
  const estimatedTime = useAppSelector((state) => state.trip.estimatedTime);
  const price = useAppSelector((state) => state.trip.price);
  const [requestRide] = useRequestRideMutation();

  const handleRideRequest = async () => {
    const rideInfo = {
      pickupLocation: pickupLocation as string,
      destinationLocation: destinationLocation as string,
      fare: price as number,
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
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 sm:text-3xl">
            Request a Ride
          </h1>
          <p className="text-muted-foreground">Where would you like to go?</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Booking Form */}
          <div className="flex-1">
            <DestinationCard />
          </div>

          {/* Trip Summary */}
          <div className="w-full lg:w-80">
            <Card className="border-0 shadow-sm lg:sticky lg:top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Locations */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Pickup</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {shortenAddress(pickupLocation)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Destination</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {shortenAddress(destinationLocation)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fare Breakdown */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Base fare</span>
                    <span>$8.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Distance</span>
                    <span>
                      {distance ? `${distance.toFixed(1)} mi` : "0.0 mi"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time</span>
                    <span>
                      {estimatedTime ? `${estimatedTime} min` : "0 min"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$1.50</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{price ? `$${price.toFixed(2)}` : "$0.00"}</span>
                  </div>
                </div>

                {/* Request Button */}
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

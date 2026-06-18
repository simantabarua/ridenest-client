import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, CreditCard, Banknote } from "lucide-react";
import DestinationCard from "@/pages/public/home/components/DestinationCard";
import { useAppSelector } from "@/redux/hooks";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const {
    pickupLocation,
    destinationLocation,
    estimatedDistance,
    estimatedTime,
    fare,
    totalFare,
  } = tripDetails;
  const [requestRide] = useRequestRideMutation();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const handleRideRequest = async () => {
    const rideInfo = {
      pickupLocation: pickupLocation as string,
      destinationLocation: destinationLocation as string,
      estimatedDistance: estimatedDistance as number,
      estimatedTime: estimatedTime as number,
      fare: fare as number,
      totalFare: totalFare as number,
      paymentMethod,
    };
    try {
      const response = await requestRide(rideInfo).unwrap();
      if (response.success) {
        toast.success("Ride Requested!", {
          description: "Your ride has been successfully requested.",
        });
        navigate("/rider/tracking");
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
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-4xl">
          Request a Ride
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Where would you like to go today?
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Map/Destination Picker */}
        <div className="flex-1 w-full order-2 lg:order-1">
          <DestinationCard showMap={true} />
        </div>

        {/* Right: Trip Summary Sidebar */}
        <div className="w-full lg:w-96 order-1 lg:order-2 lg:sticky lg:top-24">
          <Card className="border border-border shadow-md overflow-hidden bg-background">
            <CardHeader className="bg-muted/30 border-b py-5 px-6">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Car className="w-4 h-4 text-primary" />
                 </div>
                 Trip Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Route Details */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_0_4px_rgba(34,197,94,0.1)]"></div>
                    <div className="w-0.5 h-8 bg-border rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"></div>
                  </div>
                  <div className="space-y-5 flex-1 min-w-0">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Pickup</div>
                      <div className="text-sm font-medium text-foreground truncate" title={pickupLocation || ""}>
                        {shortenAddress(pickupLocation, 40)}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Destination</div>
                      <div className="text-sm font-medium text-foreground truncate" title={destinationLocation || ""}>
                        {shortenAddress(destinationLocation, 40)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Specs */}
              <div className="pt-6 border-t border-dashed border-border space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Estimated Distance</span>
                  <span className="font-semibold text-foreground">
                    {estimatedDistance
                      ? `${estimatedDistance.toFixed(2)} km`
                      : "0.00 km"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Fare Rate</span>
                  <span className="font-semibold text-foreground">৳{fare?.toFixed(2)}/km</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-semibold text-foreground">
                    {estimatedTime ? `${estimatedTime} min` : "0 min"}
                  </span>
                </div>
                {/* Payment Method Selection */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Method</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                        paymentMethod === "cash"
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:bg-muted/30"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${paymentMethod === "cash" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Cash</div>
                        <div className="text-[10px] text-muted-foreground">Pay driver</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:bg-muted/30"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${paymentMethod === "card" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Card</div>
                        <div className="text-[10px] text-muted-foreground">Stripe</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Total Fare */}
                <div className="pt-4 border-t border-border mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-foreground">Total Fare</span>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-medium text-primary tracking-tight">
                        <span className="text-sm font-medium mr-1">৳</span>
                        {totalFare?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3 pt-2">
                <Button
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
                  size="lg"
                  disabled={!destinationLocation}
                  onClick={handleRideRequest}
                >
                  Confirm & Request
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                {!destinationLocation && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-500 text-center font-medium">
                      Select a destination on the map to calculate fare
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

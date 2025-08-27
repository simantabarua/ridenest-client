import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  User,
  Timer,
  MapPin,
  Navigation,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCancelRideMutation,
  useGetActiveRideRiderQuery,
} from "@/redux/features/ride/ride.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/loading";

const formSchema = z.object({
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters.",
  }),
});

export default function TrackingPage() {
  const {
    data: rides,
    isLoading,
    isError,
  } = useGetActiveRideRiderQuery(undefined);
  const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();
  const rideDetails = rides?.data[0];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleCancelRide = async (values: z.infer<typeof formSchema>) => {
    try {
      await cancelRide({
        rideId: rideDetails._id,
        reason: values.reason,
      }).unwrap();
      setIsCancelDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  const openCancelDialog = () => {
    setIsCancelDialogOpen(true);
  };

  if (isLoading) {
    return <Loading variant="bars" fullScreen />;
  }

  if (isError || !rideDetails) {
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
  }

  const {
    pickupLocation,
    destinationLocation,
    estimatedDistance,
    estimatedTime,
    totalFare,
    status,
    timestamps,
    driver,
  } = rideDetails;

  const getStatusColor = () => {
    switch (status) {
      case "REQUESTED":
        return "bg-blue-100 text-blue-800";
      case "ACCEPTED":
        return "bg-yellow-100 text-yellow-800";
      case "PICKED_UP":
        return "bg-purple-100 text-purple-800";
      case "IN_TRANSIT":
        return "bg-indigo-100 text-indigo-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const timelineSteps = [
    { id: 1, name: "Requested", time: timestamps?.requestedAt, icon: Timer },
    {
      id: 2,
      name: "Accepted",
      time: timestamps?.acceptedAt,
      icon: CheckCircle,
    },
    { id: 3, name: "Picked Up", time: timestamps?.pickedUpAt, icon: User },
    {
      id: 4,
      name: "In Transit",
      time: timestamps?.inTransitAt,
      icon: Navigation,
    },
    {
      id: 5,
      name: "Completed",
      time: timestamps?.completedAt,
      icon: CheckCircle,
    },
  ].filter((step) => step.time);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              Track Your Ride
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Monitor your ride status and trip progress
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Ride Status Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl">
                      <Badge
                        className={`text-sm md:text-base px-3 py-1 ${getStatusColor()}`}
                      >
                        {status.replace(/_/g, " ")}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Requested at:{" "}
                      {new Date(timestamps.requestedAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-sm md:text-base px-3 py-1 self-start sm:self-auto"
                  >
                    Est. Time: {estimatedTime} min
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Driver Card */}
            {driver && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Your Driver
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base md:text-lg">
                          {driver.name}
                        </h3>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {driver.rating || "4.5"}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Vehicle:</span>
                          <span>{driver.vehicleModel || "Vehicle Model"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">License:</span>
                          <span>{driver.licensePlate || "ABC123"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trip Progress Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Trip Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-4">
                    {timelineSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isLast = index === timelineSteps.length - 1;

                      return (
                        <div
                          key={step.id}
                          className="flex items-start relative"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 z-10 ${
                              step.time
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0 pb-4">
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-sm md:text-base font-medium ${
                                  step.time ? "text-green-600" : "text-gray-500"
                                }`}
                              >
                                {step.name}
                              </div>
                              {!isLast && (
                                <div className="text-xs text-muted-foreground">
                                  {index === 0
                                    ? "Started"
                                    : index === timelineSteps.length - 1
                                    ? "Completed"
                                    : "Next"}
                                </div>
                              )}
                            </div>
                            {step.time && (
                              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                                {new Date(step.time).toLocaleString([], {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Trip Details Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-medium text-muted-foreground">
                        Pickup
                      </div>
                      <div className="text-sm md:text-base">
                        {pickupLocation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-medium text-muted-foreground">
                        Destination
                      </div>
                      <div className="text-sm md:text-base">
                        {destinationLocation}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {estimatedDistance} km
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Distance
                      </div>
                    </div>
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {estimatedTime} min
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Est. Time
                      </div>
                    </div>
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        ৳{totalFare || 0}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Total
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Dialog
                  open={isCancelDialogOpen}
                  onOpenChange={setIsCancelDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={openCancelDialog}
                      disabled={
                        status === "COMPLETED" || status === "CANCELLED"
                      }
                    >
                      Cancel Ride
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Cancel Ride</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for cancelling your ride. This
                        information helps us improve our service.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleCancelRide)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="reason">Reason</FormLabel>
                              <FormControl>
                                <Input
                                  id="reason"
                                  placeholder="Enter cancellation reason"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsCancelDialogOpen(false);
                              form.reset();
                            }}
                            className="sm:order-1"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            variant="destructive"
                            disabled={isCancelling}
                            className="sm:order-0"
                          >
                            {isCancelling ? (
                              <>Cancelling...</>
                            ) : (
                              "Confirm Cancellation"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, User, Timer,  } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrackingPage() {
  const rideDetails ={
    driver: {
      name: "John Smith",
      rating: 4.8,
      trips: 1247,
      car: "Toyota Camry",
      license: "ABC 123",
      color: "Silver",
      phone: "+1 (555) 123-4567",
    },
    trip: {
      pickup: "123 Main St, City, State",
      destination: "456 Oak Ave, City, State",
      estimatedTime: "12 min",
      distance: "5.2 mi",
      price: "$20.90",
      eta: "2:45 PM",
    },
    status: {
      current: "Driver is on the way",
      steps: [
        { id: 1, name: "Driver assigned", completed: true, time: "2:30 PM" },
        { id: 2, name: "Driver on the way", completed: true, time: "2:33 PM" },
        { id: 3, name: "Arriving at pickup", completed: false, time: "" },
        { id: 4, name: "Trip in progress", completed: false, time: "" },
        { id: 5, name: "Arrived at destination", completed: false, time: "" },
      ],
    },
  }


  const handleCancelRide = () => {
    console.log("Cancelling ride");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              Track Your Ride
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Monitor your driver's location and trip progress
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl">
                      {rideDetails.status.current}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Estimated arrival: {rideDetails.trip.eta}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-sm md:text-base px-3 py-1 self-start sm:self-auto"
                  >
                    {rideDetails.trip.estimatedTime}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Driver Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">
                  Your Driver
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-base md:text-lg">
                          {rideDetails.driver.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs md:text-sm">
                            {rideDetails.driver.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {rideDetails.driver.trips} trips •{" "}
                        {rideDetails.driver.car} • {rideDetails.driver.color}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        License: {rideDetails.driver.license}
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
                  {rideDetails.status.steps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <Timer className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <span className="text-xs md:text-sm">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm md:text-base font-medium ${
                            step.completed ? "text-green-600" : ""
                          }`}
                        >
                          {step.name}
                        </div>
                        {step.time && (
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {step.time}
                          </div>
                        )}
                      </div>
                      {step.completed && (
                        <div className="text-green-500">
                          <Timer className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                        Pickup
                      </div>
                      <div className="text-sm md:text-base">
                        {rideDetails.trip.pickup}
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
                        {rideDetails.trip.destination}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {rideDetails.trip.distance}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Distance
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {rideDetails.trip.estimatedTime}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Est. Time
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {rideDetails.trip.price}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Total
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleCancelRide}
                >
                  Cancel Ride
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, User, Timer } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function TrackingPage() {
  const progress = 25;

  const rideDetails = {
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Trip Details */}
      <div className="container mx-auto px-4 py-6">
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {rideDetails.status.current}
                </CardTitle>
                <CardDescription>
                  Estimated arrival: {rideDetails.trip.eta}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {rideDetails.trip.estimatedTime}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Pickup: {rideDetails.trip.pickup}</span>
              <span>{rideDetails.trip.distance}</span>
              <span>{rideDetails.trip.destination}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Info */}
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
                        {rideDetails.driver.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {rideDetails.driver.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{rideDetails.driver.trips} trips</div>
                      <div>
                        {rideDetails.driver.car} • {rideDetails.driver.color}
                      </div>
                      <div>License: {rideDetails.driver.license}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Trip Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rideDetails.status.steps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <Timer className="w-4 h-4" />
                        ) : (
                          <span className="text-sm">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            step.completed ? "text-green-600" : ""
                          }`}
                        >
                          {step.name}
                        </div>
                        {step.time && (
                          <div className="text-sm text-muted-foreground">
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

            {/* Trip Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Pickup
                    </Label>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-sm">{rideDetails.trip.pickup}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Destination
                    </Label>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-sm">
                        {rideDetails.trip.destination}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {rideDetails.trip.distance}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Distance
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {rideDetails.trip.estimatedTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Est. Time
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {rideDetails.trip.price}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
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

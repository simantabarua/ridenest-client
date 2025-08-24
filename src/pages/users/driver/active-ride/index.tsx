"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Navigation,
  Star,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Users,
  Route,
  Shield,
  Share,
} from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ActiveRidePage() {
  const [rideStatus, setRideStatus] = useState("in_progress");
  const progress = 60;

  const activeRide = {
    id: "DR001",
    passenger: {
      name: "Sarah Johnson",
      rating: 4.8,
      phone: "+1 (555) 123-4567",
      avatar: "/avatars/01.png",
    },
    trip: {
      pickup: "123 Main St, Downtown",
      destination: "456 Oak Ave, Residential Area",
      estimatedTime: "15 min",
      actualTime: "12 min",
      distance: "5.2 mi",
      earnings: "$18.50",
      surgeMultiplier: 1.0,
    },
    status: {
      current: "En route to destination",
      steps: [
        { id: 1, name: "Accepted request", completed: true, time: "2:30 PM" },
        { id: 2, name: "Arrived at pickup", completed: true, time: "2:35 PM" },
        {
          id: 3,
          name: "Picked up passenger",
          completed: true,
          time: "2:36 PM",
        },
        {
          id: 4,
          name: "En route to destination",
          completed: true,
          time: "2:36 PM",
        },
        { id: 5, name: "Arrived at destination", completed: false, time: "" },
        { id: 6, name: "Completed ride", completed: false, time: "" },
      ],
    },
    navigation: {
      currentStep: "Turn right onto Main St",
      nextStep: "Continue for 0.5 miles",
      distanceRemaining: "2.1 mi",
      timeRemaining: "6 min",
    },
  };

  const handleCompleteRide = () => {
    setRideStatus("completed");
    console.log("Ride completed");
  };

  const handleEmergency = () => {
    console.log("Emergency button pressed");
  };

  const handleContactPassenger = (type: "call" | "message") => {
    console.log(`Contact passenger: ${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Map Area */}
      <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 to-green-50">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Navigation className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Live Navigation</h3>
            <p className="text-muted-foreground">
              Turn-by-turn directions to destination
            </p>
          </div>
        </div>

        {/* Emergency Button */}
        <Button
          variant="destructive"
          size="lg"
          className="absolute top-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
          onClick={handleEmergency}
        >
          <AlertTriangle className="w-6 h-6" />
        </Button>

        {/* Navigation Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {activeRide.navigation.currentStep}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activeRide.navigation.nextStep}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {activeRide.navigation.timeRemaining}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activeRide.navigation.distanceRemaining}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Line */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
          <div className="w-full h-full border-2 border-dashed border-primary/30 rounded-lg"></div>
        </div>

        {/* Current Location Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Card */}
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {activeRide.status.current}
                  </CardTitle>
                  <CardDescription>
                    Ride #{activeRide.id} •{" "}
                    {activeRide.navigation.timeRemaining} remaining
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {activeRide.navigation.distanceRemaining}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pickup: {activeRide.trip.pickup}</span>
                <span>{activeRide.trip.distance}</span>
                <span>{activeRide.trip.destination}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Passenger Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">
                          {activeRide.passenger.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {activeRide.passenger.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Phone: {activeRide.passenger.phone}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleContactPassenger("call")}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleContactPassenger("message")}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
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
                    {activeRide.status.steps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-center space-x-4"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.completed
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
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
                            <CheckCircle className="w-4 h-4" />
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
                        <span className="text-sm">
                          {activeRide.trip.pickup}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Destination
                      </Label>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span className="text-sm">
                          {activeRide.trip.destination}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {activeRide.trip.distance}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Distance
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {activeRide.trip.actualTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {activeRide.trip.earnings}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Earnings
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Complete Ride Button */}
              {rideStatus === "in_progress" && (
                <Card className="border-0 shadow-lg border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-green-900">
                        Ready to Complete?
                      </h3>
                      <p className="text-green-700">
                        Make sure you've arrived at the destination before
                        completing the ride.
                      </p>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                        onClick={handleCompleteRide}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Ride
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Navigation Instructions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5" />
                    <span>Navigation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="font-semibold text-primary mb-1">
                      Current Step
                    </div>
                    <div className="text-sm">
                      {activeRide.navigation.currentStep}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="font-semibold mb-1">Next Step</div>
                    <div className="text-sm">
                      {activeRide.navigation.nextStep}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {activeRide.navigation.distanceRemaining}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Remaining
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {activeRide.navigation.timeRemaining}
                      </div>
                      <div className="text-xs text-muted-foreground">ETA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Features */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Safety</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Trip shared with safety contacts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Emergency contacts ready</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 support available</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Shield className="w-4 h-4 mr-2" />
                    Safety Center
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleContactPassenger("message")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Passenger
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleContactPassenger("call")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Passenger
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Share Trip Status
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Route className="w-4 h-4 mr-2" />
                    Alternative Route
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency */}
              <Card className="border-0 shadow-lg border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Emergency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-red-700">
                    If you feel unsafe during this trip, use the emergency
                    button.
                  </p>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleEmergency}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Assistance
                  </Button>
                  <div className="text-xs text-red-600 text-center">
                    This will alert authorities and our safety team
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

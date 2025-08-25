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
import { Star, CheckCircle, Users } from "lucide-react";

export default function ActiveRidePage() {
  const [progress, setProgress] = useState(60);
  const [activeRide, setActiveRide] = useState({
    id: "DR001",
    passenger: {
      name: "Sarah Johnson",
      rating: 4.8,
      phone: "+1 (555) 123-4567",
    },
    trip: {
      pickup: "123 Main St",
      destination: "456 Oak Ave",
      distance: "5.2 mi",
      earnings: "$18.50",
    },
    status: {
      current: "En route to destination",
      steps: [
        { id: 1, name: "Accepted", completed: true, time: "2:30 PM" },
        { id: 2, name: "Arrived", completed: true, time: "2:35 PM" },
        { id: 3, name: "Picked up", completed: true, time: "2:36 PM" },
        { id: 4, name: "En route", completed: false, time: "" },
        { id: 5, name: "Arrived", completed: false, time: "" },
        { id: 6, name: "Completed", completed: false, time: "" },
      ],
    },
    navigation: {
      distanceRemaining: "2.1 mi",
      timeRemaining: "6 min",
    },
  });

  const handleCompleteStep1 = () => {
    updateStep(1);
  };

  const handleCompleteStep2 = () => {
    updateStep(2);
  };

  const handleCompleteStep3 = () => {
    updateStep(3);
  };

  const handleCompleteStep4 = () => {
    updateStep(4);
  };

  const handleCompleteStep5 = () => {
    updateStep(5);
  };

  const handleCompleteStep6 = () => {
    updateStep(6);
  };

  const updateStep = (stepId: number) => {
    const stepIndex = activeRide.status.steps.findIndex(
      (step) => step.id === stepId
    );
    if (stepIndex === -1) return;

    if (stepIndex > 0 && !activeRide.status.steps[stepIndex - 1].completed) {
      return;
    }

    const updatedSteps = [...activeRide.status.steps];
    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      completed: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    let currentStatus = activeRide.status.current;
    if (stepIndex < updatedSteps.length - 1) {
      currentStatus = updatedSteps[stepIndex + 1].name;
    }

    const completedSteps = updatedSteps.filter((step) => step.completed).length;
    const totalSteps = updatedSteps.length;
    const newProgress = Math.round((completedSteps / totalSteps) * 100);

    setActiveRide({
      ...activeRide,
      status: {
        ...activeRide.status,
        current: currentStatus,
        steps: updatedSteps,
      },
    });

    setProgress(newProgress);
  };

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
            {/* Status Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl">
                      {activeRide.status.current}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Ride #{activeRide.id} •{" "}
                      {activeRide.navigation.timeRemaining} remaining
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-sm md:text-base px-3 py-1 self-start sm:self-auto"
                  >
                    {activeRide.navigation.distanceRemaining}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={progress} className="h-2 mb-3 md:mb-4" />
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs md:text-sm text-muted-foreground gap-1">
                  <span>{activeRide.trip.pickup}</span>
                  <span>{activeRide.trip.distance}</span>
                  <span>{activeRide.trip.destination}</span>
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
                          {activeRide.passenger.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs md:text-sm">
                            {activeRide.passenger.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {activeRide.passenger.phone}
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
                  {activeRide.status.steps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
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
                      {!step.completed && (
                        <Button
                          size="sm"
                          onClick={() => {
                            if (step.id === 1) handleCompleteStep1();
                            else if (step.id === 2) handleCompleteStep2();
                            else if (step.id === 3) handleCompleteStep3();
                            else if (step.id === 4) handleCompleteStep4();
                            else if (step.id === 5) handleCompleteStep5();
                            else if (step.id === 6) handleCompleteStep6();
                          }}
                          className="ml-2 h-7 md:h-8 text-xs md:text-sm"
                        >
                          Done
                        </Button>
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
                        {activeRide.trip.pickup}
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
                        {activeRide.trip.destination}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {activeRide.trip.distance}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Distance
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {activeRide.navigation.timeRemaining}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Remaining
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary">
                        {activeRide.trip.earnings}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Earnings
                      </div>
                    </div>
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

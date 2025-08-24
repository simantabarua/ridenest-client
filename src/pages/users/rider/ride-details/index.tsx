"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Star,
  DollarSign,
  Phone,
  MessageCircle,
  Download,
  Share,
  Car,
  User,
  Route,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function RideDetailsPage() {
  const rideDetails = {
    id: "RS001",
    status: "completed",
    date: "2024-01-15",
    time: "2:30 PM",
    pickup: "123 Main St, City, State",
    destination: "456 Oak Ave, City, State",
    driver: {
      name: "John Smith",
      rating: 4.8,
      trips: 1247,
      car: "Toyota Camry",
      license: "ABC 123",
      color: "Silver",
      phone: "+1 (555) 123-4567",
    },
    pricing: {
      baseFare: "$8.00",
      distance: "$7.80",
      time: "$3.60",
      serviceFee: "$1.50",
      total: "$20.90",
    },
    trip: {
      distance: "5.2 mi",
      duration: "12 min",
      actualDuration: "14 min",
      route: "Via Highway 101",
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
      status: "Paid",
    },
    rating: {
      given: 5,
      comment: "Great driver! Very professional and the car was clean.",
      driverRating: 5,
    },
    timeline: [
      {
        time: "2:30 PM",
        event: "Ride requested",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        time: "2:32 PM",
        event: "Driver assigned",
        icon: User,
        color: "text-blue-600",
      },
      {
        time: "2:35 PM",
        event: "Driver arrived",
        icon: Car,
        color: "text-blue-600",
      },
      {
        time: "2:36 PM",
        event: "Trip started",
        icon: Navigation,
        color: "text-blue-600",
      },
      {
        time: "2:50 PM",
        event: "Trip completed",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        time: "2:50 PM",
        event: "Payment processed",
        icon: DollarSign,
        color: "text-green-600",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Ride Details</h1>
              <p className="text-muted-foreground">
                Review your trip information
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share Trip
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ride Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        Trip #{rideDetails.id}
                      </CardTitle>
                      <CardDescription>
                        {rideDetails.date} at {rideDetails.time}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(rideDetails.status)}>
                      {rideDetails.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Route */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                        <div>
                          <div className="font-medium">Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            {rideDetails.pickup}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                        <div>
                          <div className="font-medium">Destination</div>
                          <div className="text-sm text-muted-foreground">
                            {rideDetails.destination}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trip Info */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {rideDetails.trip.distance}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Distance
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {rideDetails.trip.duration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Est. Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {rideDetails.trip.actualDuration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Actual Time
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Information */}
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
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Trip Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideDetails.timeline.map((event, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            event.color === "text-green-600"
                              ? "bg-green-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <event.icon className={`w-4 h-4 ${event.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.event}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Pricing Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Fare</span>
                      <span>{rideDetails.pricing.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Distance ({rideDetails.trip.distance})
                      </span>
                      <span>{rideDetails.pricing.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Time ({rideDetails.trip.actualDuration})
                      </span>
                      <span>{rideDetails.pricing.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>{rideDetails.pricing.serviceFee}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{rideDetails.pricing.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span>{rideDetails.payment.method}</span>
                    </div>
                    {rideDetails.payment.last4 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Card</span>
                        <span>•••• {rideDetails.payment.last4}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {rideDetails.payment.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    View Receipt
                  </Button>
                </CardContent>
              </Card>

              {/* Rating */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Rating & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Rating</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm">
                          {rideDetails.rating.given}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Driver Rating
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm">
                          {rideDetails.rating.driverRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  {rideDetails.rating.comment && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm font-medium mb-1">
                        Your Comment:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {rideDetails.rating.comment}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Trip Route */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Route Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Route className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Route Taken</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {rideDetails.trip.route}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Distance</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {rideDetails.trip.distance}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View on Map
                  </Button>
                </CardContent>
              </Card>

              {/* Safety & Support */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Safety & Support</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Safety Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

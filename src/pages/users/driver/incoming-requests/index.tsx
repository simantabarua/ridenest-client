"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Navigation,
  Star,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Timer,
  AlertTriangle,
  Car,
  Route,
  TrendingUp,
  Bell,
  Filter,
} from "lucide-react";

export default function IncomingRequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: "RQ001",
      passenger: {
        name: "Sarah Johnson",
        rating: 4.8,
        trips: 23,
        avatar: "/avatars/01.png",
      },
      pickup: {
        address: "123 Main St, Downtown",
        coordinates: { lat: 40.7128, lng: -74.006 },
        eta: "3 min",
      },
      destination: {
        address: "456 Oak Ave, Residential Area",
        coordinates: { lat: 40.758, lng: -73.9855 },
        distance: "5.2 mi",
      },
      trip: {
        estimatedTime: "15 min",
        estimatedDistance: "5.2 mi",
        estimatedEarnings: "$18.50",
        surgeMultiplier: 1.0,
      },
      requestTime: "2 min ago",
      timeRemaining: 25,
      status: "pending",
      priority: "normal",
    },
    {
      id: "RQ002",
      passenger: {
        name: "Mike Chen",
        rating: 4.9,
        trips: 45,
        avatar: "/avatars/02.png",
      },
      pickup: {
        address: "Hotel Grand, City Center",
        coordinates: { lat: 40.7589, lng: -73.9851 },
        eta: "5 min",
      },
      destination: {
        address: "International Airport, Terminal 2",
        coordinates: { lat: 40.6413, lng: -73.7781 },
        distance: "12.5 mi",
      },
      trip: {
        estimatedTime: "25 min",
        estimatedDistance: "12.5 mi",
        estimatedEarnings: "$35.00",
        surgeMultiplier: 1.5,
      },
      requestTime: "4 min ago",
      timeRemaining: 15,
      status: "pending",
      priority: "high",
    },
    {
      id: "RQ003",
      passenger: {
        name: "Emily Davis",
        rating: 4.7,
        trips: 12,
        avatar: "/avatars/03.png",
      },
      pickup: {
        address: "Shopping Mall, West District",
        coordinates: { lat: 40.7505, lng: -73.9934 },
        eta: "8 min",
      },
      destination: {
        address: "University Campus, North Gate",
        coordinates: { lat: 40.7282, lng: -73.9942 },
        distance: "3.8 mi",
      },
      trip: {
        estimatedTime: "12 min",
        estimatedDistance: "3.8 mi",
        estimatedEarnings: "$12.75",
        surgeMultiplier: 1.0,
      },
      requestTime: "6 min ago",
      timeRemaining: 8,
      status: "pending",
      priority: "normal",
    },
  ]);

  const stats = {
    totalRequests: 3,
    highPriority: 1,
    averageEarnings: "$22.08",
    acceptanceRate: "78%",
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests(requests.filter((req) => req.id !== requestId));
    console.log("Accepted request:", requestId);
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests(requests.filter((req) => req.id !== requestId));
    console.log("Declined request:", requestId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "normal":
        return <Bell className="w-4 h-4 text-blue-600" />;
      case "low":
        return <Timer className="w-4 h-4 text-gray-600" />;
      default:
        return <Timer className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Incoming Requests</h1>
            <p className="text-muted-foreground">
              Review and accept ride requests
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Requests
              </CardTitle>
              <Navigation className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Priority
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highPriority}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Earnings
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageEarnings}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Acceptance Rate
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.acceptanceRate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.length > 0 ? (
            requests.map((request) => (
              <Card
                key={request.id}
                className={`border-0 shadow-lg ${
                  request.priority === "high" ? "border-red-200 bg-red-50" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Passenger and Route */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(request.priority)}>
                            {getPriorityIcon(request.priority)}
                            <span className="ml-1">
                              {request.priority.toUpperCase()}
                            </span>
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {request.requestTime}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.timeRemaining}s remaining
                        </div>
                      </div>

                      {/* Passenger Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">
                              {request.passenger.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">
                                {request.passenger.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.passenger.trips} trips
                          </div>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">Pickup</div>
                            <div className="text-sm text-muted-foreground">
                              {request.pickup.address}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ETA: {request.pickup.eta} •{" "}
                              {request.trip.estimatedDistance}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              Destination
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {request.destination.address}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {request.trip.estimatedTime} •{" "}
                              {request.destination.distance}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {request.trip.estimatedEarnings}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Est. Earnings
                          </div>
                          {request.trip.surgeMultiplier > 1 && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {request.trip.surgeMultiplier}x surge
                            </Badge>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {request.trip.estimatedTime}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Est. Duration
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {request.pickup.eta}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Pickup ETA
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="space-y-4">
                      {/* Timer */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {request.timeRemaining}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          seconds left
                        </div>
                        <Progress
                          value={(request.timeRemaining / 30) * 100}
                          className="mt-2 h-2"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Request
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>

                      {/* Quick Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Route className="w-4 h-4 text-muted-foreground" />
                          <span>{request.trip.estimatedDistance} total</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          <span>Standard ride</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg text-center py-12">
              <CardContent>
                <Navigation className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Incoming Requests
                </h3>
                <p className="text-muted-foreground mb-6">
                  You're all caught up! New requests will appear here.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Make sure you're online to receive requests</p>
                  <p>• Check your location for better demand</p>
                  <p>• High-demand areas show more requests</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips */}
        <Card className="border-0 shadow-lg mt-8 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Quick Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Accept Quickly</h4>
                <p className="text-sm text-blue-700">
                  Respond within 30 seconds to maintain good acceptance rate
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Check Ratings</h4>
                <p className="text-sm text-blue-700">
                  Higher passenger ratings usually mean better experiences
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Surge Pricing</h4>
                <p className="text-sm text-blue-700">
                  High priority requests often include surge multipliers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

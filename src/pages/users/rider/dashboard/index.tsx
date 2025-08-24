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
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  Car,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default function RiderDashboard() {
  const stats = [
    {
      title: "Total Rides",
      value: "47",
      change: "+12%",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Money Spent",
      value: "$342",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Saved Places",
      value: "8",
      change: "+2",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentRides = [
    {
      id: "RS001",
      date: "2024-01-15",
      from: "123 Main St",
      to: "456 Oak Ave",
      price: "$12.50",
      status: "completed",
      rating: 5,
      driver: "John Smith",
    },
    {
      id: "RS002",
      date: "2024-01-14",
      from: "Downtown Office",
      to: "Airport Terminal",
      price: "$35.00",
      status: "completed",
      rating: 4,
      driver: "Sarah Johnson",
    },
    {
      id: "RS003",
      date: "2024-01-13",
      from: "Home",
      to: "Shopping Mall",
      price: "$8.75",
      status: "completed",
      rating: 5,
      driver: "Mike Chen",
    },
  ];

  const quickActions = [
    {
      title: "Book a Ride",
      description: "Request a ride now",
      icon: Car,
      action: "/rider/request-ride",
      color: "bg-blue-500",
    },
    {
      title: "Schedule Ride",
      description: "Plan your trip in advance",
      icon: Calendar,
      action: "/rider/request-ride",
      color: "bg-green-500",
    },
    {
      title: "View History",
      description: "Check your past rides",
      icon: Clock,
      action: "/rider/ride-history",
      color: "bg-purple-500",
    },
    {
      title: "Payment Methods",
      description: "Manage your payment options",
      icon: CreditCard,
      action: "/rider/profile",
      color: "bg-orange-500",
    },
  ];

  const savedPlaces = [
    { name: "Home", address: "123 Main St, City, State", icon: "🏠" },
    { name: "Work", address: "456 Business Ave, City, State", icon: "🏢" },
    { name: "Gym", address: "789 Fitness St, City, State", icon: "💪" },
    { name: "Airport", address: "Airport Terminal, City, State", icon: "✈️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Here's your ride overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">A</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div
                        className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm mb-3">
                        {action.description}
                      </CardDescription>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-0 h-auto"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Rides */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Recent Rides</h2>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentRides.map((ride, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{ride.from}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{ride.to}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{ride.date}</span>
                              <span>•</span>
                              <span>{ride.driver}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{ride.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {ride.price}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {ride.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Saved Places */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Saved Places</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="text-xl">{place.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{place.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {place.address}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Add New Place
                </Button>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Safety Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Share Trip Status</div>
                    <div className="text-xs text-muted-foreground">
                      Share your ride with trusted contacts
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      Emergency Contacts
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Quick access to emergency help
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">RideCheck</div>
                    <div className="text-xs text-muted-foreground">
                      Automated safety notifications
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promotions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Special Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">50% OFF</div>
                <div className="text-sm opacity-90">
                  Your next ride is on us! Use code: WELCOME50
                </div>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

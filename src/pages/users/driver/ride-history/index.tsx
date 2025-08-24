"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Star,
  DollarSign,
  Car,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  Timer,
} from "lucide-react";

export default function DriverRideHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const rides = [
    {
      id: "DR001",
      date: "2024-01-15",
      time: "2:30 PM",
      from: "123 Main St, City, State",
      to: "456 Oak Ave, City, State",
      passenger: "Sarah Johnson",
      passengerRating: 4.8,
      earnings: "$18.50",
      distance: "5.2 mi",
      duration: "15 min",
      status: "completed",
      rating: 5,
      surge: 1.0,
      carType: "Standard",
    },
    {
      id: "DR002",
      date: "2024-01-15",
      time: "1:45 PM",
      from: "Downtown Office, City, State",
      to: "Airport Terminal, City, State",
      passenger: "Mike Chen",
      passengerRating: 4.9,
      earnings: "$35.00",
      distance: "12.5 mi",
      duration: "25 min",
      status: "completed",
      rating: 5,
      surge: 1.5,
      carType: "Comfort",
    },
    {
      id: "DR003",
      date: "2024-01-14",
      time: "6:45 PM",
      from: "Shopping Mall, City, State",
      to: "Residential Area, City, State",
      passenger: "Emily Davis",
      passengerRating: 4.7,
      earnings: "$12.75",
      distance: "3.8 mi",
      duration: "12 min",
      status: "completed",
      rating: 4,
      surge: 1.0,
      carType: "Standard",
    },
    {
      id: "DR004",
      date: "2024-01-14",
      time: "9:20 AM",
      from: "Hotel Downtown, City, State",
      to: "Business District, City, State",
      passenger: "David Wilson",
      passengerRating: 4.6,
      earnings: "$15.25",
      distance: "4.2 mi",
      duration: "14 min",
      status: "cancelled",
      rating: null,
      surge: 1.0,
      carType: "Standard",
    },
    {
      id: "DR005",
      date: "2024-01-13",
      time: "11:30 AM",
      from: "University Campus, City, State",
      to: "Train Station, City, State",
      passenger: "Lisa Brown",
      passengerRating: 4.9,
      earnings: "$22.00",
      distance: "6.1 mi",
      duration: "18 min",
      status: "completed",
      rating: 5,
      surge: 1.2,
      carType: "Premium",
    },
  ];

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passenger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ride.status === statusFilter;
    const matchesDate = dateFilter === "all" || ride.date.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    totalRides: rides.length,
    completedRides: rides.filter((r) => r.status === "completed").length,
    totalEarnings: rides
      .filter((r) => r.status === "completed")
      .reduce((acc, r) => acc + parseFloat(r.earnings.replace("$", "")), 0),
    avgRating: (
      rides.filter((r) => r.rating).reduce((acc, r) => acc + r.rating, 0) /
      rides.filter((r) => r.rating).length
    ).toFixed(1),
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ride History</h1>
            <p className="text-muted-foreground">
              View all your completed and cancelled rides
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Rides
              </CardTitle>
              <Car className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRides}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedRides}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Rating
              </CardTitle>
              <Star className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by passenger, location, or ride ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2023-12">December 2023</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ride List */}
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <Card
              key={ride.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Left Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="text-xs">
                          {ride.id}
                        </Badge>
                        <Badge className={getStatusColor(ride.status)}>
                          {ride.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{ride.date}</span>
                          <span>•</span>
                          <span>{ride.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.from}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Destination</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.to}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{ride.passenger}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{ride.passengerRating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Car className="w-4 h-4" />
                        <span>{ride.carType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{ride.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4" />
                        <span>{ride.duration}</span>
                      </div>
                      {ride.surge > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          {ride.surge}x surge
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex items-center justify-between lg:justify-end lg:space-x-6 mt-4 lg:mt-0">
                    {/* Earnings and Rating */}
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        {ride.earnings}
                      </div>
                      {ride.rating && (
                        <div className="flex items-center justify-end space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ride.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {filteredRides.length} of {rides.length} rides
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {filteredRides.length === 0 && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

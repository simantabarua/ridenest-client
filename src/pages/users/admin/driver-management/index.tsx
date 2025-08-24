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
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Car,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DriverManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const drivers = [
    {
      id: 1,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      verification: "verified",
      joinDate: "2022-11-20",
      lastActive: "2024-01-15",
      vehicle: "Toyota Camry 2020",
      licensePlate: "ABC 123",
      totalRides: 1247,
      totalEarnings: "$28,456.80",
      rating: 4.9,
      acceptanceRate: "85%",
      location: "Los Angeles, CA",
      onlineStatus: "online",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      verification: "verified",
      joinDate: "2023-02-15",
      lastActive: "2024-01-14",
      vehicle: "Honda Accord 2019",
      licensePlate: "XYZ 789",
      totalRides: 856,
      totalEarnings: "$19,234.50",
      rating: 4.8,
      acceptanceRate: "92%",
      location: "New York, NY",
      onlineStatus: "offline",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 456-7890",
      status: "pending",
      verification: "pending",
      joinDate: "2024-01-12",
      lastActive: "2024-01-12",
      vehicle: "Tesla Model 3 2023",
      licensePlate: "TES 123",
      totalRides: 0,
      totalEarnings: "$0.00",
      rating: null,
      acceptanceRate: "0%",
      location: "Houston, TX",
      onlineStatus: "offline",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 234-5678",
      status: "suspended",
      verification: "verified",
      joinDate: "2023-05-10",
      lastActive: "2024-01-10",
      vehicle: "Nissan Altima 2021",
      licensePlate: "DEF 456",
      totalRides: 423,
      totalEarnings: "$9,876.30",
      rating: 4.6,
      acceptanceRate: "78%",
      location: "Chicago, IL",
      onlineStatus: "offline",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      verification: "verified",
      joinDate: "2023-08-20",
      lastActive: "2024-01-15",
      vehicle: "BMW 3 Series 2022",
      licensePlate: "BMW 789",
      totalRides: 634,
      totalEarnings: "$15,432.10",
      rating: 4.7,
      acceptanceRate: "88%",
      location: "Miami, FL",
      onlineStatus: "online",
    },
  ];

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.vehicle.toLowerCase().includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || driver.status === statusFilter;
    const matchesVerification =
      verificationFilter === "all" ||
      driver.verification === verificationFilter;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const stats = {
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter((d) => d.status === "active").length,
    pendingDrivers: drivers.filter((d) => d.status === "pending").length,
    suspendedDrivers: drivers.filter((d) => d.status === "suspended").length,
    verifiedDrivers: drivers.filter((d) => d.verification === "verified")
      .length,
    onlineDrivers: drivers.filter((d) => d.onlineStatus === "online").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVerificationColor = (verification: string) => {
    switch (verification) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApproveDriver = (driverId: number) => {
    console.log("Approve driver:", driverId);
  };

  const handleSuspendDriver = (driverId: number) => {
    console.log("Suspend driver:", driverId);
  };

  const handleActivateDriver = (driverId: number) => {
    console.log("Activate driver:", driverId);
  };

  const handleDeleteDriver = (driverId: number) => {
    console.log("Delete driver:", driverId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Management</h1>
            <p className="text-muted-foreground">
              Manage all drivers on the platform
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Driver
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Drivers
              </CardTitle>
              <Car className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDrivers}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Drivers
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDrivers}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDrivers}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Online Now
              </CardTitle>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onlineDrivers}</div>
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
                  placeholder="Search by name, email, phone, or vehicle..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Verification Filter */}
              <Select
                value={verificationFilter}
                onValueChange={setVerificationFilter}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verification</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setVerificationFilter("all");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Drivers List */}
        <div className="space-y-4">
          {filteredDrivers.map((driver) => (
            <Card
              key={driver.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Left Content */}
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      {driver.onlineStatus === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{driver.name}</h3>
                        <Badge className={getStatusColor(driver.status)}>
                          {driver.status}
                        </Badge>
                        <Badge
                          className={getVerificationColor(driver.verification)}
                        >
                          {driver.verification}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{driver.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{driver.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Car className="w-3 h-3" />
                          <span>{driver.vehicle}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{driver.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 lg:mb-0">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Joined
                      </div>
                      <div className="font-medium">{driver.joinDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last Active
                      </div>
                      <div className="font-medium">{driver.lastActive}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Rides
                      </div>
                      <div className="font-medium">{driver.totalRides}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Earnings
                      </div>
                      <div className="font-medium">{driver.totalEarnings}</div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex items-center justify-between lg:justify-end space-x-2">
                    <div className="flex items-center space-x-4">
                      {driver.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{driver.rating}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <div className="text-muted-foreground">Acceptance</div>
                        <div className="font-medium">
                          {driver.acceptanceRate}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {driver.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleApproveDriver(driver.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {driver.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendDriver(driver.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {driver.status === "suspended" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivateDriver(driver.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDriver(driver.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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
            Showing {filteredDrivers.length} of {drivers.length} drivers
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
        {filteredDrivers.length === 0 && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No drivers found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setVerificationFilter("all");
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

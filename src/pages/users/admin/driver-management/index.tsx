import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
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
} from "lucide-react";
import {
  useGetDriverStatsQuery,
  useGetDriversQuery,
} from "@/redux/features/admin/admin.api";

export default function DriverManagementPage() {
  const { data: stats } = useGetDriverStatsQuery(undefined);
  const { data: driversData } = useGetDriversQuery(undefined);
  const drivers = driversData?.data || [];
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
              <div className="text-2xl font-bold">
                {stats?.data?.totalDrivers || 0}
              </div>
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
              <div className="text-2xl font-bold">
                {stats?.data?.activeDrivers || 0}
              </div>
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
              <div className="text-2xl font-bold">
                {stats?.data?.pendingDrivers || 0}
              </div>
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
              <div className="text-2xl font-bold">
                {stats?.data?.onlineDrivers || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drivers List */}
        <div className="space-y-4">
          {drivers.map((driver) => (
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
                          {driver.name}
                        </span>
                      </div>
                      {driver.onlineStatus === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{driver.name}</h3>
                        <Badge>{driver.status}</Badge>
                        <Badge>{driver.verification}</Badge>
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

        {drivers.length === 0 && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No drivers found</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

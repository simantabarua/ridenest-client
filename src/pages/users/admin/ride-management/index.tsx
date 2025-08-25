import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  MapPin,
  Clock,
  Star,
  User,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";

export default function AdminRideManagement() {
  const { data: rides, isLoading } = useGetAllRidesQuery(undefined);
  
  // Hardcoded stats data
  const stats = {
    total: 1247,
    completed: 982,
    inProgress: 45,
    cancelled: 120,
    pending: 100
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ride Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Monitor and manage all ride activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Rides</CardTitle>
              <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xl md:text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time rides</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xl md:text-2xl font-bold text-green-600">
                {stats.completed}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xl md:text-2xl font-bold text-red-600">
                {stats.cancelled}
              </div>
              <p className="text-xs text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xl md:text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Rides Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg md:text-xl">All Rides</CardTitle>
            <CardDescription className="text-sm">
              Complete list of all rides in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Ride ID</TableHead>
                    <TableHead className="text-xs">Rider</TableHead>
                    <TableHead className="text-xs">Driver</TableHead>
                    <TableHead className="text-xs">Pickup</TableHead>
                    <TableHead className="text-xs">Destination</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Fare</TableHead>
                    <TableHead className="text-xs">Distance</TableHead>
                    <TableHead className="text-xs">Duration</TableHead>
                    <TableHead className="text-xs">Rating</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides?.data?.map((ride: IRide) => (
                    <TableRow key={ride._id}>
                      <TableCell className="font-medium text-xs">
                        {ride._id?.slice(0, 8) ?? "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs truncate max-w-[60px]">
                            {ride.rider?.name ?? "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Car className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs truncate max-w-[60px]">
                            {ride.driver?.name ?? "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs max-w-[80px] truncate">
                        {ride.pickupLocation ?? "-"}
                      </TableCell>
                      <TableCell className="text-xs max-w-[80px] truncate">
                        {ride.destinationLocation ?? "-"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {ride.status ?? "-"}
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        {ride.fare ?? "-"}
                      </TableCell>
                      <TableCell className="text-xs">{ride.distance ?? "-"}</TableCell>
                      <TableCell className="text-xs">{ride.duration ?? "-"}</TableCell>
                      <TableCell>
                        {ride.rating?.value ? (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{ride.rating.value}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {ride.updatedAt
                          ? new Date(ride.updatedAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
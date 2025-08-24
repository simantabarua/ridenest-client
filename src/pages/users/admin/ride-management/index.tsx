import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  console.log(rides);

  if (isLoading) {
    return <Loading />;
  }

  console.log(rides?.data[0].status);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Ride Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all ride activities
          </p>
        </div>

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time rides</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.completed}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.cancelled}
              </div>
              <p className="text-xs text-muted-foreground">Cancelled rides</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting drivers</p>
            </CardContent>
          </Card>
        </div> */}

        {/* Rides Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Rides</CardTitle>
            <CardDescription>
              Complete list of all rides in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ride ID</TableHead>
                    <TableHead>Rider</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides?.data?.map((ride: IRide) => (
                    <TableRow key={ride._id}>
                      <TableCell className="font-medium">
                        {ride._id ?? "-"}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{ride.rider?.name ?? "-"}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          <span>{ride.driver?.name ?? "-"}</span>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-[150px] truncate">
                        {ride.pickupLocation ?? "-"}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {ride.destinationLocation ?? "-"}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {ride.status}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        {ride.fare ?? "-"}
                      </TableCell>
                      <TableCell>{ride.distance ?? "-"}</TableCell>
                      <TableCell>{ride.duration ?? "-"}</TableCell>

                      <TableCell>
                        {ride.rating?.value ? (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{ride.rating.value}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {ride.updatedAt
                          ? new Date(ride.updatedAt).toLocaleString()
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
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

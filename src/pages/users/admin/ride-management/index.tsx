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
import { Eye, MapPin, User, Car, CheckCircle } from "lucide-react";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { useGetRidesStatsQuery } from "@/redux/features/admin/admin.api";
import StatCard from "@/components/module/admin/StatCard";

export default function AdminRideManagement() {
  const { data: rides, isLoading } = useGetAllRidesQuery(undefined);
  const { data: ridesStats } = useGetRidesStatsQuery(undefined);
  console.log(rides?.data);
  const stats = ridesStats?.data || [];
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Loading variant="bars" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Ride Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage all ride activities
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat: { title: string; value: string }) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={CheckCircle}
            />
          ))}
        </div>
        {/* Rides Table */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">All Rides</CardTitle>
            <CardDescription className="text-sm">
              Complete list of all rides in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium">
                      Ride ID
                    </TableHead>
                    <TableHead className="text-xs font-medium">Rider</TableHead>
                    <TableHead className="text-xs font-medium">
                      Driver
                    </TableHead>
                    <TableHead className="text-xs font-medium">
                      Pickup
                    </TableHead>
                    <TableHead className="text-xs font-medium">
                      Destination
                    </TableHead>
                    <TableHead className="text-xs font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-medium">Fare</TableHead>
                    <TableHead className="text-xs font-medium">
                      Distance
                    </TableHead>
                    <TableHead className="text-xs font-medium">
                      Duration
                    </TableHead>

                    <TableHead className="text-xs font-medium">Date</TableHead>
                    <TableHead className="text-xs font-medium text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides?.data?.length ? (
                    rides?.data?.map((ride: IRide) => (
                      <TableRow key={ride._id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-xs">
                          {ride._id?.slice(0, 8) ?? "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs truncate max-w-[80px]">
                              {ride.rider?.name ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <Car className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs truncate max-w-[80px]">
                              {ride.driver?.name ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          className="text-xs max-w-[100px] truncate"
                          title={ride.pickupLocation}
                        >
                          {ride.pickupLocation ?? "-"}
                        </TableCell>
                        <TableCell
                          className="text-xs max-w-[100px] truncate"
                          title={ride.destinationLocation}
                        >
                          {ride.destinationLocation ?? "-"}
                        </TableCell>
                        <TableCell className="text-xs">{ride.status}</TableCell>
                        <TableCell className="font-medium text-xs">
                          ${ride.fare ?? "-"}
                        </TableCell>
                        <TableCell className="text-xs">
                          {ride.estimatedDistance ?? "-"} km
                        </TableCell>
                        <TableCell className="text-xs">
                          {ride.estimatedTime != null
                            ? ride.estimatedTime < 60
                              ? `${ride.estimatedTime.toFixed(0)} min`
                              : (() => {
                                  const hours = Math.floor(
                                    ride.estimatedTime / 60
                                  );
                                  const minutes = ride.estimatedTime % 60;
                                  return `${hours} hr ${minutes} min`;
                                })()
                            : "-"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {ride.updatedAt
                            ? new Date(ride.updatedAt).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">
                            No rides found
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            There are no rides in the system yet.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

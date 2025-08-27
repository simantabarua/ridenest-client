import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  MapPin,
  Star,
  DollarSign,
  Clock,
  Car,
  Download,
  Eye,
} from "lucide-react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { Link } from "react-router";
import getStatusColor from "@/utils/getStatus";

export default function RideHistoryPage() {
  const { data: rides, isLoading } = useGetMyRidesQuery(undefined);

  if (isLoading) {
    <Loading variant="bars" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ride History</h1>
            <p className="text-muted-foreground">
              View all your past rides and trips
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
              <div className="text-2xl font-bold">50</div>
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
              <div className="text-2xl font-bold">25</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,500</div>
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
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
        </div>
        {/* Ride List */}
        <div className="space-y-4">
          {rides?.data?.map((ride: IRide) => (
            <Card
              key={ride._id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Left Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(ride.status)}>
                          {ride.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{ride.createdAt}</span>
                          <span>•</span>
                          <span>{ride.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.destinationLocation}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Destination</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.pickupLocation}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{ride.estimatedDistance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{ride.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end lg:space-x-6 mt-4 lg:mt-0">
                    {/* Price and Rating */}
                    <div className="text-right space-y-2">
                      <div className="text-xl font-bold">{ride.fare}tk</div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link to={`/rider/ride/${ride._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {rides?.data?.length === 0 && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rides found</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

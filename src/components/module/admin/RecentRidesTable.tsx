import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import { Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Loading from "@/components/loading";

export default function RecentRidesTable() {
  const { data: ridesData, isLoading } = useGetAllRidesQuery(undefined);
  const rides = ridesData?.data?.slice(0, 5) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "in_progress":
      case "ongoing":
      case "intransit":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  if (isLoading) return <Loading variant="bars" />;

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Recent Rides</CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/10 font-semibold">
          <Link to="/admin/ride-management">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold">ID</TableHead>
                <TableHead className="font-bold">Rider</TableHead>
                <TableHead className="font-bold">Route</TableHead>
                <TableHead className="font-bold">Fare</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride: any) => (
                <TableRow key={ride._id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{ride._id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="font-medium">{ride.rider?.name || "Guest"}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5 max-w-[200px]">
                      <div className="flex items-center gap-1 text-xs font-semibold truncate">
                        <MapPin className="h-3 w-3 text-emerald-500" />
                        {ride.pickupLocation}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold truncate">
                        <MapPin className="h-3 w-3 text-rose-500" />
                        {ride.destinationLocation}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-primary">৳{ride.fare}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(ride.status)} font-bold text-[10px] px-2 py-0 border capitalize`}>
                      {ride.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                      <Link to={`/admin/ride/${ride._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

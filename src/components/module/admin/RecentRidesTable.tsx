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
import { cn } from "@/lib/utils";

export default function RecentRidesTable() {
  const { data: ridesData, isLoading } = useGetAllRidesQuery(undefined);
  const rides = ridesData?.data?.slice(0, 5) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/15 text-emerald-600 border-foreground";
      case "cancelled":
        return "bg-rose-500/15 text-rose-600 border-foreground";
      case "in_progress":
      case "ongoing":
      case "intransit":
        return "bg-amber-500/15 text-amber-600 border-foreground";
      default:
        return "bg-blue-500/15 text-blue-600 border-foreground";
    }
  };

  if (isLoading) return <Loading variant="bars" />;

  return (
    <Card className="rounded-none border-2 border-foreground bg-card text-card-foreground shadow-[3px_3px_0px_0px_var(--foreground)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-foreground">Recent Rides</CardTitle>
        <Button variant="outline" size="sm" asChild className="h-7 rounded-none border-2 border-foreground bg-background text-foreground font-black text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all">
          <Link to="/admin/ride-management">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3.5 pt-0">
        <div className="rounded-none border-2 border-foreground overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="border-b-2 border-foreground">
                <TableHead className="font-bold text-xs text-foreground uppercase tracking-wider h-8">ID</TableHead>
                <TableHead className="font-bold text-xs text-foreground uppercase tracking-wider h-8">Rider</TableHead>
                <TableHead className="font-bold text-xs text-foreground uppercase tracking-wider h-8">Route</TableHead>
                <TableHead className="font-bold text-xs text-foreground uppercase tracking-wider h-8">Fare</TableHead>
                <TableHead className="font-bold text-xs text-foreground uppercase tracking-wider h-8">Status</TableHead>
                <TableHead className="text-right font-bold text-xs text-foreground uppercase tracking-wider h-8">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride: any) => (
                <TableRow key={ride._id} className="border-b border-foreground/30 hover:bg-muted/10 transition-colors h-10">
                  <TableCell className="font-mono text-[10px] text-muted-foreground py-1">
                    #{ride._id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="font-bold text-xs py-1">{ride.rider?.name || "Guest"}</TableCell>
                  <TableCell className="py-1">
                    <div className="flex flex-col max-w-[160px]">
                      <div className="flex items-center gap-1 text-[10px] font-bold truncate text-foreground">
                        <MapPin className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
                        {ride.pickupLocation}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold truncate text-foreground">
                        <MapPin className="h-2.5 w-2.5 text-rose-500 shrink-0" />
                        {ride.destinationLocation}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-xs text-primary py-1">৳{ride.fare}</TableCell>
                  <TableCell className="py-1">
                    <Badge variant="outline" className={cn(getStatusColor(ride.status), "rounded-none border-2 font-black text-[9px] px-1.5 py-0 uppercase tracking-tighter")}>
                      {ride.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-1">
                    <Button variant="outline" size="icon" asChild className="h-6 w-6 rounded-none border border-foreground bg-background hover:bg-primary/20 text-foreground transition-all">
                      <Link to={`/admin/ride/${ride._id}`}>
                        <Eye className="h-3.5 w-3.5" />
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

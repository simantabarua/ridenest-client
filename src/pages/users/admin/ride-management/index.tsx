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
  User,
  Car,
  Search,
  CheckCircle2,
  Clock,
  PlayCircle,
  XCircle,
  DollarSign,
  HelpCircle,
  Route,
} from "lucide-react";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import { useGetRidesStatsQuery } from "@/redux/features/admin/admin.api";
import StatCard from "@/components/module/admin/StatCard";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";

const getStatIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("completed")) return CheckCircle2;
  if (t.includes("pending")) return Clock;
  if (t.includes("active") || t.includes("ongoing")) return PlayCircle;
  if (t.includes("cancelled") || t.includes("canceled")) return XCircle;
  if (t.includes("revenue") || t.includes("earnings") || t.includes("fare")) return DollarSign;
  if (t.includes("total")) return Route;
  return HelpCircle;
};

const getStatusBadge = (status: string) => {
  const s = status?.toLowerCase() || "";
  let classes = "bg-muted text-muted-foreground border-muted-foreground/25";
  if (s.includes("completed") || s.includes("success")) {
    classes = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400";
  } else if (s.includes("pending") || s.includes("request")) {
    classes = "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-400";
  } else if (s.includes("ongoing") || s.includes("active") || s.includes("started") || s.includes("accepted")) {
    classes = "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/5 dark:text-blue-400";
  } else if (s.includes("cancelled") || s.includes("failed") || s.includes("rejected")) {
    classes = "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/5 dark:text-rose-400";
  }
  return (
    <Badge variant="outline" className={`${classes} font-semibold capitalize px-2 py-0.5 rounded text-[10px] tracking-wider`}>
      {status}
    </Badge>
  );
};

export default function AdminRideManagement() {
  const { data: rides, isLoading } = useGetAllRidesQuery(undefined);
  const { data: ridesStats } = useGetRidesStatsQuery(undefined);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const stats = ridesStats?.data || [];

  const filteredAndSortedRides = useMemo(() => {
    if (!rides?.data) return [];
    
    let result = [...rides.data];
    
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (ride) =>
          ride._id?.toLowerCase().includes(term) ||
          ride.rider?.name?.toLowerCase().includes(term) ||
          ride.driver?.name?.toLowerCase().includes(term) ||
          ride.pickupLocation?.toLowerCase().includes(term) ||
          ride.destinationLocation?.toLowerCase().includes(term)
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (ride) => ride.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.updatedAt || 0).getTime() - new Date(b.updatedAt || 0).getTime();
      }
      if (sortBy === "fare-high") {
        return (b.fare || 0) - (a.fare || 0);
      }
      if (sortBy === "fare-low") {
        return (a.fare || 0) - (b.fare || 0);
      }
      if (sortBy === "distance-high") {
        return (b.estimatedDistance || 0) - (a.estimatedDistance || 0);
      }
      return 0;
    });
    
    return result;
  }, [rides?.data, searchTerm, statusFilter, sortBy]);

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
            <h1 className="text-xl font-bold tracking-tight">
              Ride Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage all ride activities
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat: { title: string; value: string }) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={getStatIcon(stat.title)}
            />
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/30 backdrop-blur-md p-4 rounded-xl border border-border/40">
          <div className="relative w-full md:max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search by Ride ID, rider, driver, or locations..."
              className="pl-9 h-10 bg-background/50 border-border/50 focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hidden lg:inline">
                Status:
              </span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10 w-full md:w-[150px] bg-background/50 border-border/50">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hidden lg:inline">
                Sort:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 w-full md:w-[160px] bg-background/50 border-border/50">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="fare-high">Fare: High to Low</SelectItem>
                  <SelectItem value="fare-low">Fare: Low to High</SelectItem>
                  <SelectItem value="distance-high">Longest Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Rides Table */}
        <Card className="border border-border/50 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:border-border/80 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">All Rides</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  Complete list of all rides in the system
                </CardDescription>
              </div>
              <Badge variant="secondary" className="font-semibold text-xs py-0.5 px-2.5">
                {filteredAndSortedRides.length} {filteredAndSortedRides.length === 1 ? 'Ride' : 'Rides'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Ride ID
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">Rider</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Driver
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Pickup
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Destination
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">Fare</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Distance
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">
                      Duration
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3">Date</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 py-3 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedRides.length ? (
                    filteredAndSortedRides.map((ride: IRide) => (
                      <TableRow key={ride._id} className="hover:bg-muted/30 border-b border-border/40 transition-colors">
                        <TableCell className="font-mono text-xs font-semibold text-foreground/70">
                          #{ride._id?.slice(0, 8) ?? "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs font-semibold text-foreground/80 truncate max-w-[90px]">
                              {ride.rider?.name ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                              <Car className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs font-semibold text-foreground/80 truncate max-w-[90px]">
                              {ride.driver?.name ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          className="text-xs max-w-[120px] truncate text-foreground/80"
                          title={ride.pickupLocation}
                        >
                          {ride.pickupLocation ?? "-"}
                        </TableCell>
                        <TableCell
                          className="text-xs max-w-[120px] truncate text-foreground/80"
                          title={ride.destinationLocation}
                        >
                          {ride.destinationLocation ?? "-"}
                        </TableCell>
                        <TableCell className="py-2.5">
                          {getStatusBadge(ride.status)}
                        </TableCell>
                        <TableCell className="font-bold text-xs text-foreground">
                          ${ride.fare ?? "-"}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-foreground/85">
                          {ride.estimatedDistance ?? "-"} km
                        </TableCell>
                        <TableCell className="text-xs font-medium text-foreground/85">
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
                        <TableCell className="text-right py-2">
                          <Link to={`/admin/ride/${ride._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center">
                          <MapPin className="w-10 h-10 text-muted-foreground/50 mb-3" />
                          <h3 className="text-sm font-bold text-foreground/90 mb-1">
                            No rides match your criteria
                          </h3>
                          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                            Try adjusting your filters or search term to see other rides.
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

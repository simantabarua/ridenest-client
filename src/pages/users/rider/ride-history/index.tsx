import { useState, useMemo } from "react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import RideCard from "@/components/module/ride/RideCard";
import { Car, Search, TrendingUp, Award, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function RideHistoryPage() {
  const { data: rides, isLoading } = useGetMyRidesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "ongoing" | "cancelled">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "fare_high" | "fare_low">("newest");

  const ridesList: IRide[] = rides?.data || [];

  // Compute statistics for header overview cards
  const stats = useMemo(() => {
    const completed = ridesList.filter((r) => r.status.toLowerCase() === "completed");
    const cancelled = ridesList.filter((r) => r.status.toLowerCase() === "cancelled" || r.status.toLowerCase() === "rejected");
    const totalSpent = completed.reduce((sum, r) => sum + (r.fare || 0), 0);
    const totalDistance = completed.reduce((sum, r) => sum + (r.estimatedDistance || 0), 0);
    const completionRate = ridesList.length > 0 ? Math.round((completed.length / ridesList.length) * 100) : 0;

    return {
      totalTrips: ridesList.length,
      completedTrips: completed.length,
      cancelledTrips: cancelled.length,
      totalSpent,
      totalDistance: parseFloat(totalDistance.toFixed(1)),
      completionRate,
    };
  }, [ridesList]);

  // Handle searching, tab filtering, and sorting
  const filteredAndSortedRides = useMemo(() => {
    let result = [...ridesList];

    // Search filter (by pickup or destination location name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.pickupLocation.toLowerCase().includes(term) ||
          r.destinationLocation.toLowerCase().includes(term)
      );
    }

    // Status tab filter
    if (activeTab === "completed") {
      result = result.filter((r) => r.status.toLowerCase() === "completed");
    } else if (activeTab === "ongoing") {
      result = result.filter((r) =>
        ["requested", "accepted", "picked_up", "in_transit", "ongoing"].includes(
          r.status.toLowerCase()
        )
      );
    } else if (activeTab === "cancelled") {
      result = result.filter((r) =>
        ["cancelled", "rejected"].includes(r.status.toLowerCase())
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "fare_high") {
        return (b.fare || 0) - (a.fare || 0);
      }
      if (sortBy === "fare_low") {
        return (a.fare || 0) - (b.fare || 0);
      }
      return 0;
    });

    return result;
  }, [ridesList, searchTerm, activeTab, sortBy]);

  if (isLoading) {
    return <Loading variant="bars" fullScreen />;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-750">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text">
            Ride History
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-medium">
            Manage, filter, and track all your previous journeys and payments in one clean dashboard.
          </p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100">
        {/* Total Trips */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all hover:bg-card/45 hover:border-primary/20 group">
          <div className="absolute -inset-px bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Total Journeys</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">{stats.totalTrips}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Car className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/70 font-semibold relative z-10">
            <span>{stats.completedTrips} completed &bull; {stats.cancelledTrips} cancelled</span>
          </div>
        </div>

        {/* Total Spent */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all hover:bg-card/45 hover:border-emerald-500/20 group">
          <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Total Spent</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">৳{stats.totalSpent.toLocaleString()}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-emerald-500/80 font-bold relative z-10">
            <span>Avg: ৳{stats.completedTrips > 0 ? Math.round(stats.totalSpent / stats.completedTrips) : 0} per trip</span>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all hover:bg-card/45 hover:border-indigo-500/20 group">
          <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Completion Rate</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">{stats.completionRate}%</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 transition-transform duration-300 group-hover:scale-110">
              <Award className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/70 font-semibold relative z-10">
            <span>High success rate indicates active status</span>
          </div>
        </div>

        {/* Distance Covered */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all hover:bg-card/45 hover:border-amber-500/20 group">
          <div className="absolute -inset-px bg-gradient-to-r from-amber-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Distance Covered</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">{stats.totalDistance} km</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-transform duration-300 group-hover:scale-110">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/70 font-semibold relative z-10">
            <span>Across all completed bookings</span>
          </div>
        </div>
      </div>

      {/* Search, Tabs & Sorting Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/25 border border-border/40 backdrop-blur-md rounded-2xl p-4 animate-in fade-in duration-700">
        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pickup or destination..."
            className="pl-10 h-11 bg-card/40 border-border/50 backdrop-blur-sm focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all rounded-xl text-sm"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex p-1 bg-muted/40 backdrop-blur-sm border border-border/30 rounded-xl overflow-x-auto w-full md:w-auto self-stretch md:self-auto justify-start md:justify-center">
          {(["all", "completed", "ongoing", "cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "ongoing" ? "Active" : tab}
            </button>
          ))}
        </div>

        {/* Sorting selection */}
        <div className="w-full md:w-auto flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <span className="text-xs text-muted-foreground font-bold whitespace-nowrap">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-11 px-3 text-xs bg-card/40 border border-border/50 rounded-xl backdrop-blur-sm text-foreground font-semibold outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer min-w-[140px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="fare_high">Fare: High to Low</option>
            <option value="fare_low">Fare: Low to High</option>
          </select>
        </div>
      </div>

      {/* Ride Cards List */}
      <div className="grid gap-4">
        {filteredAndSortedRides.map((ride: IRide) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedRides.length === 0 && (
        <div className="text-center py-20 bg-card/20 rounded-[2.5rem] border border-dashed border-border/50 backdrop-blur-sm p-6 max-w-lg mx-auto animate-in fade-in duration-500">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/10 mb-6 text-muted-foreground/30">
            <Car className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No journeys found</h3>
          <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm font-medium">
            We couldn't find any journeys matching your criteria. Try adjusting your search term or filters.
          </p>
        </div>
      )}
    </div>
  );
}

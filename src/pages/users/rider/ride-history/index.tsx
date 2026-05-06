import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import RideCard from "@/components/module/ride/RideCard";
import { Car, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function RideHistoryPage() {
  const { data: rides, isLoading } = useGetMyRidesQuery(undefined);

  if (isLoading) {
    return <Loading variant="bars" fullScreen />;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Ride History
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive record of all your past journeys and transportation activity.
          </p>
        </div>
        
        {/* Simple Search/Filter Placeholder */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search journeys..." 
            className="pl-10 h-11 bg-card/40 border-border/50 backdrop-blur-sm focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all rounded-xl"
          />
        </div>
      </div>

      {/* Ride List */}
      <div className="grid gap-6">
        {rides?.data?.map((ride: IRide) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </div>

      {/* Empty State */}
      {rides?.data?.length === 0 && (
        <div className="text-center py-24 bg-card/30 rounded-[2rem] border border-dashed border-border/50 backdrop-blur-sm">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted/10 mb-6">
            <Car className="h-12 w-12 text-muted-foreground/20" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No journeys found</h3>
          <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
            You haven't taken any rides yet. Your activity will appear here once you start booking.
          </p>
        </div>
      )}
    </div>
  );
}

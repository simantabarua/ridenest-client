import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import Loading from "@/components/loading";
import type { IRide } from "@/redux/features/ride/ride.types";
import RideCard from "@/components/module/ride/RideCard";
import { Car } from "lucide-react";

export default function RideHistoryPage() {
  const { data: rides, isLoading } = useGetMyRidesQuery(undefined);

  if (isLoading) {
    return <Loading variant="bars" />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Ride History
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          View all your past rides and trips
        </p>
      </div>

      {/* Ride List */}
      <div className="grid gap-6">
        {rides?.data?.map((ride: IRide) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </div>

        {rides?.data?.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold text-muted-foreground">No rides found</h3>
            <p className="text-sm text-muted-foreground mt-1">You haven't taken any rides yet.</p>
          </div>
        )}
      </div>
  );
}

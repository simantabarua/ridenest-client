import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  User,
  Star,
  Phone,
  Shield,
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSocket } from "@/providers/SocketProvider";
import { useGetActiveRideRiderQuery, useCancelRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { IRide } from "@/redux/features/ride/ride.types";

// Leaflet icon configuration
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom Driver Car Icon
const carIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png", // Premium sports car flat icon
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -19],
});

// Map controller to fit map bounds to pickup, destination, and driver markers
interface MapControllerProps {
  pickup: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  driver: { lat: number; lng: number } | null;
}

function MapController({ pickup, destination, driver }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    const coords: L.LatLngExpression[] = [];
    if (pickup) coords.push([pickup.lat, pickup.lng]);
    if (destination) coords.push([destination.lat, destination.lng]);
    if (driver) coords.push([driver.lat, driver.lng]);

    if (coords.length >= 2) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds.pad(0.25));
    } else if (coords.length === 1) {
      map.setView(coords[0], 15);
    }
  }, [pickup, destination, driver, map]);

  return null;
}

const formSchema = z.object({
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters.",
  }),
});

export default function TrackingPage() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { data: rideResponse, isLoading, isError, refetch } = useGetActiveRideRiderQuery(undefined);
  const [cancelRide] = useCancelRideMutation();

  const ride = rideResponse?.data?.[0] as IRide | undefined;

  // Real-time State
  const [driverLoc, setDriverLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [rideStatus, setRideStatus] = useState<string>("requested");
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  // Sync state initially
  useEffect(() => {
    if (ride) {
      setRideStatus(ride.status);
      
      // Default driver location if assigned but no update received yet
      if (ride.driver && ride.pickupCoords && !driverLoc) {
        setDriverLoc({
          lat: ride.pickupCoords.lat + 0.003,
          lng: ride.pickupCoords.lng + 0.003,
        });
      }
    }
  }, [ride]);

  // Socket triggers for live sync
  useEffect(() => {
    if (!socket || !ride) return;

    // Join rooms
    socket.emit("join_ride", ride._id);
    if (ride.driver?._id) {
      socket.emit("track_driver", ride.driver._id);
    }

    const handleStateChange = (updatedRide: IRide) => {
      console.log("Socket state change in tracking:", updatedRide);
      setRideStatus(updatedRide.status);
      if (updatedRide.status === "completed") {
        toast.success("Your ride has completed! Redirecting to details...");
        navigate(`/rider/ride/${updatedRide._id}`);
      } else if (updatedRide.status === "cancelled") {
        toast.error("Your ride was cancelled.");
        navigate("/rider/dashboard");
      }
    };

    const handleDriverLocation = (data: { driverId: string; latitude: number; longitude: number }) => {
      console.log("Socket: driver coordinate update", data);
      setDriverLoc({ lat: data.latitude, lng: data.longitude });
    };

    socket.on("ride:state_change", handleStateChange);
    socket.on("driver:location_changed", handleDriverLocation);

    return () => {
      socket.off("ride:state_change", handleStateChange);
      socket.off("driver:location_changed", handleDriverLocation);
    };
  }, [socket, ride, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-sm font-semibold text-muted-foreground">Loading active ride details...</span>
      </div>
    );
  }

  if (isError || !ride) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] max-w-sm mx-auto px-6 text-center">
        <Navigation className="w-12 h-12 text-muted-foreground mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-foreground mb-2">No Active Ride Found</h3>
        <p className="text-sm text-muted-foreground mb-6">
          You don't have any booking running currently. Request a ride to get started!
        </p>
        <Button onClick={() => navigate("/rider/request-ride")} className="w-full font-bold">
          Book a Ride Now
        </Button>
      </div>
    );
  }

  // Parse OSRM Polyline coords
  const polylinePositions = (() => {
    if (!ride.routeGeometry) return [];
    try {
      const geo = JSON.parse(ride.routeGeometry);
      if (geo && geo.coordinates) {
        return geo.coordinates.map((c: [number, number]) => [c[1], c[0]]);
      }
    } catch {
      return [];
    }
    return [];
  })();

  const handleCancelSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await cancelRide({
        rideId: ride._id,
        reason: values.reason,
      }).unwrap();
      setIsCancelDialogOpen(false);
      form.reset();
      toast.success("Ride cancelled successfully.");
      navigate("/rider/dashboard");
    } catch (err) {
      toast.error("Failed to cancel the ride.");
    }
  };

  const handleCallDriver = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      toast.info(`Connecting mock call to ${ride.driver?.name || "Driver"}...`);
    }, 1200);
  };

  // Helper status calculations
  const isEnRoute = ["accepted", "ongoing"].includes(rideStatus);
  const isPickedUp = ["pickedUp", "inTransit"].includes(rideStatus);

  const getStatusLabel = () => {
    switch (rideStatus) {
      case "requested":
        return "Searching for driver";
      case "accepted":
        return "Driver is arriving";
      case "pickedUp":
        return "Trip started";
      case "inTransit":
        return "In Transit";
      case "completed":
        return "Completed";
      default:
        return "Active Ride";
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden flex flex-col bg-background">
      
      {/* Fullscreen Map Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapContainer
          center={[ride.pickupCoords?.lat || 23.8103, ride.pickupCoords?.lng || 90.4125]}
          zoom={14}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <MapController
            pickup={ride.pickupCoords || null}
            destination={ride.destinationCoords || null}
            driver={driverLoc}
          />

          {/* Pickup Pin */}
          {ride.pickupCoords && (
            <Marker position={[ride.pickupCoords.lat, ride.pickupCoords.lng]} />
          )}

          {/* Destination Pin */}
          {ride.destinationCoords && (
            <Marker position={[ride.destinationCoords.lat, ride.destinationCoords.lng]} />
          )}

          {/* Driver Pin */}
          {driverLoc && (
            <Marker position={[driverLoc.lat, driverLoc.lng]} icon={carIcon} />
          )}

          {/* OSRM Route Path */}
          {polylinePositions.length > 0 && (
            <Polyline
              positions={polylinePositions}
              pathOptions={{ color: "var(--color-primary)", weight: 5, opacity: 0.8 }}
            />
          )}
        </MapContainer>

        {/* Back Button Floating */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            className="rounded-full shadow-lg bg-background border border-border flex items-center justify-center p-2.5 h-10 w-10 hover:bg-muted"
            onClick={() => navigate("/rider/dashboard")}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Floating Bottom Sheet HUD */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full p-4 md:max-w-md md:left-4 md:right-auto md:bottom-4 animate-slide-up">
        <Card className="border border-border shadow-2xl bg-background/95 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardContent className="p-5 space-y-4">
            
            {/* Top State Bar */}
            <div className="flex items-center justify-between border-b pb-3.5">
              <div>
                <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {getStatusLabel()}
                </span>
                <h3 className="font-extrabold text-foreground mt-1 text-base">
                  {isPickedUp ? "Heading to Destination" : "Driver is approaching"}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-muted-foreground uppercase font-bold block">Secure OTP</span>
                <span className="font-mono text-sm font-extrabold text-foreground tracking-wider bg-muted border px-2 py-0.5 rounded-md">
                  {ride.otp || "----"}
                </span>
              </div>
            </div>

            {/* Travel metrics HUD */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-muted/30 border border-border p-2 rounded-xl">
                <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase block">Est. Time</span>
                <span className="text-sm font-extrabold text-foreground">{ride.estimatedTime || 0} mins</span>
              </div>
              <div className="bg-muted/30 border border-border p-2 rounded-xl">
                <Navigation className="w-4 h-4 mx-auto mb-1 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase block">Distance</span>
                <span className="text-sm font-extrabold text-foreground">{ride.estimatedDistance?.toFixed(2) || 0} km</span>
              </div>
              <div className="bg-muted/30 border border-border p-2 rounded-xl">
                <MapPin className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
                <span className="text-[10px] text-muted-foreground uppercase block">Fare</span>
                <span className="text-sm font-extrabold text-primary">৳{ride.totalFare || ride.fare || 0}</span>
              </div>
            </div>

            {/* Driver specifications */}
            {ride.driver && (
              <div className="flex items-center gap-3.5 bg-muted/20 border p-3 rounded-xl">
                <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center shrink-0 border border-primary/20">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-foreground truncate">{ride.driver.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono truncate">{ride.driver.email}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/20 px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-900/30">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-extrabold text-yellow-700 dark:text-yellow-500">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground font-semibold">
                    <span className="bg-muted px-2 py-0.5 rounded border text-foreground uppercase">
                      {ride.driver.vehicleModel || "Vehicle Model"}
                    </span>
                    <span className="bg-muted px-2 py-0.5 rounded border text-foreground uppercase font-mono">
                      {ride.driver.licensePlate || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Address Details summary */}
            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Pickup</span>
                  <p className="font-medium text-foreground truncate">{ride.pickupLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full mt-1 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Destination</span>
                  <p className="font-medium text-foreground truncate">{ride.destinationLocation}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                variant="outline"
                onClick={() => setIsCancelDialogOpen(true)}
                disabled={isPickedUp}
                className="w-full text-xs font-bold h-10 border-border hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30"
              >
                Cancel Booking
              </Button>
              <Button
                onClick={handleCallDriver}
                disabled={isCalling}
                className="w-full text-xs font-bold h-10 flex items-center justify-center gap-2 shadow-md shadow-primary/10"
              >
                {isCalling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    Call Driver
                  </>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Cancellation Dialog Modal */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Cancel Booking</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Please enter a brief cancellation reason. This helps us ensure reliability.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCancelSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold">Cancellation Reason</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Driver requested cash payment, delay, etc."
                        className="text-xs h-9 bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCancelDialogOpen(false)}
                >
                  Keep Ride
                </Button>
                <Button type="submit" variant="destructive" size="sm">
                  Cancel Ride
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </div>
  );
}

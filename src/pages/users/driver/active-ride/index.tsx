import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Car,
  Navigation,
  User,
  Phone,
  MessageSquare,
  Compass,
  CheckCircle,
  KeyRound,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import {
  useGetActiveRideDriverQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import { toast } from "sonner";
import { useSocket } from "@/providers/SocketProvider";

// Fix Leaflet Default Icon Anchors
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Pickup, Destination, and Driver Car
const pickupIcon = L.divIcon({
  html: `<div class="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse"><div class="w-2.5 h-2.5 bg-white rounded-full"></div></div>`,
  className: "custom-pin",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const destIcon = L.divIcon({
  html: `<div class="w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"><div class="w-2.5 h-2.5 bg-white rounded-full"></div></div>`,
  className: "custom-pin",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const carIcon = L.divIcon({
  html: `<div class="w-9 h-9 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-lg text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 12h14"/></svg></div>`,
  className: "custom-pin",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Component to dynamically fit map view bounds to geometry
function FitBounds({ pickup, destination, route }: { pickup: [number, number]; destination: [number, number]; route: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(L.polyline(route).getBounds(), { padding: [40, 40] });
    } else {
      map.fitBounds(L.latLngBounds([pickup, destination]), { padding: [50, 50] });
    }
  }, [map, pickup, destination, route]);
  return null;
}

export default function ActiveRidePage() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { data: rides, refetch: refetchActive } = useGetActiveRideDriverQuery(undefined, {
    pollingInterval: 6000,
  });
  const activeRide: IRide = rides?.data?.[0] || null;

  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();

  // Driver Simulated Location
  const [driverPos, setDriverPos] = useState<[number, number] | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpError, setOtpError] = useState("");

  const simulatedRouteIndex = useRef<number>(0);

  // Extract locations & parse path line
  const pickupLat = activeRide?.pickupCoords?.lat || 23.8103;
  const pickupLng = activeRide?.pickupCoords?.lng || 90.4125;
  const destLat = activeRide?.destinationCoords?.lat || 23.8153;
  const destLng = activeRide?.destinationCoords?.lng || 90.4225;

  const pickup: [number, number] = [pickupLat, pickupLng];
  const destination: [number, number] = [destLat, destLng];

  let parsedRoute: [number, number][] = [];
  if (activeRide?.routeGeometry) {
    try {
      const geo = JSON.parse(activeRide.routeGeometry);
      if (geo && geo.coordinates) {
        parsedRoute = geo.coordinates.map((c: [number, number]) => [c[1], c[0]]);
      }
    } catch (e) {
      console.error("Failed to parse active route geometry:", e);
    }
  }

  // Initialize and animate Driver position
  useEffect(() => {
    if (!activeRide) return;

    if (activeRide.status === "accepted") {
      // Driver moving from driver starting location (mocked slightly away) towards Pickup
      const startPoint: [number, number] = [
        pickup[0] + 0.005,
        pickup[1] + 0.005,
      ];
      setDriverPos(startPoint);
      
      const interval = setInterval(() => {
        setDriverPos((prev) => {
          if (!prev) return startPoint;
          const dLat = pickup[0] - prev[0];
          const dLng = pickup[1] - prev[1];
          const distance = Math.sqrt(dLat * dLat + dLng * dLng);
          if (distance < 0.0002) {
            clearInterval(interval);
            return pickup;
          }
          return [prev[0] + dLat * 0.15, prev[1] + dLng * 0.15];
        });
      }, 3000);

      return () => clearInterval(interval);
    } else if (activeRide.status === "picked_up") {
      setDriverPos(pickup);
    } else if (activeRide.status === "in_transit" && parsedRoute.length > 0) {
      // Simulate transit movement along OSRM route path
      simulatedRouteIndex.current = 0;
      setDriverPos(parsedRoute[0]);

      const interval = setInterval(() => {
        if (simulatedRouteIndex.current < parsedRoute.length - 1) {
          simulatedRouteIndex.current += 1;
          const nextPos = parsedRoute[simulatedRouteIndex.current];
          setDriverPos(nextPos);

          // Emit location update to the tracking room
          if (socket) {
            socket.emit("driver:location_update", {
              latitude: nextPos[0],
              longitude: nextPos[1],
              bearing: 0,
            });
          }
        } else {
          clearInterval(interval);
        }
      }, 4000);

      return () => clearInterval(interval);
    } else if (activeRide.status === "arrived" || activeRide.status === "completed") {
      setDriverPos(destination);
    }
  }, [activeRide?.status, activeRide?._id]);

  // Listen for socket events to refetch status instantly (e.g. payment completion)
  useEffect(() => {
    if (!socket || !activeRide) return;

    socket.emit("join_ride", activeRide._id);

    const handleStateChange = (updatedRide: IRide) => {
      console.log("Socket: ride status / payment updated in ActiveRidePage", updatedRide);
      refetchActive();
      if (updatedRide.payment?.paymentStatus === "complete") {
        toast.success("Passenger completed the payment! You can now complete the trip.");
      }
    };

    socket.on("ride:state_change", handleStateChange);
    return () => {
      socket.off("ride:state_change", handleStateChange);
    };
  }, [socket, activeRide?._id, refetchActive]);

  // Update Status Steps Trigger
  const handleTransition = async (status: string) => {
    if (!activeRide) return;

    try {
      await updateRideStatus({
        rideId: activeRide._id,
        status: status,
      }).unwrap();
      refetchActive();
      toast.success(`Ride status updated to: ${status.toUpperCase()}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status.");
    }
  };

  // OTP Verification Action
  const handleVerifyOtp = async () => {
    if (!activeRide) return;
    setOtpError("");

    if (otpValue.trim() !== activeRide.otp) {
      setOtpError("Incorrect verification code. Please check with the passenger.");
      toast.error("Incorrect verification code.");
      return;
    }

    try {
      await updateRideStatus({
        rideId: activeRide._id,
        status: "start",
      }).unwrap();
      setShowOtpDialog(false);
      refetchActive();
      toast.success("OTP Verified! Trip Started.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to start ride.");
    }
  };

  if (!activeRide) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border border-border shadow-2xl p-8 text-center rounded-2xl">
          <Navigation className="w-14 h-14 text-muted-foreground/60 mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Active Rides</h3>
          <p className="text-sm text-muted-foreground mb-6">
            You do not have any ongoing ride matches at the moment.
          </p>
          <Button onClick={() => navigate("/driver/dashboard")} className="font-extrabold px-6 h-11">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Determine HUD Action button based on state
  // Lifecycle sequence: ACCEPTED (accept) -> PICKED_UP (pickup) -> IN_TRANSIT (start) -> COMPLETED (complete)
  let actionButton = null;
  if (activeRide.status === "accepted") {
    actionButton = (
      <Button
        onClick={() => handleTransition("pickup")}
        disabled={isUpdating}
        className="w-full font-bold h-12 shadow-lg shadow-emerald-500/10 bg-emerald-600 hover:bg-emerald-700"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Arrived at Pickup Location
      </Button>
    );
  } else if (activeRide.status === "picked_up") {
    actionButton = (
      <Button
        onClick={() => {
          setOtpValue("");
          setOtpError("");
          setShowOtpDialog(true);
        }}
        disabled={isUpdating}
        className="w-full font-bold h-12 shadow-lg shadow-primary/20"
      >
        <KeyRound className="w-5 h-5 mr-2" />
        Enter Passenger OTP to Start
      </Button>
    );
  } else if (activeRide.status === "in_transit") {
    actionButton = (
      <Button
        onClick={() => handleTransition("arrive")}
        disabled={isUpdating}
        className="w-full font-bold h-12 shadow-lg shadow-blue-500/10 bg-blue-600 hover:bg-blue-700"
      >
        <Navigation className="w-5 h-5 mr-2" />
        Arrive Destination
      </Button>
    );
  } else if (activeRide.status === "arrived") {
    const isPaid = activeRide.payment?.paymentStatus === "complete";
    actionButton = (
      <div className="space-y-3 w-full">
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${isPaid ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600" : "bg-amber-500/10 border-amber-500/30 text-amber-600 animate-pulse"}`}>
          <span>Payment Status:</span>
          <span>{isPaid ? "Paid" : "Unpaid (Waiting for Rider)"}</span>
        </div>
        <Button
          onClick={async () => {
            try {
              await updateRideStatus({
                rideId: activeRide._id,
                status: "complete",
              }).unwrap();
              toast.success(`Trip completed successfully! Earned ৳${activeRide.totalFare || activeRide.fare}`);
              navigate("/driver/dashboard");
            } catch (err: any) {
              toast.error(err?.data?.message || "Failed to complete trip.");
            }
          }}
          disabled={isUpdating || !isPaid}
          className={`w-full font-bold h-12 shadow-lg ${isPaid ? "shadow-rose-500/10 bg-rose-600 hover:bg-rose-700" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
        >
          <ShieldCheck className="w-5 h-5 mr-2" />
          {isPaid ? "Complete Trip" : "Complete Trip (Waiting for Payment)"}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* Dynamic Floating OTP Verification Modal */}
      {showOtpDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm border border-border bg-background shadow-2xl rounded-2xl animate-scale-up">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
                <KeyRound className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-extrabold text-foreground">Verify Passenger OTP</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Ask the passenger for the 4-digit code shown on their app screen.
              </p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <Input
                type="text"
                placeholder="Enter 4-Digit OTP"
                maxLength={4}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                className="text-center text-xl font-bold tracking-widest h-12 focus-visible:ring-primary"
              />
              {otpError && <p className="text-xs text-destructive text-center font-semibold">{otpError}</p>}
              
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOtpDialog(false)}
                  className="flex-1 font-bold h-11"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyOtp}
                  className="flex-1 font-bold h-11"
                  disabled={otpValue.length < 4}
                >
                  Verify & Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map View Section */}
      <div className="relative flex-1 h-[45%] md:h-full w-full z-10">
        <MapContainer
          center={pickup}
          zoom={14}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Pickup Marker */}
          <Marker position={pickup} icon={pickupIcon}>
            <Popup>
              <div className="p-1 font-medium">Pickup Point</div>
            </Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker position={destination} icon={destIcon}>
            <Popup>
              <div className="p-1 font-medium">Destination</div>
            </Popup>
          </Marker>

          {/* Driver's Moving Location Marker */}
          {driverPos && (
            <Marker position={driverPos} icon={carIcon}>
              <Popup>
                <div className="p-1 font-medium">Your Car</div>
              </Popup>
            </Marker>
          )}

          {/* Polyline Route */}
          {parsedRoute.length > 0 && (
            <Polyline
              positions={parsedRoute}
              color="#3b82f6"
              weight={5}
              opacity={0.8}
            />
          )}

          {/* Bounds Adjuster */}
          <FitBounds pickup={pickup} destination={destination} route={parsedRoute} />
        </MapContainer>

        {/* Floating Reset Button */}
        {driverPos && (
          <button
            onClick={() => window.location.reload()}
            className="absolute bottom-4 right-4 bg-background text-foreground border shadow-lg rounded-full p-3 hover:bg-muted z-20 transition-colors"
          >
            <Compass className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Control HUD */}
      <div className="w-full md:w-[380px] bg-background border-t md:border-t-0 md:border-l border-border shadow-2xl flex flex-col z-20 overflow-y-auto">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              Trip In Progress
            </span>
            <span className="text-xs text-muted-foreground flex items-center font-medium">
              <Compass className="w-3.5 h-3.5 mr-1" />
              {activeRide.status.toUpperCase()}
            </span>
          </div>

          <h2 className="text-lg font-black text-foreground">Active Order</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Follow navigation instructions precisely.
          </p>
        </div>

        {/* Passenger Meta Card */}
        <div className="p-5 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-foreground truncate">
                  {activeRide.rider?.name || "Passenger"}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {activeRide.rider?.email || "Premium Member"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2.5 bg-background border rounded-xl text-foreground hover:bg-muted transition-colors">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-2.5 bg-background border rounded-xl text-foreground hover:bg-muted transition-colors">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Location Route Flow */}
        <div className="p-5 space-y-4 border-b border-border flex-1">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">
                  Pickup Location
                </span>
                <p className="text-xs font-semibold text-foreground mt-0.5 leading-relaxed">
                  {activeRide.pickupLocation}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full mt-1 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">
                  Destination Location
                </span>
                <p className="text-xs font-semibold text-foreground mt-0.5 leading-relaxed">
                  {activeRide.destinationLocation}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t">
            <div className="bg-muted/40 p-3 rounded-xl border">
              <span className="text-[9px] font-bold text-muted-foreground uppercase block">
                Estimated Fare
              </span>
              <span className="text-base font-black text-primary">
                ৳{activeRide.totalFare || activeRide.fare}
              </span>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl border">
              <span className="text-[9px] font-bold text-muted-foreground uppercase block">
                Distance
              </span>
              <span className="text-base font-black text-foreground">
                {activeRide.estimatedDistance} km
              </span>
            </div>
          </div>
        </div>

        {/* Action HUD Footer */}
        <div className="p-5 bg-background border-t">
          {actionButton}
        </div>
      </div>
    </div>
  );
}

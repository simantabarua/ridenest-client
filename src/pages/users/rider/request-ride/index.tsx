import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Car,
  Bike,
  Truck,
  CreditCard,
  Banknote,
  MapPin,
  Navigation,
  X,
  Star,
  Phone,
  Shield,
  Loader2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTripDetails, resetTripDetails } from "@/redux/features/trip/trip.slice";
import {
  useRequestRideMutation,
  useGetActiveRideRiderQuery,
  useCancelRideMutation,
} from "@/redux/features/ride/ride.api";
import { useSocket } from "@/providers/SocketProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  calculateRouteDistance,
  nominatimSearch,
  nominatimReverse,
} from "@/utils/getLocation";
import type { IRide } from "@/redux/features/ride/ride.types";

// Leaflet icon fixes
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const shortenAddress = (address: string | null, maxLength = 35): string => {
  if (!address) return "Not selected";
  const parts = address.split(",").slice(0, 3).map(p => p.trim());
  const mainPart = parts.join(", ");
  return mainPart.length > maxLength ? `${mainPart.substring(0, maxLength)}...` : mainPart;
};

// Map component helper to center on route or current locations
interface MapControllerProps {
  pickup: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
}

function MapController({ pickup, destination }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds([pickup.lat, pickup.lng], [destination.lat, destination.lng]);
      map.fitBounds(bounds.pad(0.25));
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 15);
    } else if (destination) {
      map.setView([destination.lat, destination.lng], 15);
    }
  }, [pickup, destination, map]);

  return null;
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export default function RequestRidePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tripDetails = useAppSelector((state) => state.trip);
  const { socket } = useSocket();

  // Queries/Mutations
  const { data: activeRideResponse, refetch: refetchActive } = useGetActiveRideRiderQuery(undefined);
  const [requestRide] = useRequestRideMutation();
  const [cancelRide] = useCancelRideMutation();

  // State Management
  const [step, setStep] = useState<"location" | "vehicle" | "searching" | "assigned">("location");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [selectedVehicle, setSelectedVehicle] = useState<"moto" | "sedan" | "xl">("sedan");
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeRideData, setActiveRideData] = useState<IRide | null>(null);

  // Address Inputs
  const [pickupText, setPickupText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Suggestion[]>([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const pickupRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

  // Sync active ride on load
  useEffect(() => {
    const active = activeRideResponse?.data?.[0];
    if (active) {
      setActiveRideData(active);
      if (active.status === "requested") {
        setStep("searching");
      } else if (["accepted", "ongoing", "picked_up", "in_transit"].includes(active.status)) {
        setStep("assigned");
      }
    }
  }, [activeRideResponse]);

  // Socket state listeners
  useEffect(() => {
    if (!socket) return;

    const handleStateChange = (updatedRide: IRide) => {
      console.log("Socket: ride state change detected", updatedRide);
      setActiveRideData(updatedRide);
      if (updatedRide.status === "requested") {
        setStep("searching");
      } else if (["accepted", "ongoing", "picked_up", "in_transit"].includes(updatedRide.status)) {
        setStep("assigned");
        toast.success(`Driver ${updatedRide.driver?.name || ""} assigned!`);
      } else if (updatedRide.status === "completed") {
        toast.success("Ride completed!");
        dispatch(resetTripDetails());
        navigate(`/rider/ride/${updatedRide._id}`);
      } else if (updatedRide.status === "cancelled" || updatedRide.status === "rejected") {
        toast.error("Ride was cancelled or declined by driver.");
        setActiveRideData(null);
        setStep("vehicle");
      }
    };

    socket.on("ride:state_change", handleStateChange);
    return () => {
      socket.off("ride:state_change", handleStateChange);
    };
  }, [socket, dispatch, navigate]);

  // Click outside suggestions lists
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowDestinationDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  // Debounce search suggestions for pickup
  useEffect(() => {
    if (!pickupText || pickupText.length < 3) {
      setPickupSuggestions([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const res = await nominatimSearch(pickupText);
        setPickupSuggestions(res);
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [pickupText]);

  // Debounce search suggestions for destination
  useEffect(() => {
    if (!destinationText || destinationText.length < 3) {
      setDestinationSuggestions([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const res = await nominatimSearch(destinationText);
        setDestinationSuggestions(res);
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [destinationText]);

  // Set pickup location
  const handleSelectPickup = (item: Suggestion) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    setPickupCoords({ lat, lng });
    setPickupText(item.display_name);
    setShowPickupDropdown(false);
    triggerRouteCalculation({ lat, lng }, destinationCoords);
  };

  // Set destination location
  const handleSelectDestination = (item: Suggestion) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    setDestinationCoords({ lat, lng });
    setDestinationText(item.display_name);
    setShowDestinationDropdown(false);
    triggerRouteCalculation(pickupCoords, { lat, lng });
  };

  // Use current GPS location
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
          const rev = await nominatimReverse(lat, lon);
          setPickupCoords({ lat, lng: lon });
          setPickupText(rev.display_name || "My Location");
          triggerRouteCalculation({ lat, lng: lon }, destinationCoords);
          toast.success("Located successfully!");
        } catch (err) {
          toast.error("Could not reverse lookup coordinates.");
        }
      },
      () => {
        toast.error("Geolocation access denied.");
      }
    );
  };

  // Calculate route distance/time using OSRM
  const triggerRouteCalculation = async (
    pCoords: { lat: number; lng: number } | null,
    dCoords: { lat: number; lng: number } | null
  ) => {
    if (!pCoords || !dCoords) return;
    setLoadingRoute(true);
    try {
      const fromLoc = { name: "Pickup", lat: pCoords.lat, lon: pCoords.lng };
      const toLoc = { name: "Destination", lat: dCoords.lat, lon: dCoords.lng };
      const routeRes = await calculateRouteDistance(fromLoc, toLoc);

      const estimatedTime = routeRes.time ? parseInt(routeRes.time) : 0;
      const distance = parseFloat(routeRes.distance) || 0;
      const basePrice = Math.round(distance * 50);

      dispatch(
        setTripDetails({
          pickupLocation: pickupText || "Pickup",
          destinationLocation: destinationText || "Destination",
          pickupLatitude: pCoords.lat,
          pickupLongitude: pCoords.lng,
          destinationLatitude: dCoords.lat,
          destinationLongitude: dCoords.lng,
          estimatedDistance: distance,
          estimatedTime,
          fare: basePrice,
          totalFare: basePrice,
          routeGeometry: routeRes.geometry ? JSON.stringify(routeRes.geometry) : null,
        })
      );
      setStep("vehicle");
    } catch (err) {
      toast.error("Error drawing route path. Please try alternative locations.");
    } finally {
      setLoadingRoute(false);
    }
  };

  // Process Request Ride
  const handleRequestRide = async () => {
    if (!pickupCoords || !destinationCoords) {
      toast.error("Pickup and destination locations must be defined.");
      return;
    }
    setIsSubmitting(true);

    const baseFare = tripDetails.fare || 0;
    const factor = selectedVehicle === "moto" ? 0.6 : selectedVehicle === "xl" ? 1.4 : 1.0;
    const calculatedFare = Math.round(baseFare * factor);

    const reqData = {
      pickupLocation: tripDetails.pickupLocation || pickupText,
      destinationLocation: tripDetails.destinationLocation || destinationText,
      estimatedDistance: tripDetails.estimatedDistance || 0,
      estimatedTime: tripDetails.estimatedTime || 0,
      fare: calculatedFare,
      totalFare: calculatedFare,
      paymentMethod,
      pickupCoords: { lat: pickupCoords.lat, lng: pickupCoords.lng },
      destinationCoords: { lat: destinationCoords.lat, lng: destinationCoords.lng },
      routeGeometry: tripDetails.routeGeometry || undefined,
      vehicleType: selectedVehicle,
    };

    try {
      const res = await requestRide(reqData).unwrap();
      if (res.success && res.data) {
        setActiveRideData(res.data);
        setStep("searching");
        toast.success("Searching for nearby drivers...");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to dispatch ride request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel Request
  const handleCancelRide = async () => {
    if (!activeRideData) return;
    try {
      await cancelRide({ rideId: activeRideData._id, reason: "Cancelled by user" }).unwrap();
      toast.success("Ride request cancelled.");
      setStep("vehicle");
      setActiveRideData(null);
    } catch (err) {
      toast.error("Failed to cancel active ride.");
    }
  };

  // Decode route geometry to line positions for react-leaflet
  const polylinePositions = (() => {
    const geomStr = tripDetails.routeGeometry;
    if (!geomStr) return [];
    try {
      const geo = JSON.parse(geomStr);
      if (geo && geo.coordinates) {
        return geo.coordinates.map((c: [number, number]) => [c[1], c[0]]);
      }
    } catch {
      return [];
    }
    return [];
  })();

  // Multipliers & Labels
  const vehicles = [
    {
      id: "moto",
      name: "RideNest Moto",
      multiplier: 0.6,
      icon: Bike,
      desc: "Fast motorcycle, skip the city traffic",
    },
    {
      id: "sedan",
      name: "RideNest Sedan",
      multiplier: 1.0,
      icon: Car,
      desc: "Comfortable standard everyday ride",
    },
    {
      id: "xl",
      name: "RideNest SUV",
      multiplier: 1.4,
      icon: Truck,
      desc: "Spacious SUVs for families and baggage",
    },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden flex flex-col md:flex-row bg-background">
      
      {/* Absolute Fullscreen Interactive Leaflet Map */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapContainer
          center={[23.8103, 90.4125]} // Dhaka coordinates default
          zoom={12}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          <MapController pickup={pickupCoords} destination={destinationCoords} />

          {/* Pickup Marker */}
          {pickupCoords && (
            <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
              {/* Tooltip or popup */}
            </Marker>
          )}

          {/* Destination Marker */}
          {destinationCoords && (
            <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
              {/* Tooltip or popup */}
            </Marker>
          )}

          {/* Route Path Polyline */}
          {polylinePositions.length > 0 && (
            <Polyline
              positions={polylinePositions}
              pathOptions={{ color: "var(--color-primary)", weight: 5, opacity: 0.8 }}
            />
          )}
        </MapContainer>

        {/* Floating Top Left Control */}
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

      {/* FLOATING TOP/LEFT LOCATION PANEL */}
      {step === "location" && (
        <div className="absolute top-4 left-16 right-4 md:right-auto md:w-96 z-10 animate-fade-in">
          <Card className="border border-border shadow-xl bg-background/95 backdrop-blur-md">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Set Your Route</h2>
              </div>

              {/* Pickup Search */}
              <div className="space-y-1.5 relative" ref={pickupRef}>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pickup</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4" />
                  <Input
                    value={pickupText}
                    onChange={(e) => {
                      setPickupText(e.target.value);
                      setShowPickupDropdown(true);
                    }}
                    onFocus={() => setShowPickupDropdown(true)}
                    className="pl-9 pr-9 text-sm h-10 bg-background text-foreground border-input"
                    placeholder="Enter pickup location"
                  />
                  {pickupText && (
                    <button
                      onClick={() => {
                        setPickupText("");
                        setPickupCoords(null);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {showPickupDropdown && pickupSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 z-30 mt-1 max-h-56 overflow-y-auto bg-popover border border-border rounded-xl shadow-2xl">
                    {pickupSuggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectPickup(item)}
                        className="w-full text-left px-3 py-2.5 text-xs text-foreground hover:bg-accent flex items-start gap-2 border-b border-muted last:border-0"
                      >
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="truncate">{item.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination Search */}
              <div className="space-y-1.5 relative" ref={destinationRef}>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 w-4 h-4" />
                  <Input
                    value={destinationText}
                    onChange={(e) => {
                      setDestinationText(e.target.value);
                      setShowDestinationDropdown(true);
                    }}
                    onFocus={() => setShowDestinationDropdown(true)}
                    className="pl-9 pr-9 text-sm h-10 bg-background text-foreground border-input"
                    placeholder="Where to?"
                  />
                  {destinationText && (
                    <button
                      onClick={() => {
                        setDestinationText("");
                        setDestinationCoords(null);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {showDestinationDropdown && destinationSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 z-30 mt-1 max-h-56 overflow-y-auto bg-popover border border-border rounded-xl shadow-2xl">
                    {destinationSuggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectDestination(item)}
                        className="w-full text-left px-3 py-2.5 text-xs text-foreground hover:bg-accent flex items-start gap-2 border-b border-muted last:border-0"
                      >
                        <Navigation className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="truncate">{item.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  onClick={handleUseMyLocation}
                  className="flex-1 text-xs font-bold border-border h-9"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  My Location
                </Button>
                {loadingRoute && (
                  <Button disabled className="flex-1 text-xs font-bold h-9">
                    <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                    Routing...
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FLOATING BOTTOM SHEET FOR VEHICLE SELECTION AND RIDE FLOW */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full p-4 md:max-w-md md:left-4 md:right-auto md:bottom-4 animate-slide-up">
        <Card className="border border-border shadow-2xl bg-background/95 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            
            {/* STEP 1: SELECTING LOCATION (No route calculated yet) */}
            {step === "location" && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Choose your next destination</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto">
                    Enter pickup and destination details above to estimate fares and timings instantly.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE VEHICLE & FARE DETAILS */}
            {step === "vehicle" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-foreground">Select Vehicle Class</h3>
                    <p className="text-xs text-muted-foreground">
                      {tripDetails.estimatedDistance?.toFixed(2)} km • {tripDetails.estimatedTime} mins
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 text-primary hover:bg-primary/5"
                    onClick={() => setStep("location")}
                  >
                    Edit Locations
                  </Button>
                </div>

                {/* Vehicle Choice List */}
                <div className="space-y-2.5">
                  {vehicles.map((veh) => {
                    const VehIcon = veh.icon;
                    const basePrice = tripDetails.fare || 0;
                    const calculatedFare = Math.round(basePrice * veh.multiplier);
                    const isSelected = selectedVehicle === veh.id;

                    return (
                      <button
                        key={veh.id}
                        onClick={() => setSelectedVehicle(veh.id as any)}
                        className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                            : "border-border bg-background hover:bg-muted/40"
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                          <VehIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-sm font-bold text-foreground">{veh.name}</span>
                            <span className="text-base font-extrabold text-primary">৳{calculatedFare}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate leading-tight">{veh.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Payment Selection */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all duration-150 ${
                        paymentMethod === "cash"
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:bg-muted/30"
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-foreground">Cash</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all duration-150 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:bg-muted/30"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold text-foreground">Stripe Card</span>
                    </button>
                  </div>
                </div>

                {/* Submit Request */}
                <Button
                  onClick={handleRequestRide}
                  disabled={isSubmitting}
                  className="w-full h-11 text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Requesting Ride...
                    </>
                  ) : (
                    <>
                      Confirm & Request {selectedVehicle.toUpperCase()}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* STEP 3: SEARCHING FOR NEAREST DRIVER */}
            {step === "searching" && (
              <div className="space-y-5 py-2 text-center">
                <div className="relative w-20 h-20 mx-auto my-3 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75"></div>
                  <div className="absolute w-14 h-14 rounded-full bg-primary/20 animate-pulse flex items-center justify-center"></div>
                  <Car className="w-7 h-7 text-primary animate-bounce z-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Contacting Nearby Drivers...</h3>
                  <p className="text-xs text-muted-foreground px-4">
                    Scanning for available {selectedVehicle} drivers within your location. This usually takes under a minute.
                  </p>
                </div>

                <div className="border border-border bg-muted/30 rounded-xl p-3 flex items-center justify-between text-left">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Routing</span>
                    <p className="text-xs font-medium text-foreground truncate">{shortenAddress(tripDetails.pickupLocation)}</p>
                    <p className="text-xs font-medium text-foreground truncate mt-0.5">→ {shortenAddress(tripDetails.destinationLocation)}</p>
                  </div>
                  <div className="text-right pl-3 shrink-0">
                    <span className="text-xs font-extrabold text-primary">৳{activeRideData?.totalFare || tripDetails.totalFare}</span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={handleCancelRide}
                  className="w-full h-10 text-xs font-bold"
                >
                  Cancel Request
                </Button>
              </div>
            )}

            {/* STEP 4: DRIVER ASSIGNED HUD */}
            {step === "assigned" && activeRideData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <span className="text-[9px] bg-green-500/10 text-green-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Driver Heading to you
                    </span>
                    <h3 className="font-bold text-foreground mt-1 text-sm">Driver Assigned</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                    <span>OTP:</span>
                    <span className="font-mono tracking-wider">{activeRideData.otp || "----"}</span>
                  </div>
                </div>

                {/* Driver Identity Card */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shrink-0">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-foreground truncate">{activeRideData.driver?.name || "Premium Driver"}</h4>
                        <p className="text-[10px] text-muted-foreground truncate">{activeRideData.driver?.email}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/20 px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-900/30">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-bold text-yellow-700 dark:text-yellow-500">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle specifications */}
                <div className="grid grid-cols-2 gap-2 bg-muted/40 rounded-xl p-3 border">
                  <div>
                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Vehicle Class</span>
                    <p className="text-xs font-bold text-foreground uppercase">{activeRideData.vehicleType || "sedan"}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Ride State</span>
                    <p className="text-xs font-bold text-primary uppercase">{activeRideData.status}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Button
                    variant="outline"
                    className="w-full text-xs font-bold h-10 border-border"
                    onClick={handleCancelRide}
                    disabled={activeRideData.status === "ongoing" || activeRideData.status === "in_transit"}
                  >
                    Cancel Ride
                  </Button>
                  <Button
                    className="w-full text-xs font-bold h-10 flex items-center justify-center gap-1.5"
                    onClick={() => navigate("/rider/tracking")}
                  >
                    <Eye className="w-4 h-4" />
                    Track Live
                  </Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>

    </div>
  );
}

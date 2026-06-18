import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pause,
  Car,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  CheckCircle,
  XCircle,
  BellRing,
} from "lucide-react";
import {
  useGetDriverStatsQuery,
  useGetMyRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import {
  useGetAvailabilityQuery,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driver.api";
import RideCard from "@/components/module/ride/RideCard";
import DashboardHeader from "@/components/dashboard-header";
import { useSocket } from "@/providers/SocketProvider";
import { toast } from "sonner";

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { data: availability, refetch: refetchAvailability } = useGetAvailabilityQuery(undefined);
  const { data: recentRides, refetch: refetchRides } = useGetMyRidesQuery(undefined);
  const [setAvailability] = useSetAvailabilityMutation();
  const { data: driverStats } = useGetDriverStatsQuery(undefined);
  const [updateRideStatus, { isLoading: isUpdatingStatus }] = useUpdateRideStatusMutation();

  const stats = driverStats?.data;
  const isOnline = availability?.data?.isAvailable;

  // Real-time Offers state
  const [activeOffer, setActiveOffer] = useState<IRide | null>(null);

  // Toggle availability status
  const toggleOnlineStatus = async () => {
    try {
      await setAvailability({ isAvailable: !isOnline }).unwrap();
      refetchAvailability();
      toast.success(isOnline ? "You are now Offline" : "You are now Online!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  // 1. Periodically Stream Location to socket server when online
  useEffect(() => {
    if (!socket || !isOnline) return;

    const sendLocationUpdate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude, heading } = pos.coords;
            socket.emit("driver:location_update", {
              latitude,
              longitude,
              bearing: heading || 0,
            });
            console.log("Streamed live coordinates:", latitude, longitude);
          },
          (err) => {
            console.warn("GPS failed, streaming mock coordinates:", err.message);
            // Mock coordinate updates around Dhaka if GPS not active/granted in development
            const mockLat = 23.8103 + (Math.random() - 0.5) * 0.01;
            const mockLng = 90.4125 + (Math.random() - 0.5) * 0.01;
            socket.emit("driver:location_update", {
              latitude: mockLat,
              longitude: mockLng,
              bearing: Math.floor(Math.random() * 360),
            });
          }
        );
      }
    };

    // Run immediately and then every 8 seconds
    sendLocationUpdate();
    const interval = setInterval(sendLocationUpdate, 8000);

    return () => clearInterval(interval);
  }, [socket, isOnline]);

  // 2. Listen for Real-time Ride Offers via Socket
  useEffect(() => {
    if (!socket || !isOnline) {
      setActiveOffer(null);
      return;
    }

    const handleOffer = (offer: IRide) => {
      console.log("Socket: Received ride offer", offer);
      // Play a notification sound or trigger visual popup
      setActiveOffer(offer);
      toast.info(`New ride request from ${offer.rider?.name || "Passenger"}!`, {
        icon: <BellRing className="text-primary w-5 h-5 animate-bounce" />,
      });
    };

    socket.on("ride:request_offer", handleOffer);
    return () => {
      socket.off("ride:request_offer", handleOffer);
    };
  }, [socket, isOnline]);

  // Handle Offer Actions
  const handleAcceptOffer = async (rideId: string) => {
    try {
      await updateRideStatus({
        rideId,
        status: "accept",
      }).unwrap();
      toast.success("Request accepted successfully!");
      setActiveOffer(null);
      navigate("/driver/active-ride");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to accept the request.");
    }
  };

  const handleDeclineOffer = async (rideId: string) => {
    try {
      await updateRideStatus({
        rideId,
        status: "reject",
      }).unwrap();
      toast.success("Request declined.");
      setActiveOffer(null);
    } catch (err) {
      toast.error("Failed to decline the request.");
    }
  };

  const statIcons = [
    <Car className="w-5 h-5" />,
    <Star className="w-5 h-5" />,
    <Clock className="w-5 h-5" />,
    <DollarSign className="w-5 h-5" />,
  ];

  return (
    <div className="pb-10 relative">
      
      {/* Floating Incoming Offer Premium Card */}
      {activeOffer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md border-border bg-background shadow-2xl rounded-2xl overflow-hidden animate-slide-up">
            <CardHeader className="bg-primary text-primary-foreground p-5 pb-4">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 animate-pulse text-white" />
                <CardTitle className="text-base font-extrabold tracking-wide uppercase text-white">Incoming Ride Offer</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              {/* Passenger Meta */}
              <div className="flex items-center gap-3 border-b pb-3.5">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-foreground">{activeOffer.rider?.name || "Premium Rider"}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Rating: 4.9 • Cash Payment Preferred</p>
                </div>
              </div>

              {/* Pickup & Destination */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Pickup location</span>
                    <p className="font-medium text-foreground truncate">{activeOffer.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full mt-1 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Destination</span>
                    <p className="font-medium text-foreground truncate">{activeOffer.destinationLocation}</p>
                  </div>
                </div>
              </div>

              {/* Ride Metrics */}
              <div className="grid grid-cols-2 gap-3 bg-muted/40 border p-3.5 rounded-xl text-center">
                <div>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold block">Fare Earnings</span>
                  <span className="text-base font-extrabold text-primary">৳{activeOffer.totalFare || activeOffer.fare}</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold block">Distance</span>
                  <span className="text-base font-extrabold text-foreground">{activeOffer.estimatedDistance} km</span>
                </div>
              </div>

              {/* Slider / Action Controls */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <Button
                  variant="outline"
                  onClick={() => handleDeclineOffer(activeOffer._id)}
                  disabled={isUpdatingStatus}
                  className="w-full font-bold h-11 border-border hover:bg-destructive/5 hover:text-destructive"
                >
                  <XCircle className="w-4 h-4 mr-2 text-destructive" />
                  Decline
                </Button>
                <Button
                  onClick={() => handleAcceptOffer(activeOffer._id)}
                  disabled={isUpdatingStatus}
                  className="w-full font-bold h-11 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Offer
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <DashboardHeader />

        {/* Online Status Card */}
        <Card
          className={`mb-6 border transition-all duration-300 ${
            isOnline ? "border-green-500/30 bg-green-500/5 shadow-green-500/5 shadow-md" : "border-border"
          }`}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isOnline ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isOnline ? (
                    <div className="w-5 h-5 bg-white rounded-full animate-ping"></div>
                  ) : (
                    <Pause className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {isOnline ? "Active & Online" : "Go Online to Start"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isOnline
                      ? "Streaming live coordinates. Receiving rider dispatch orders..."
                      : "You are offline. Turn on status to match with local riders."}
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleOnlineStatus}
                variant={isOnline ? "destructive" : "default"}
                className="font-bold text-xs"
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats?.map(
            (stat: { title: string; value: string }, index: number) => (
              <Card
                key={index}
                className="border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {statIcons[index]}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-black text-foreground">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Recent Rides */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Recent Trips</h2>
          </div>
          {recentRides?.data?.length === 0 ? (
            <Card className="border border-border p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No trip history records yet.
              </p>
              <Button onClick={toggleOnlineStatus} className="mt-4 font-bold text-xs">
                {isOnline ? "Awaiting Rides..." : "Go Online Now"}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {recentRides?.data?.map((ride: IRide) => (
                <RideCard key={ride._id} ride={ride} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

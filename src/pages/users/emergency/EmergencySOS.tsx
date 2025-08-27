import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone, MapPin, MessageCircle, AlertTriangle } from "lucide-react";
import Location from "./Map";
import { toast } from "sonner";

export default function EmergencySOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setIsSharingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(location);
        setIsSharingLocation(false);
      },
      (error) => {
        setIsSharingLocation(false);
        setLocationError(error.message);
        toast.error(`Failed to get location: ${error.message}`);
      }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen, getCurrentLocation]);

  const handleShareLocation = () => {
    if (currentLocation) {
      const locationString = `Lat: ${currentLocation.lat.toFixed(
        6
      )}, Lng: ${currentLocation.lng.toFixed(6)}`;
      toast.success(`Location shared: ${locationString}`);
      console.log("Sharing location:", locationString);
    } else {
      toast.error("Location not available");
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-24 h-24 bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center animate-pulse"
          >
            <AlertTriangle className="w-8 h-8" />
            <span>SOS</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-red-600" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Select an emergency action below. Your current location will be
              shared.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Location
                  currentLocation={currentLocation}
                  isSharingLocation={isSharingLocation}
                  locationError={locationError}
                  onRefresh={getCurrentLocation}
                />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={() => {
                  window.open("tel:999", "_blank");
                  toast.success("Calling 999");
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 999
              </Button>
              <Button
                onClick={() => {
                  toast.success("Notifying emergency services. Stay clam!!");
                }}
                variant="outline"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Notify
              </Button>
              <Button onClick={handleShareLocation} variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Share Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Phone,
  MapPin,
  Mail,
  MessageCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredMethod: "call" | "sms" | "whatsapp" | "email";
}

interface EmergencySOSProps {
  isActiveRide: boolean;
  userEmergencyContacts?: EmergencyContact[];
}

export default function EmergencySOS({
  isActiveRide,
  userEmergencyContacts = [],
}: EmergencySOSProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedContact, setSelectedContact] =
    useState<EmergencyContact | null>(null);
  const [newContact, setNewContact] = useState<Omit<EmergencyContact, "id">>({
    name: "",
    phone: "",
    email: "",
    preferredMethod: "call",
  });
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Get current location
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
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsSharingLocation(false);
        toast.success("Location retrieved successfully");
      },
      (error) => {
        setIsSharingLocation(false);
        setLocationError(error.message);
        toast.error(`Failed to get location: ${error.message}`);
      }
    );
  }, []);

  // Initialize location when component mounts
  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen, getCurrentLocation]);

  // Send message via preferred method
  const sendMessage = useCallback(
    (message: string, action: string) => {
      if (!selectedContact || !currentLocation) return;

      const mapLink = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
      const fullMessage =
        action === "share"
          ? `My current location: ${mapLink}`
          : `I need help! My current location: ${mapLink}`;

      switch (selectedContact.preferredMethod) {
        case "call":
          window.open(`tel:${selectedContact.phone}`, "_self");
          break;
        case "sms":
          window.open(
            `sms:${selectedContact.phone}?body=${encodeURIComponent(
              fullMessage
            )}`,
            "_self"
          );
          break;
        case "whatsapp":
          window.open(
            `https://wa.me/${selectedContact.phone.replace(
              /\D/g,
              ""
            )}?text=${encodeURIComponent(fullMessage)}`,
            "_blank"
          );
          break;
        case "email":
          window.open(
            `mailto:${selectedContact.email}?subject=${
              action === "share" ? "My Current Location" : "Emergency Alert"
            }&body=${encodeURIComponent(fullMessage)}`,
            "_self"
          );
          break;
      }

      toast.success(
        `${
          action === "share" ? "Location shared" : "Emergency contact notified"
        } via ${selectedContact.preferredMethod}`
      );
    },
    [selectedContact, currentLocation]
  );

  // Handle emergency action
  const handleEmergencyAction = useCallback(
    (action: "call" | "notify" | "share") => {
      if (!selectedContact) {
        toast.error("Please select an emergency contact");
        return;
      }

      if (!currentLocation) {
        toast.error("Location not available. Please try again.");
        return;
      }

      if (action === "call") {
        window.open(`tel:${selectedContact.phone}`, "_self");
        toast.success("Calling emergency contact...");
      } else {
        sendMessage(
          action === "notify" ? "I need help!" : "Share location",
          action
        );
      }
    },
    [selectedContact, currentLocation, sendMessage]
  );

  // Call emergency services
  const callEmergencyServices = useCallback(() => {
    try {
      window.open("tel:911", "_self");
      toast.success("Calling emergency services...");
    } catch (error) {
      toast.error("Failed to call emergency services");
    }
  }, []);

  const handleAddContact = useCallback(() => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Name and phone are required");
      return;
    }

    if (!/^[\d\s\-\+\(\)]+$/.test(newContact.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (
      newContact.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.email)
    ) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Emergency contact added successfully");
    setIsAddingContact(false);
    setNewContact({ name: "", phone: "", email: "", preferredMethod: "call" });
  }, [newContact]);

  if (!isActiveRide) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center animate-pulse"
          >
            <AlertTriangle className="w-8 h-8" />
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
            {/* Location Status with Map Preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isSharingLocation ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                    Getting location...
                  </div>
                ) : locationError ? (
                  <div className="text-sm text-red-500">{locationError}</div>
                ) : currentLocation ? (
                  <>
                    <div className="h-48 rounded-md overflow-hidden border">
                      <MapContainer
                        center={[currentLocation.lat, currentLocation.lng]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[currentLocation.lat, currentLocation.lng]}
                        >
                          <Popup>Your current location</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lat: {currentLocation.lat.toFixed(6)}, Lng:{" "}
                      {currentLocation.lng.toFixed(6)}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Location not available
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  className="w-full"
                >
                  Refresh Location
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact Selection */}
            <div className="space-y-2">
              <Label>Select Emergency Contact</Label>
              <Select
                onValueChange={(value) => {
                  const contact = userEmergencyContacts.find(
                    (c) => c.id === value
                  );
                  setSelectedContact(contact || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {userEmergencyContacts.length === 0 ? (
                    <SelectItem value="no-contacts" disabled>
                      No contacts saved
                    </SelectItem>
                  ) : (
                    userEmergencyContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name} ({contact.preferredMethod})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {userEmergencyContacts.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No emergency contacts saved. Add one below.
                </p>
              )}
            </div>

            {/* Emergency Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={callEmergencyServices}
                className="bg-red-600 hover:bg-red-700"
                disabled={!currentLocation}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button
                onClick={() => handleEmergencyAction("notify")}
                variant="outline"
                disabled={!selectedContact || !currentLocation}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Notify
              </Button>
              <Button
                onClick={() => handleEmergencyAction("share")}
                variant="outline"
                disabled={!selectedContact || !currentLocation}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Share Location
              </Button>
            </div>

            {/* Add New Contact */}
            <div className="pt-4 border-t">
              <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Emergency Contact</DialogTitle>
                    <DialogDescription>
                      Add a trusted contact for emergency notifications.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newContact.name}
                        onChange={(e) =>
                          setNewContact({ ...newContact, name: e.target.value })
                        }
                        placeholder="Contact name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={newContact.phone}
                        onChange={(e) =>
                          setNewContact({
                            ...newContact,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newContact.email}
                        onChange={(e) =>
                          setNewContact({
                            ...newContact,
                            email: e.target.value,
                          })
                        }
                        placeholder="Email address"
                      />
                    </div>

                    <div>
                      <Label>Preferred Method</Label>
                      <Select
                        value={newContact.preferredMethod}
                        onValueChange={(value: any) =>
                          setNewContact({
                            ...newContact,
                            preferredMethod: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingContact(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddContact}>Save Contact</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

interface LocationProps {
  currentLocation: { lat: number; lng: number } | null;
  isSharingLocation: boolean;
  locationError: string | null;
  onRefresh: () => void;
}

export default function Location({ 
  currentLocation, 
  isSharingLocation, 
  locationError, 
  onRefresh 
}: LocationProps) {
  return (
    <div className="space-y-3">
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
              <Marker position={[currentLocation.lat, currentLocation.lng]}>
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
      <button
        onClick={onRefresh}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-500"
      >
        Refresh Location
      </button>
    </div>
  );
}
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, X, Navigation } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  ScaleControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  calculateRouteDistance,
  nominatimReverse,
  nominatimSearch,
} from "@/utils/getLocation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTripDetails } from "@/redux/features/trip/trip.slice";

const shortenAddress = (address: string | null, maxLength = 50): string => {
  if (!address) return "Not selected";
  const parts = address
    .split(",")
    .slice(0, 4)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const shortAddress = parts.join(", ");
  if (shortAddress.length > maxLength) {
    return `${shortAddress.substring(0, maxLength)}...`;
  }
  return shortAddress;
};

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface RouteResult {
  distance: string;
  time: string;
  geometry?: GeoJSON.GeoJsonObject | null;
  price?: number;
}

interface FormValues {
  from: string;
  to: string;
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapUpdaterProps {
  fromLocation: Location | null;
  toLocation: Location | null;
  geometry: GeoJSON.GeoJsonObject | null;
}

const MapUpdater = ({
  fromLocation,
  toLocation,
  geometry,
}: MapUpdaterProps) => {
  const map = useMap();
  useEffect(() => {
    if (fromLocation && toLocation) {
      const bounds = L.latLngBounds(
        [fromLocation.lat, fromLocation.lon],
        [toLocation.lat, toLocation.lon]
      );
      map.fitBounds(bounds.pad(0.4));
    }
  }, [fromLocation, toLocation, map]);

  useEffect(() => {
    if (geometry) {
      const routeLayer = L.geoJSON(geometry, {
        style: { color: "#06b6d4", weight: 4, opacity: 0.8 },
      });
      routeLayer.addTo(map);
      return () => {
        map.removeLayer(routeLayer);
      };
    }
  }, [geometry, map]);
  return null;
};

interface DestinationCardProps {
  showMap?: boolean;
}

const DestinationCard = ({ showMap = false }: DestinationCardProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { from: "", to: "" },
  });

  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([]);
  const [results, setResults] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const tripDetails = useAppSelector((state) => state.trip);
  const fromInput = watch("from");
  const toInput = watch("to");
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (fromInput.trim()) {
        try {
          setFromSuggestions(await nominatimSearch(fromInput));
        } catch {
          setFromSuggestions([]);
        }
      } else {
        setFromSuggestions([]);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [fromInput]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (toInput.trim()) {
        try {
          setToSuggestions(await nominatimSearch(toInput));
        } catch {
          setToSuggestions([]);
        }
      } else {
        setToSuggestions([]);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [toInput]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(e.target as Node)
      ) {
        setFromSuggestions([]);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(e.target as Node)
      ) {
        setToSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUseMyLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );
      const { latitude: lat, longitude: lon } = position.coords;
      if (lat < 20.0 || lat > 27.0 || lon < 88.0 || lon > 93.0) {
        setError(
          "Your location is outside Bangladesh. Please enter a location in Bangladesh."
        );
        setLoading(false);
        return;
      }
      const data = await nominatimReverse(lat, lon);
      const location = { name: data.display_name || "My location", lat, lon };
      setFromLocation(location);
      setValue("from", location.name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Could not determine your location");
    } finally {
      setLoading(false);
    }
  }, [setValue]);

  const onSubmit = useCallback(async () => {
    if (!fromLocation || !toLocation) {
      setError("Please select valid locations for both pickup and destination");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await calculateRouteDistance(fromLocation, toLocation);
      setResults(result);

      // Fix: Improved time parsing with error handling
      const estimatedTime = result.time ? parseInt(result.time) : 0;
      const distance = parseFloat(result.distance) || 0;
      const price = Math.round(distance * 50);

      dispatch(
        setTripDetails({
          destinationLatitude: toLocation.lat,
          destinationLongitude: toLocation.lon,
          destinationLocation: shortenAddress(toLocation.name),
          pickupLocation: shortenAddress(fromLocation.name),
          distance,
          estimatedTime,
          price,
        })
      );
    } catch (err) {
      setError(`Error calculating distance: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [fromLocation, toLocation, dispatch]);

  const handleSelectLocation = useCallback(
    (location: Suggestion, type: "from" | "to") => {
      const loc = {
        name: location.display_name,
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
      };
      if (type === "from") {
        setFromLocation(loc);
        setValue("from", location.display_name);
        setFromSuggestions([]);
      } else {
        setToLocation(loc);
        setValue("to", location.display_name);
        setToSuggestions([]);
      }
    },
    [setValue]
  );

  const clearFromInput = () => {
    setValue("from", "");
    setFromLocation(null);
    setFromSuggestions([]);
  };

  const clearToInput = () => {
    setValue("to", "");
    setToLocation(null);
    setToSuggestions([]);
  };

  const clearError = () => setError(null);

  return (
    <div className="relative mx-auto w-full flex-1 ">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`grid grid-cols-1 ${
              showMap ? "lg:grid-cols-2" : ""
            } gap-6`}
          >
            <div className="space-y-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Pickup Location
                </Label>
                <div className="relative" ref={fromDropdownRef}>
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    {...register("from", {
                      required: "Pickup location is required",
                    })}
                    value={fromInput}
                    onChange={(e) => setValue("from", e.target.value)}
                    className="pl-10 bg-background text-foreground border-input"
                    placeholder="Enter pickup location"
                  />
                  {fromInput && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={clearFromInput}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  {fromSuggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                      {fromSuggestions.map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center"
                          onClick={() => handleSelectLocation(item, "from")}
                        >
                          <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                          <span className="truncate text-foreground">
                            {item.display_name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.from && (
                  <p className="text-sm text-destructive">
                    {errors.from.message}
                  </p>
                )}
              </div>
              {/* Destination */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Destination
                </Label>
                <div className="relative" ref={toDropdownRef}>
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    {...register("to", { required: "Destination is required" })}
                    value={toInput}
                    onChange={(e) => setValue("to", e.target.value)}
                    className="pl-10 bg-background text-foreground border-input"
                    placeholder="Where to?"
                  />
                  {toInput && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={clearToInput}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  {toSuggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                      {toSuggestions.map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center"
                          onClick={() => handleSelectLocation(item, "to")}
                        >
                          <Navigation className="w-4 h-4 text-muted-foreground mr-2" />
                          <span className="truncate text-foreground">
                            {shortenAddress(item.display_name)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.to && (
                  <p className="text-sm text-destructive">
                    {errors.to.message}
                  </p>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2"></div>
                      Locating...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Use My Location
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    "Find Route"
                  )}
                </Button>
              </div>
              {/* Error Display */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                  <div className="flex items-start">
                    <X className="w-5 h-5 text-destructive mr-2 mt-0.5" />
                    <div>
                      <p>{error}</p>
                      <button
                        onClick={clearError}
                        className="text-xs underline mt-1 hover:text-destructive/80"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Results Display */}
              {tripDetails.distance !== undefined &&
                tripDetails.distance !== null && (
                  <Card className="border border-border">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-foreground mb-3">
                        Trip Summary
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pickup:</span>
                          <span className="text-foreground">
                            {shortenAddress(tripDetails.pickupLocation)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Destination:
                          </span>
                          <span className="text-foreground">
                            {shortenAddress(tripDetails.destinationLocation)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Destination Coordinates:
                          </span>
                          <span className="text-foreground">
                            {tripDetails.destinationLatitude?.toFixed(4)},{" "}
                            {tripDetails.destinationLongitude?.toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Distance:
                          </span>
                          <span className="text-foreground">
                            {tripDetails.distance} km
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Estimated Time:
                          </span>
                          <span className="text-foreground">
                            {tripDetails.estimatedTime
                              ? `${tripDetails.estimatedTime} min`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="text-foreground font-semibold">
                            ৳{tripDetails.price || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
            {showMap && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">
                    Route Preview
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-xs bg-muted text-muted-foreground border-border"
                  >
                    Interactive Map
                  </Badge>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-border shadow-sm h-90 bg-muted">
                  <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={7}
                    style={{ height: "100%", width: "100%" }}
                    className={loading ? "loading" : ""}
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      maxZoom={19}
                    />
                    <ZoomControl position="bottomright" />
                    <ScaleControl position="bottomleft" />
                    {fromLocation && (
                      <Marker position={[fromLocation.lat, fromLocation.lon]}>
                        <Popup className="text-foreground">
                          Start: {shortenAddress(fromLocation.name)}
                        </Popup>
                      </Marker>
                    )}
                    {toLocation && (
                      <Marker position={[toLocation.lat, toLocation.lon]}>
                        <Popup className="text-foreground">
                          End: {shortenAddress(toLocation.name)}
                        </Popup>
                      </Marker>
                    )}
                    <MapUpdater
                      fromLocation={fromLocation}
                      toLocation={toLocation}
                      geometry={results?.geometry || null}
                    />
                  </MapContainer>
                  {fromLocation && toLocation && (
                    <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded shadow border border-border">
                      {shortenAddress(fromLocation.name)} →{" "}
                      {shortenAddress(toLocation.name)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationCard;

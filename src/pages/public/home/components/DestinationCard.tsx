/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, X, Navigation, Route } from "lucide-react";
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

// Define interfaces
interface Location {
  name: string;
  lat: number;
  lon: number;
}

// Updated RouteResult interface to match what's expected by the code
interface RouteResult {
  distance: string;
  time: string;
  geometry?: GeoJSON.GeoJsonObject | null; // Made geometry optional
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

// Fix leaflet icon issue without using any
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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

const DestinationCard = () => {
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

  // Use current location
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
        return;
      }
      const data = await nominatimReverse(lat, lon);
      const location = { name: data.display_name || "My location", lat, lon };
      setFromLocation(location);
      setValue("from", location.name);
    } catch (err) {
      setError("Could not determine your location");
    } finally {
      setLoading(false);
    }
  }, [setValue]);

  // Form submission
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
    } catch (err) {
      setError(`Error calculating distance: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [fromLocation, toLocation]);

  // Select location from suggestions
  const handleSelectLocation = useCallback(
    (
      location: Suggestion,
      type: "from" | "to"
    ) => {
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
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800/50 p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Route className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Plan Your Journey
              </h3>
            </div>
          </div>
          <div className="space-y-6 md:space-y-4">
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                Pickup Location
              </label>
              <div className="relative" ref={fromDropdownRef}>
                <div className="flex items-center space-x-3 p-3 bg-background border-gray-700/50 rounded-xl transition-all duration-200 hover:border-cyan-400/50 focus-within:ring-2 focus-within:ring-cyan-400/50">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <Input
                    {...register("from", {
                      required: "Pickup location is required",
                    })}
                    placeholder="Enter pickup location in Bangladesh"
                    className="border-0 bg-transparent text-white placeholder-gray-500 focus-visible:ring-0 p-0 text-sm"
                    aria-controls="from-suggestions"
                    aria-autocomplete="list"
                  />
                  {fromInput && (
                    <button
                      type="button"
                      onClick={clearFromInput}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear pickup location"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {fromSuggestions.length > 0 && (
                  <div
                    id="from-suggestions"
                    className="absolute z-20 w-full mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-auto animate-in fade-in-90 slide-in-from-top-5"
                    role="listbox"
                  >
                    {fromSuggestions.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-cyan-400/20 transition-colors flex items-center space-x-3"
                        onClick={() => handleSelectLocation(item, "from")}
                        role="option"
                        id={`from-suggestion-${index}`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.from && (
                <p className="text-sm text-red-400 animate-in fade-in-90">
                  {errors.from.message}
                </p>
              )}
            </div>
            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                Destination
              </label>
              <div className="relative" ref={toDropdownRef}>
                <div className="flex items-center space-x-3 p-3  border-gray-700/50 rounded-xl transition-all duration-200 hover:border-cyan-400/50 focus-within:ring-2 focus-within:ring-cyan-400/50">
                  <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <Input
                    {...register("to", { required: "Destination is required" })}
                    placeholder="Enter destination in Bangladesh"
                    className="border-0 bg-transparent text-white placeholder-gray-500 focus-visible:ring-0 p-0 text-sm"
                    aria-controls="to-suggestions"
                    aria-autocomplete="list"
                  />
                  {toInput && (
                    <button
                      type="button"
                      onClick={clearToInput}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear destination"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {toSuggestions.length > 0 && (
                  <div
                    id="to-suggestions"
                    className="absolute z-20 w-full mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-auto animate-in fade-in-90 slide-in-from-top-5"
                    role="listbox"
                  >
                    {toSuggestions.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-cyan-400/20 transition-colors flex items-center space-x-3"
                        onClick={() => handleSelectLocation(item, "to")}
                        role="option"
                        id={`to-suggestion-${index}`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.to && (
                <p className="text-sm text-red-400 animate-in fade-in-90">
                  {errors.to.message}
                </p>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                type="button"
                onClick={handleUseMyLocation}
                disabled={loading}
                variant="outline"
                className="flex-1 bg-gray-800/50 text-gray-200 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors rounded-full text-sm py-6"
                aria-label="Use current location"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200 border-t-transparent animate-spin mr-2"></div>
                    Locating...
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 mr-2" />
                    Use My Location
                  </>
                )}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold rounded-full text-sm py-6 transition-colors"
                aria-label="Calculate route"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  "Find Route"
                )}
              </Button>
            </div>
          </div>
          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-in fade-in-90 slide-in-from-top-5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p>{error}</p>
                  <button
                    onClick={clearError}
                    className="text-xs underline mt-1 hover:text-red-300 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Results and Map Display */}
          {results && (
            <div className="space-y-6 animate-in fade-in-90 slide-in-from-top-5">
              <div className="p-5 bg-background border-gray-700/50 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Route className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white text-lg">
                    Route Details
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400 mb-1">Distance</p>
                    <p className="font-semibold text-lg text-white">
                      {results.distance}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400 mb-1">Est. Time</p>
                    <p className="font-semibold text-lg text-white">
                      {results.time}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center text-sm text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  Route calculated successfully
                </div>
              </div>
              {/* Interactive Map */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-sm">
                    Route Preview
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-800/50 text-cyan-400 border-cyan-400/30"
                  >
                    Interactive Map
                  </Badge>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-lg h-80 md:h-96 bg-gray-800/20">
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
                        <Popup>Start: {fromLocation.name.split(",")[0]}</Popup>
                      </Marker>
                    )}
                    {toLocation && (
                      <Marker position={[toLocation.lat, toLocation.lon]}>
                        <Popup>End: {toLocation.name.split(",")[0]}</Popup>
                      </Marker>
                    )}
                    <MapUpdater
                      fromLocation={fromLocation}
                      toLocation={toLocation}
                      geometry={results.geometry || null} // Ensure we pass null if geometry is undefined
                    />
                  </MapContainer>
                  {fromLocation && toLocation && (
                    <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg shadow">
                      {fromLocation.name.split(",")[0]} →{" "}
                      {toLocation.name.split(",")[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
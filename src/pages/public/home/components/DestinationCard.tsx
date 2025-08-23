/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Types
interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface RouteResult {
  distance: string;
  time: string;
}

interface FormValues {
  from: string;
  to: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const calculateRouteDistance = async (
  from: Location,
  to: Location
): Promise<RouteResult> => {
  const coords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Routing failed with status ${res.status}`);

  const json = await res.json();
  if (!json.routes?.length)
    throw new Error("No route found between these locations");

  const route = json.routes[0];
  const km = (route.distance / 1000).toFixed(2);
  const mins = Math.round(route.duration / 60);

  console.log({ from: from.name, to: to.name, distance: `${km} km` });

  return { distance: `${km} km`, time: `${mins} min` };
};

// API functions
const nominatimSearch = async (q: string): Promise<any[]> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=BD&q=${encodeURIComponent(
    q
  )}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Nominatim search failed");
  return res.json();
};

const nominatimReverse = async (lat: number, lon: number): Promise<any> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Reverse failed");
  return res.json();
};

const DestinationCard = () => {
  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { from: "", to: "" },
  });

  // State
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [results, setResults] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Watch form values
  const fromInput = watch("from");
  const toInput = watch("to");

  // Refs
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Handle search with debouncing
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

  // Close dropdowns when clicking outside
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

      // Check if location is in
      if (lat < 20.0 || lat > 27.0 || lon < 88.0 || lon > 93.0) {
        setError("Your location is outside . Please enter a location in .");
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
      location: { display_name: string; lat: string; lon: string },
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

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="relative bg-background rounded-2xl shadow-2xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Book Your Ride</h3>
            <Badge variant="outline">Instant</Badge>
          </div>

          <div className="space-y-4">
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pickup Location</label>
              <div className="relative" ref={fromDropdownRef}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("from", {
                      required: "Pickup location is required",
                    })}
                    placeholder="Current Location"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
                {fromSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                    {fromSuggestions.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-muted"
                        onClick={() => handleSelectLocation(item, "from")}
                      >
                        {item.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.from && (
                <p className="text-sm text-red-500">{errors.from.message}</p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <div className="relative" ref={toDropdownRef}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("to", { required: "Destination is required" })}
                    placeholder="Where to?"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
                {toSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                    {toSuggestions.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-muted"
                        onClick={() => handleSelectLocation(item, "to")}
                      >
                        {item.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.to && (
                <p className="text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleUseMyLocation}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? "Locating..." : "Use Current Location"}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Calculating..." : "Find Ride"}
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="p-4 bg-muted/50 border border-border rounded-md">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-medium">{results.distance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Time</p>
                  <p className="font-medium">{results.time}</p>
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

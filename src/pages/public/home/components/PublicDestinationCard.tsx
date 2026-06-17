import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, X, Navigation, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import {
  calculateRouteDistance,
  nominatimReverse,
  nominatimSearch,
} from "@/utils/getLocation";
import { useAppDispatch } from "@/redux/hooks";
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

export default function PublicDestinationCard() {
  const navigate = useNavigate();
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
    } catch {
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
      const distance = parseFloat(result.distance) || 0;
      const price = Math.round(distance * 50);
      
      setResults({
        ...result,
        price,
      });

      const estimatedTime = result.time ? parseInt(result.time) : 0;

      dispatch(
        setTripDetails({
          destinationLatitude: toLocation.lat,
          destinationLongitude: toLocation.lon,
          destinationLocation: shortenAddress(toLocation.name),
          pickupLocation: shortenAddress(fromLocation.name),
          estimatedTime,
          estimatedDistance: distance,
          fare: price,
          totalFare: price,
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

  const handleBookRide = () => {
    navigate("/login");
  };

  return (
    <Card className="w-full bg-card border-2 border-foreground rounded-none shadow-[8px_8px_0px_0px_var(--foreground)] text-foreground">
      <CardHeader className="border-b-2 border-foreground bg-secondary/10">
        <CardTitle className="text-2xl font-black uppercase tracking-tight text-foreground">
          Trip Details
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Pickup Location */}
        <div className="space-y-2">
          <Label className="text-sm font-mono uppercase font-bold text-foreground">
            Pickup Location
          </Label>
          <div className="relative" ref={fromDropdownRef}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-4 h-4 z-10" />
            <Input
              {...register("from", {
                required: "Pickup location is required",
              })}
              value={fromInput}
              onChange={(e) => setValue("from", e.target.value)}
              className="pl-10 bg-background text-foreground border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_var(--foreground)] focus-visible:ring-0 focus-visible:border-primary font-mono text-sm"
              placeholder="Enter pickup location"
              autoComplete="off"
            />
            {fromInput && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                onClick={clearFromInput}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            {fromSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-popover border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] max-h-60 overflow-auto">
                {fromSuggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center font-mono border-b border-foreground last:border-0"
                    onClick={() => handleSelectLocation(item, "from")}
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
                    <span className="truncate text-foreground">
                      {item.display_name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.from && (
            <p className="text-xs font-mono uppercase text-destructive font-bold">
              {errors.from.message}
            </p>
          )}
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label className="text-sm font-mono uppercase font-bold text-foreground">
            Destination
          </Label>
          <div className="relative" ref={toDropdownRef}>
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-4 h-4 z-10" />
            <Input
              {...register("to", { required: "Destination is required" })}
              value={toInput}
              onChange={(e) => setValue("to", e.target.value)}
              className="pl-10 bg-background text-foreground border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_var(--foreground)] focus-visible:ring-0 focus-visible:border-primary font-mono text-sm"
              placeholder="Where to?"
              autoComplete="off"
            />
            {toInput && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                onClick={clearToInput}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            {toSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-popover border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] max-h-60 overflow-auto">
                {toSuggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center font-mono border-b border-foreground last:border-0"
                    onClick={() => handleSelectLocation(item, "to")}
                  >
                    <Navigation className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
                    <span className="truncate text-foreground">
                      {shortenAddress(item.display_name)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.to && (
            <p className="text-xs font-mono uppercase text-destructive font-bold">
              {errors.to.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loading}
            variant="outline"
            className="flex-1 border-2 border-foreground bg-background hover:bg-secondary text-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all h-12"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-none border-2 border-primary border-t-transparent animate-spin mr-2"></div>
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
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="flex-1 border-2 border-foreground bg-primary hover:bg-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all h-12"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-none border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></div>
                Calculating...
              </>
            ) : (
              "Find Route"
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 border-2 border-foreground bg-destructive/10 text-destructive text-sm font-mono">
            <div className="flex items-start">
              <X className="w-5 h-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">{error}</p>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-xs underline mt-2 hover:text-destructive/80 font-bold uppercase"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trip Summary and Book Ride Redirect */}
        {results && (
          <Card className="border-2 border-foreground rounded-none bg-secondary/5 mt-4">
            <CardContent className="p-4 space-y-4">
              <h5 className="font-black font-mono uppercase text-sm border-b-2 border-foreground pb-2">
                Trip Summary
              </h5>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground uppercase text-xs">Pickup:</span>
                  <span className="text-foreground font-bold">
                    {shortenAddress(fromLocation?.name || "")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground uppercase text-xs">Destination:</span>
                  <span className="text-foreground font-bold">
                    {shortenAddress(toLocation?.name || "")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground uppercase text-xs">Distance:</span>
                  <span className="text-foreground font-bold">
                    {results.distance} km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground uppercase text-xs">Est. Time:</span>
                  <span className="text-foreground font-bold">
                    {results.time ? `${results.time} min` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-foreground pt-2">
                  <span className="text-foreground font-bold uppercase text-xs">Price:</span>
                  <span className="text-foreground font-black text-lg">
                    ৳{results.price || 0}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleBookRide}
                className="w-full border-2 border-foreground bg-primary hover:bg-primary text-primary-foreground font-mono font-black uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all h-12 mt-2"
              >
                Book Ride
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

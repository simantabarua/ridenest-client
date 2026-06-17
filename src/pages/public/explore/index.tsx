import { useState } from "react";
import { Link } from "react-router";
import { useGetPublicDriversQuery } from "@/redux/features/driver/driver.api";
import { Search, Star, ChevronLeft, ChevronRight, User, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleType, setVehicleType] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("-rating");
  const [page, setPage] = useState(1);
  const limit = 8;

  // Prepare query parameters
  const queryParams: Record<string, string | number> = {
    page,
    limit,
    sort: sortBy,
  };

  if (searchTerm.trim()) {
    queryParams.searchTerm = searchTerm.trim();
  }
  if (vehicleType !== "all") {
    queryParams.type = vehicleType;
  }
  if (availability !== "all") {
    queryParams.isAvailable = availability === "available" ? "true" : "false";
  }

  const { data, isLoading, isError } = useGetPublicDriversQuery(queryParams);

  const drivers = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 8, total: 0, totalPages: 1 };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (type: string, value: string) => {
    if (type === "type") setVehicleType(value);
    if (type === "availability") setAvailability(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setVehicleType("all");
    setAvailability("all");
    setSortBy("-rating");
    setPage(1);
  };

  const avatarImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2.5&w=400&h=400&q=80",
  ];

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">Explore Driver Partners</h1>
          <p className="text-muted-foreground text-md">
            Search, filter, and view details of our verified driver partners and their vehicles available in your area.
          </p>
        </div>

        {/* Search, Filter, Sort Controls */}
        <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search driver or vehicle model..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 h-10 w-full"
              />
            </div>

            {/* Vehicle Type Filter */}
            <div>
              <Select value={vehicleType} onValueChange={(val) => handleFilterChange("type", val)}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicle Types</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="scooter">Scooter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability Filter */}
            <div>
              <Select value={availability} onValueChange={(val) => handleFilterChange("availability", val)}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available (Online)</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-rating">Highest Rating</SelectItem>
                  <SelectItem value="-completedRides">Most Completed Rides</SelectItem>
                  <SelectItem value="createdAt">Newest Joined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchTerm || vehicleType !== "all" || availability !== "all") && (
            <div className="flex justify-end mt-4">
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground hover:text-foreground">
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Drivers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-card border rounded-2xl overflow-hidden flex flex-col h-[380px] p-5 justify-between">
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16 bg-card border rounded-2xl">
            <XCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-bold mb-2">Error Loading Drivers</h3>
            <p className="text-muted-foreground mb-4">Something went wrong while fetching driver data.</p>
            <Button onClick={resetFilters}>Try Again</Button>
          </div>
        ) : drivers.length === 0 ? (
          <div className="text-center py-16 bg-card border rounded-2xl">
            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">No Drivers Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search query to find drivers.</p>
            <Button onClick={resetFilters}>Reset All Filters</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {drivers.map((driver: any, index: number) => {
                const driverPhoto = avatarImages[index % avatarImages.length];
                return (
                  <div
                    key={driver._id}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[425px]"
                  >
                    {/* Media / Card Header */}
                    <div className="relative h-36 bg-muted">
                      <img
                        src={driverPhoto}
                        alt={driver?.driver?.name || "Driver"}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant={driver.isAvailable ? "default" : "secondary"} className="gap-1.5 py-1 px-2.5">
                          {driver.isAvailable ? (
                            <>
                              <CheckCircle className="h-3 w-3 fill-primary-foreground text-primary" />
                              Available
                            </>
                          ) : (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                              Offline
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Rating and Title */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            {driver.vehicleInfo?.type}
                          </span>
                          <div className="flex items-center text-amber-500 text-xs font-medium bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-md">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
                            {driver.rating?.toFixed(1) || "New"}
                          </div>
                        </div>

                        <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-1">
                          {driver?.driver?.name || "Verified Driver"}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                          Verified partner driving a clean {driver.vehicleInfo?.model} with license registration {driver.vehicleInfo?.registrationNumber}.
                        </p>
                      </div>

                      {/* Meta information & Button */}
                      <div>
                        <div className="grid grid-cols-2 gap-2 text-xs border-t pt-3 mb-4 text-muted-foreground">
                          <div>
                            <span className="block text-muted-foreground/70 font-normal">Completed Rides</span>
                            <span className="font-semibold text-foreground text-sm">{driver.completedRides || 0}</span>
                          </div>
                          <div>
                            <span className="block text-muted-foreground/70 font-normal">Vehicle Model</span>
                            <span className="font-semibold text-foreground text-sm line-clamp-1">
                              {driver.vehicleInfo?.model}
                            </span>
                          </div>
                        </div>

                        <Link to={`/drivers/${driver._id}`} className="block w-full">
                          <Button className="w-full font-semibold rounded-xl" variant="outline">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-3 pt-6 border-t">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="rounded-xl h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page <span className="text-foreground font-semibold">{page}</span> of{" "}
                  <span className="text-foreground font-semibold">{meta.totalPages}</span>
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                  disabled={page === meta.totalPages}
                  className="rounded-xl h-10 w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router";
import { useGetPublicDriverByIdQuery, useGetPublicDriversQuery } from "@/redux/features/driver/driver.api";
import { Star, ShieldCheck, Mail, Phone, ArrowLeft, Car, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DriverDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: driverData, isLoading, isError } = useGetPublicDriverByIdQuery(id);
  const { data: relatedData } = useGetPublicDriversQuery({ limit: 4 });

  const driver = driverData?.data;
  const relatedDrivers = (relatedData?.data || []).filter((d: any) => d._id !== id);

  const vehiclePhotos = [
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
  ];

  const avatarImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&fit=crop&q=80",
  ];

  // Mock reviews for realism
  const reviews = [
    {
      id: 1,
      name: "Tariqul Islam",
      rating: 5,
      date: "2 days ago",
      comment: "Very polite behavior and exceptionally smooth driving. The vehicle was extremely clean.",
    },
    {
      id: 2,
      name: "Sadia Rahman",
      rating: 4.5,
      date: "1 week ago",
      comment: "Prompt pickup and knew the shortest routes to avoid Dhaka traffic. Highly recommended!",
    },
    {
      id: 3,
      name: "Imran Khan",
      rating: 5,
      date: "2 weeks ago",
      comment: "Extremely reliable driver. Helped me with my heavy bags and kept the AC at a perfect temperature.",
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-6 w-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !driver) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Driver Not Found</h2>
        <p className="text-muted-foreground">The driver partner you are looking for does not exist or has been removed.</p>
        <Link to="/explore">
          <Button>Back to Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link to="/explore" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explore
        </Link>

        {/* Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-card border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                <div className="md:col-span-3 h-80 rounded-xl overflow-hidden bg-muted relative">
                  <img src={avatarImages[Math.floor(Math.random() * 4)]} alt={driver.driver?.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <Badge variant="default" className="mb-2 uppercase tracking-wide px-3 py-1">
                        {driver.vehicleInfo?.type} Partner
                      </Badge>
                      <h1 className="text-3xl font-extrabold text-white mb-1">{driver.driver?.name}</h1>
                      <p className="text-white/80 text-sm flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" /> Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
                {vehiclePhotos.map((photo, index) => (
                  <div key={index} className="h-32 rounded-lg overflow-hidden bg-muted">
                    <img src={photo} alt={`Vehicle view ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold border-b pb-3">Partner Profile & Overview</h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Meet {driver.driver?.name}, a professional and highly experienced partner with RideNest since 2024. 
                  Operating primarily in Dhaka, they have built a reputation for punctuality, safe route navigation, 
                  and maintaining an immaculate vehicle environment.
                </p>
                <p>
                  Equipped with a fully verified driving license and registration docs, they operate a {driver.vehicleInfo?.model} 
                  specifically detailed to provide maximum passenger comfort. With {driver.completedRides || 0} completed rides and 
                  an outstanding {driver.rating?.toFixed(1)} rating, they remain one of our premium, top-tier service partners.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold border-b pb-3">Passenger Feedback & Reviews</h2>
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border-b last:border-0 pb-6 last:pb-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center font-bold text-sm text-foreground">
                          {rev.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{rev.name}</h4>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs font-semibold">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" /> {rev.rating}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Key Specs */}
          <div className="space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-lg">Vehicle Specifications</h3>
                <Badge variant={driver.isAvailable ? "default" : "secondary"}>
                  {driver.isAvailable ? "Available Now" : "Offline"}
                </Badge>
              </div>

              {/* Specs Details list */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Vehicle Model</span>
                  <span className="font-bold text-foreground">{driver.vehicleInfo?.model}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Vehicle Type</span>
                  <span className="font-bold text-foreground uppercase">{driver.vehicleInfo?.type}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Registration No.</span>
                  <span className="font-bold text-foreground">{driver.vehicleInfo?.registrationNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">License ID Number</span>
                  <span className="font-mono text-xs text-foreground bg-accent py-0.5 px-2 rounded-md">{driver.licenseNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Verification Badge</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 text-xs">
                    <ShieldCheck className="h-4 w-4" /> Fully Verified
                  </span>
                </div>
              </div>

              {/* Stats Card grids */}
              <div className="grid grid-cols-2 gap-3 border-t pt-4">
                <div className="bg-accent/40 rounded-xl p-3 text-center">
                  <span className="block text-[11px] text-muted-foreground/80 font-medium uppercase tracking-wider mb-1">RATING</span>
                  <span className="text-xl font-bold flex items-center justify-center text-amber-600 gap-1">
                    <Star className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
                    {driver.rating?.toFixed(1) || "New"}
                  </span>
                </div>
                <div className="bg-accent/40 rounded-xl p-3 text-center">
                  <span className="block text-[11px] text-muted-foreground/80 font-medium uppercase tracking-wider mb-1">TOTAL RIDES</span>
                  <span className="text-xl font-bold text-foreground">{driver.completedRides || 0}</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="space-y-3 pt-4 border-t">
                <Link to="/rider/request-ride">
                  <Button className="w-full h-11 font-semibold rounded-xl gap-2">
                    <Car className="h-4 w-4" /> Request Ride Now
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Verified Email</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> SMS Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Item List Section */}
        {relatedDrivers.length > 0 && (
          <div className="border-t pt-10 space-y-6">
            <h3 className="text-2xl font-bold">Recommended Drivers Near You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedDrivers.map((rel: any) => (
                <div key={rel._id} className="bg-card border rounded-2xl p-5 flex flex-col justify-between h-56">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary uppercase">{rel.vehicleInfo?.type}</span>
                      <span className="flex items-center text-amber-500 text-xs font-bold">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" /> {rel.rating?.toFixed(1) || "New"}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{rel.driver?.name}</h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Verified partner operating a {rel.vehicleInfo?.model} vehicle in Dhaka.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 mt-3">
                    <span className="text-xs text-muted-foreground font-semibold">
                      {rel.completedRides || 0} rides completed
                    </span>
                    <Link to={`/drivers/${rel._id}`}>
                      <Button variant="ghost" size="sm" className="font-semibold text-primary">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

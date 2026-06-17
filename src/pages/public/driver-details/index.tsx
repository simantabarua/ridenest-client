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
      <div className="container mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-6 w-24 rounded-none" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-80 w-full border-2 border-foreground rounded-none" />
            <Skeleton className="h-10 w-1/3 rounded-none" />
            <Skeleton className="h-24 w-full rounded-none" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96 w-full border-2 border-foreground rounded-none" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !driver) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <h2 className="text-3xl font-black uppercase">Driver Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">The driver partner you are looking for does not exist or has been removed.</p>
        <Link to="/explore">
          <Button className="border-2 border-foreground hover:bg-foreground hover:text-background font-extrabold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link to="/explore" className="inline-flex items-center text-xs font-mono font-bold uppercase text-muted-foreground hover:text-foreground mb-6 transition-colors border-b-2 border-transparent hover:border-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explore
        </Link>

        {/* Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-card border-2 border-foreground rounded-none overflow-hidden shadow-[4px_4px_0px_0px_var(--foreground)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                <div className="md:col-span-3 h-80 overflow-hidden bg-muted relative border-2 border-foreground">
                  <img src={avatarImages[Math.floor(Math.random() * 4)]} alt={driver.driver?.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div className="space-y-2">
                      <Badge variant="default" className="border-2 border-white bg-white text-black font-mono uppercase text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                        {driver.vehicleInfo?.type} Partner
                      </Badge>
                      <h1 className="text-3xl font-black uppercase text-white tracking-tight">{driver.driver?.name}</h1>
                      <p className="text-white/95 text-xs font-semibold flex items-center gap-1.5 uppercase font-mono">
                        <MapPin className="h-4 w-4 text-primary" /> Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
                {vehiclePhotos.map((photo, index) => (
                  <div key={index} className="h-32 overflow-hidden bg-muted border-2 border-foreground">
                    <img src={photo} alt={`Vehicle view ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-card border-2 border-foreground rounded-none p-6 md:p-8 space-y-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <h2 className="text-2xl font-black uppercase border-b-2 border-foreground pb-3">Partner Profile & Overview</h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 text-sm">
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
            <div className="bg-card border-2 border-foreground rounded-none p-6 md:p-8 space-y-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <h2 className="text-2xl font-black uppercase border-b-2 border-foreground pb-3">Passenger Feedback & Reviews</h2>
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border-b-2 border-foreground/10 last:border-0 pb-6 last:pb-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 border-2 border-foreground bg-primary/20 flex items-center justify-center font-black text-sm text-foreground uppercase">
                          {rev.name[0]}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm uppercase">{rev.name}</h4>
                          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-foreground text-xs font-bold bg-yellow-400 border-2 border-foreground px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_var(--foreground)]">
                        <Star className="h-3.5 w-3.5 fill-foreground text-foreground mr-1" /> {rev.rating}
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
            <div className="bg-card border-2 border-foreground rounded-none p-6 shadow-[4px_4px_0px_0px_var(--foreground)] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-foreground pb-4">
                <h3 className="font-black uppercase text-lg">Specifications</h3>
                <Badge variant={driver.isAvailable ? "default" : "secondary"} className="border-2 border-foreground font-mono uppercase text-[10px] rounded-none shadow-[2px_2px_0px_0px_currentColor]">
                  {driver.isAvailable ? "Available" : "Offline"}
                </Badge>
              </div>

              {/* Specs Details list */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
                  <span className="text-muted-foreground uppercase font-bold">Vehicle Model</span>
                  <span className="font-black text-foreground">{driver.vehicleInfo?.model}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
                  <span className="text-muted-foreground uppercase font-bold">Vehicle Type</span>
                  <span className="font-black text-foreground uppercase">{driver.vehicleInfo?.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
                  <span className="text-muted-foreground uppercase font-bold">Registration</span>
                  <span className="font-black text-foreground uppercase">{driver.vehicleInfo?.registrationNumber}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
                  <span className="text-muted-foreground uppercase font-bold">License ID</span>
                  <span className="font-mono text-xs font-bold text-foreground bg-secondary border border-foreground/30 py-0.5 px-2 rounded-none">{driver.licenseNumber}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-muted-foreground uppercase font-bold">Status</span>
                  <span className="font-black text-emerald-600 flex items-center gap-1 uppercase font-mono">
                    <ShieldCheck className="h-4 w-4" /> Fully Verified
                  </span>
                </div>
              </div>

              {/* Stats Card grids */}
              <div className="grid grid-cols-2 gap-3 border-t-2 border-foreground pt-4">
                <div className="bg-primary/5 border-2 border-foreground rounded-none p-3 text-center shadow-[2px_2px_0px_0px_var(--foreground)]">
                  <span className="block text-[9px] text-muted-foreground font-black uppercase font-mono mb-1.5">Rating</span>
                  <span className="text-lg font-black flex items-center justify-center text-foreground gap-1 bg-yellow-400 border-2 border-foreground py-0.5 px-1 shadow-[1.5px_1.5px_0px_0px_var(--foreground)]">
                    <Star className="h-4.5 w-4.5 fill-foreground text-foreground" />
                    {driver.rating?.toFixed(1) || "New"}
                  </span>
                </div>
                <div className="bg-primary/5 border-2 border-foreground rounded-none p-3 text-center shadow-[2px_2px_0px_0px_var(--foreground)] flex flex-col justify-between">
                  <span className="block text-[9px] text-muted-foreground font-black uppercase font-mono mb-1.5">Rides</span>
                  <span className="text-lg font-black text-foreground uppercase tracking-tight">{driver.completedRides || 0}</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="space-y-3 pt-4 border-t-2 border-foreground/10">
                <Link to="/rider/request-ride">
                  <Button className="w-full h-11 border-2 border-foreground hover:bg-foreground hover:text-background font-extrabold uppercase transition-colors rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none gap-2">
                    <Car className="h-4 w-4" /> Request Ride Now
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-4 text-[10px] font-mono font-bold uppercase text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Verified Email</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> SMS Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Item List Section */}
        {relatedDrivers.length > 0 && (
          <div className="border-t-2 border-foreground pt-10 space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tight">Recommended Drivers Near You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedDrivers.map((rel: any) => (
                <div key={rel._id} className="bg-card border-2 border-foreground rounded-none p-5 flex flex-col justify-between h-56 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-foreground uppercase tracking-wider bg-primary/20 border-2 border-foreground px-2 py-0.5 font-mono">{rel.vehicleInfo?.type}</span>
                      <span className="flex items-center text-foreground text-xs font-bold bg-yellow-400 border-2 border-foreground px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_var(--foreground)]">
                        <Star className="h-3.5 w-3.5 fill-foreground text-foreground mr-1" /> {rel.rating?.toFixed(1) || "New"}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-lg mb-1 uppercase tracking-tight line-clamp-1">{rel.driver?.name}</h4>
                    <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                      Verified partner operating a {rel.vehicleInfo?.model} vehicle in Dhaka.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-foreground/10 pt-3 mt-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">
                      {rel.completedRides || 0} rides done
                    </span>
                    <Link to={`/drivers/${rel._id}`}>
                      <Button variant="ghost" size="sm" className="border-2 border-foreground hover:bg-foreground hover:text-background font-extrabold uppercase transition-colors rounded-none shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none px-3 py-1 text-xs">
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

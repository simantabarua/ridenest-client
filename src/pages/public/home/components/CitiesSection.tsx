import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const cities = [
  {
    name: "Dhaka",
    division: "Dhaka",
    description: "Navigate the busy capital with our premium, reliable rides",
    activeRides: "25,000+",
  },
  {
    name: "Chittagong",
    division: "Chattogram",
    description: "Comfortable rides across the port city and commercial hub",
    activeRides: "12,000+",
  },
  {
    name: "Sylhet",
    division: "Sylhet",
    description: "Scenic and safe transport throughout the tea capital",
    activeRides: "8,000+",
  },
  {
    name: "Rajshahi",
    division: "Rajshahi",
    description: "Easy city travel in the green education hub",
    activeRides: "5,000+",
  },
  {
    name: "Khulna",
    division: "Khulna",
    description: "Convenient transit around the industrial and delta city",
    activeRides: "4,500+",
  },
  {
    name: "Barisal",
    division: "Barishal",
    description: "Scenic commutes across the land of rivers",
    activeRides: "3,000+",
  },
];

export default function CitiesSection() {
  return (
    <section className="py-20 bg-muted/10 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Available Cities
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            We're Growing Every Day
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ridenest is available in major divisions and cities across Bangladesh, with
            more locations coming soon.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 border-2 border-foreground flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold uppercase tracking-tight">
                      {city.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground uppercase">
                      {city.division} Division
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {city.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-foreground/10 pt-4 font-mono text-xs">
                <span className="text-muted-foreground uppercase">Active Drivers</span>
                <span className="bg-primary/20 text-foreground border border-foreground font-bold px-2 py-0.5">
                  {city.activeRides}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
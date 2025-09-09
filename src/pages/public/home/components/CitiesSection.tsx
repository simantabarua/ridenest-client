import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const cities = [
  {
    name: "New York",
    state: "NY",
    description: "The city that never sleeps, now with reliable rides",
    activeRides: "50,000+",
  },
  {
    name: "Los Angeles",
    state: "CA",
    description: "Navigate the sprawling city with ease",
    activeRides: "35,000+",
  },
  {
    name: "Chicago",
    state: "IL",
    description: "Windy City rides at your fingertips",
    activeRides: "25,000+",
  },
  {
    name: "Miami",
    state: "FL",
    description: "Sunshine and comfortable rides await",
    activeRides: "15,000+",
  },
  {
    name: "Seattle",
    state: "WA",
    description: "Rain or shine, we've got you covered",
    activeRides: "12,000+",
  },
  {
    name: "Austin",
    state: "TX",
    description: "Keep Austin weird with convenient transportation",
    activeRides: "10,000+",
  },
];

export default function CitiesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Available Cities</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            We're Growing Every Day
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ridenest is available in major cities across the United States, with
            more locations coming soon.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {city.name}, {city.state}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {city.activeRides} active rides
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{city.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Don't see your city? We're expanding rapidly!
          </p>
          <button className="text-primary font-semibold hover:underline">
            View all cities →
          </button>
        </div>
      </div>
    </section>
  );
}
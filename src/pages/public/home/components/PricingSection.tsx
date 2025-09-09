import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Clock, Car } from "lucide-react";

const rideOptions = [
  {
    name: "RideX",
    icon: Car,
    description: "Affordable everyday rides",
    basePrice: "$8.00",
    features: ["4 seats", "Standard comfort", "Eco-friendly"],
    popular: false,
  },
  {
    name: "Comfort",
    icon: Car,
    description: "Extra space and comfort",
    basePrice: "$12.00",
    features: ["4 seats", "Extra legroom", "Premium vehicles"],
    popular: true,
  },
  {
    name: "XL",
    icon: Car,
    description: "For groups and extra luggage",
    basePrice: "$18.00",
    features: ["6 seats", "Extra storage", "Spacious interior"],
    popular: false,
  },
  {
    name: "Premium",
    icon: Car,
    description: "Luxury vehicles and service",
    basePrice: "$25.00",
    features: ["4 seats", "Luxury cars", "Professional drivers"],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Transparent Pricing</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Choose Your Ride Style
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From budget-friendly to premium luxury, we have options for every
            occasion and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {rideOptions.map((option, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-xl p-6 hover:shadow-lg transition-all ${
                option.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{option.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold">{option.basePrice}</span>
                <span className="text-muted-foreground"> base fare</span>
              </div>
              <ul className="space-y-2 mb-4">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Select {option.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">How Pricing Works</h3>
              <p className="text-muted-foreground mb-6">
                Our pricing is transparent and fair. You'll always know the cost
                before you book, with no hidden fees or surprise charges.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Base Fare</h4>
                    <p className="text-sm text-muted-foreground">
                      The initial cost of your ride
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Time & Distance</h4>
                    <p className="text-sm text-muted-foreground">
                      Calculated based on actual trip duration and mileage
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">No Surge Pricing</h4>
                    <p className="text-sm text-muted-foreground">
                      We believe in fair pricing, even during peak hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold mb-4">Price Estimate Example</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Base Fare (RideX)</span>
                  <span className="text-sm font-medium">$8.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Distance (10 miles)</span>
                  <span className="text-sm font-medium">$12.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Time (20 minutes)</span>
                  <span className="text-sm font-medium">$5.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total Estimate</span>
                  <span className="font-bold text-primary">$25.50</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                *Actual prices may vary based on traffic, route, and other factors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
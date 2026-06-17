import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Clock, Car, Check } from "lucide-react";

const rideOptions = [
  {
    name: "RideX",
    icon: Car,
    description: "Affordable everyday rides",
    basePrice: "৳100",
    features: ["4 seats", "Standard comfort", "Eco-friendly"],
    popular: false,
  },
  {
    name: "Comfort",
    icon: Car,
    description: "Extra space and comfort",
    basePrice: "৳150",
    features: ["4 seats", "Extra legroom", "Premium vehicles"],
    popular: true,
  },
  {
    name: "XL",
    icon: Car,
    description: "For groups and extra luggage",
    basePrice: "৳220",
    features: ["6 seats", "Extra storage", "Spacious interior"],
    popular: false,
  },
  {
    name: "Premium",
    icon: Car,
    description: "Luxury vehicles and service",
    basePrice: "৳350",
    features: ["4 seats", "Luxury cars", "Professional drivers"],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Choose Your Ride Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From budget-friendly to premium luxury, we have options for every
            occasion and budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rideOptions.map((option, index) => (
            <div
              key={index}
              className={`gsap-pricing-card relative bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all flex flex-col justify-between ${
                option.popular ? "bg-yellow-50/50 dark:bg-yellow-950/20 ring-2 ring-foreground" : ""
              }`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-foreground border-2 border-foreground font-mono text-[10px] uppercase font-bold px-2 py-0.5 shadow-[2px_2px_0px_0px_var(--foreground)]">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-primary/20 border-2 border-foreground flex items-center justify-center mx-auto mb-3">
                    <option.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight">{option.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
                
                <div className="text-center mb-6 border-y-2 border-foreground/10 py-3">
                  <span className="text-3xl font-black">{option.basePrice}</span>
                  <span className="text-xs font-mono text-muted-foreground uppercase"> Base Fare</span>
                </div>
                
                <ul className="space-y-2.5 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-semibold">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full py-2.5 px-4 bg-primary text-foreground border-2 border-foreground font-extrabold uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_var(--foreground)] transition-all">
                Select {option.name}
              </button>
            </div>
          ))}
        </div>

        <div className="border-2 border-foreground p-8 lg:p-12 bg-muted/10 shadow-[6px_6px_0px_0px_var(--foreground)]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block bg-secondary text-foreground font-mono text-xs uppercase px-2.5 py-1 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]">
                Pricing Engine
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight">How Pricing Works</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our pricing is transparent and fair. You'll always know the cost
                before you book, with no hidden fees or surprise charges.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-primary/20 border-2 border-foreground flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-extrabold uppercase text-sm">Base Fare</h4>
                  <p className="text-xs text-muted-foreground">
                    The initial cost of your ride setup
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-primary/20 border-2 border-foreground flex items-center justify-center">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-extrabold uppercase text-sm">Time & Distance</h4>
                  <p className="text-xs text-muted-foreground">
                    Calculated on duration and distance
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-primary/20 border-2 border-foreground flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-extrabold uppercase text-sm">No Surge</h4>
                  <p className="text-xs text-muted-foreground">
                    Fair, predictable pricing at all hours
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <h4 className="font-black uppercase tracking-tight text-lg mb-4 border-b-2 border-foreground/10 pb-2">
                Price Estimate Example
              </h4>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Fare (RideX)</span>
                  <span className="font-bold">৳100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance (10 km)</span>
                  <span className="font-bold">৳150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time (20 minutes)</span>
                  <span className="font-bold">৳60.00</span>
                </div>
                <div className="border-t-2 border-foreground pt-3 flex justify-between text-base">
                  <span className="font-extrabold uppercase">Total Estimate</span>
                  <span className="font-black text-primary">৳310.00</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 font-mono">
                *Actual prices may vary based on live traffic, routing choice, and road toll factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

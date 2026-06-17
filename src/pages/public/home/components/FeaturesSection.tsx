import { Badge } from "@/components/ui/badge";
import { Car, Shield, DollarSign, Clock } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Quick Rides",
    description: "Get a ride in minutes with our fast and reliable service",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "All drivers are verified and vehicles are regularly inspected",
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden fees or surge charges",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Available round the clock for your convenience",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Features That Make a Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best ride-sharing experience with
            features designed for your comfort and safety.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Editorial statement block */}
          <div className="gsap-feature-statement bg-primary text-primary-foreground border-2 border-foreground p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--foreground)] rotate-[-1deg]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest bg-black text-white px-2.5 py-1 inline-block mb-6">
                Core Principles
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-6">
                Rethinking Urban Travel in Bangladesh
              </h3>
            </div>
            <p className="font-mono text-sm leading-relaxed text-primary-foreground/90">
              We don't do generic ride-sharing. We build localized, reliable transport routes designed specifically for the unique flow of Dhaka, Chittagong, and beyond.
            </p>
          </div>

          {/* Asymmetrical features sub-grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="gsap-feature-card bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-primary/10 border-2 border-foreground flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-extrabold uppercase mb-2 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="text-right font-mono text-3xl font-black text-foreground/15 select-none pt-4">
                  0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
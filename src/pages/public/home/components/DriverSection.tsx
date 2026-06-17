import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Clock,
  Users,
  Award,
  Car,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const driverBenefits = [
  {
    icon: DollarSign,
    title: "Earn Great Money",
    description: "Set your own schedule and earn competitive rates",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Drive whenever you want - full-time or part-time",
  },
  {
    icon: Users,
    title: "Support Community",
    description: "Join millions of drivers worldwide",
  },
  {
    icon: Award,
    title: "Rewards Program",
    description: "Earn bonuses and incentives for excellent service",
  },
];

const requirements = [
  "Valid driver's license",
  "At least 21 years old",
  "Clean driving record",
  "4-door vehicle in good condition",
  "Smartphone with data plan",
  "Pass background check",
];

export default function DriverSection() {
  return (
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Join Our Team
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Become a Ridenest Driver
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turn your car into a money-making machine. Join thousands of drivers
            who are earning on their own terms.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch mb-16">
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Why Drive With Ridenest?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {driverBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-card border-2 border-foreground p-4 shadow-[3px_3px_0px_0px_var(--foreground)] flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-primary/20 border-2 border-foreground flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-extrabold uppercase text-sm mb-1">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/35 border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <h4 className="font-extrabold uppercase text-sm mb-4 border-b border-foreground/10 pb-2">
                Driver Requirements
              </h4>
              <div className="grid md:grid-cols-2 gap-3 font-semibold text-sm">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-foreground border-2 border-foreground font-extrabold uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)] transition-all">
                  Start Earning Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border-2 border-foreground p-8 shadow-[6px_6px_0px_0px_var(--foreground)] h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="text-lg font-extrabold uppercase tracking-tight mb-2">
                    Driver Success Story
                  </h4>
                  <blockquote className="text-sm italic leading-relaxed text-foreground/80">
                    "I've been driving with Ridenest for 2 years in Dhaka and it's
                    changed my life. I make great money and have the flexibility
                    to be there for my family."
                  </blockquote>
                </div>

                <div className="bg-card border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_var(--foreground)]">
                  <div className="grid grid-cols-3 gap-2 text-center divide-x-2 divide-foreground/10 font-mono">
                    <div>
                      <p className="text-lg font-black text-foreground">৳15,000</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        Avg. Weekly
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground">25</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        Hours/Wk
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground">4.9★</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        Rating
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-extrabold uppercase text-xs tracking-wider border-b border-foreground/10 pb-2">
                    Popular Driver Benefits:
                  </h5>
                  <div className="space-y-2 font-mono text-xs font-semibold">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground uppercase">Weekly bonuses</span>
                      <span className="text-green-600 font-bold">YES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground uppercase">Fuel discounts</span>
                      <span className="text-green-600 font-bold">YES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground uppercase">Insurance options</span>
                      <span className="text-green-600 font-bold">YES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground uppercase">24/7 support</span>
                      <span className="text-green-600 font-bold">YES</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Join Our Team</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Become a Ridenest Driver
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your car into a money-making machine. Join thousands of drivers
            who are earning on their own terms.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Why Drive With Ridenest?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {driverBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <h4 className="font-semibold mb-4">Driver Requirements</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Earning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    Driver Success Story
                  </h4>
                  <p className="text-muted-foreground">
                    "I've been driving with Ridenest for 2 years and it's
                    changed my life. I make great money and have the flexibility
                    to be there for my family."
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">$1,200</p>
                      <p className="text-xs text-muted-foreground">
                        Avg. Weekly Earnings
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">25</p>
                      <p className="text-xs text-muted-foreground">
                        Hours/Week
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">4.9</p>
                      <p className="text-xs text-muted-foreground">
                        Driver Rating
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold">Popular Driver Benefits:</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly bonuses</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fuel discounts</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Insurance options</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>24/7 support</span>
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to take control of your income?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Apply Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

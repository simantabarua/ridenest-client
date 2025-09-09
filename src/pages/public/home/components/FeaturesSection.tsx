import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Why Choose Us</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Features That Make a Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best ride-sharing experience with
            features designed for your comfort and safety.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
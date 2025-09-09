import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Eye, Phone } from "lucide-react";

const safetyFeatures = [
  {
    icon: CheckCircle,
    title: "Driver Verification",
    description: "All drivers undergo comprehensive background checks and vehicle inspections",
  },
  {
    icon: Eye,
    title: "Real-Time Tracking",
    description: "Share your trip details with loved ones and track your ride in real-time",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Our safety team is available around the clock for any concerns",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Comprehensive insurance coverage for every ride",
  },
];

export default function SafetySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Safety First</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've implemented industry-leading safety features to ensure every
            ride is secure and comfortable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Emergency Assistance</h3>
              <p className="text-muted-foreground mb-6">
                In case of emergency, our in-app emergency button connects you
                directly to local authorities and our safety team. Your location
                and trip details are automatically shared for faster response.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>One-tap emergency calling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Automatic location sharing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>24/7 safety team monitoring</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold mb-4">Safety Tips</h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">Verify your driver</p>
                  <p className="text-xs text-muted-foreground">
                    Check the license plate and driver photo before entering
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">Share your trip</p>
                  <p className="text-xs text-muted-foreground">
                    Let friends or family track your journey in real-time
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">Sit in the back</p>
                  <p className="text-xs text-muted-foreground">
                    For your safety and comfort, sit in the back seat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
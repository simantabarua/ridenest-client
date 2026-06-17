import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Eye, Phone } from "lucide-react";

const safetyFeatures = [
  {
    icon: CheckCircle,
    title: "Driver Verification",
    description:
      "All drivers undergo comprehensive background checks and vehicle inspections",
  },
  {
    icon: Eye,
    title: "Real-Time Tracking",
    description:
      "Share your trip details with loved ones and track your ride in real-time",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description:
      "Our safety team is available around the clock for any concerns",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Comprehensive insurance coverage for every ride",
  },
];

export default function SafetySection() {
  return (
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Safety First
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Your Safety is Our Priority
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've implemented industry-leading safety features to ensure every
            ride is secure and comfortable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all flex flex-col items-center text-center justify-between"
            >
              <div className="w-16 h-16 bg-primary/20 border-2 border-foreground flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 border-foreground p-8 lg:p-12 bg-red-50 dark:bg-red-950/20 shadow-[6px_6px_0px_0px_var(--foreground)]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block bg-red-600 text-white font-mono text-xs uppercase px-2.5 py-1 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]">
                Emergency Protocol
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-foreground">
                Emergency Assistance & SOS
              </h3>
              <p className="text-foreground/85 leading-relaxed font-semibold">
                In case of emergency, our in-app emergency button connects you directly to local authorities (999 in Bangladesh) and our safety team. Your location and trip details are automatically shared for faster response.
              </p>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-bold">ONE-TAP EMERGENCY CALLING</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-bold">AUTOMATIC LIVE LOCATION SHARING</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-bold">24/7 SAFETY TEAM MONITORING</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-5 bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <h4 className="font-black uppercase tracking-tight text-lg mb-4 border-b-2 border-foreground/10 pb-2">
                Safety Tips for Riders
              </h4>
              <div className="space-y-4">
                <div className="p-3 bg-secondary/50 border border-foreground/20">
                  <p className="font-extrabold uppercase text-xs">Verify your driver</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check the license plate and driver photo before entering
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 border border-foreground/20">
                  <p className="font-extrabold uppercase text-xs">Share your trip</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Let friends or family track your journey in real-time
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 border border-foreground/20">
                  <p className="font-extrabold uppercase text-xs">Sit in the back</p>
                  <p className="text-xs text-muted-foreground mt-1">
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

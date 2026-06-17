import { Badge } from "@/components/ui/badge";

const howItWorks = [
  {
    step: "1",
    title: "Request a Ride",
    description: "Enter your pickup and destination locations",
  },
  {
    step: "2",
    title: "Get Matched",
    description: "We'll find you the nearest available driver",
  },
  {
    step: "3",
    title: "Track Your Ride",
    description: "Watch your driver approach in real-time",
  },
  {
    step: "4",
    title: "Enjoy Your Trip",
    description: "Arrive safely at your destination",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30 border-t-2 border-foreground relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Simple Process
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            How Ridenest Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting a ride has never been easier. Follow these simple steps to
            reach your destination.
          </p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="absolute top-[40px] left-[10%] right-[10%] h-0.5 border-t-4 border-dashed border-foreground/30 z-0 hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorks.map((step, index) => (
              <div 
                key={index} 
                className="bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-[-4px] transition-all relative group"
              >
                <div className="w-16 h-16 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center text-2xl font-black shadow-[3px_3px_0px_0px_var(--foreground)] mb-6 transition-transform group-hover:rotate-12 select-none">
                  {step.step}
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
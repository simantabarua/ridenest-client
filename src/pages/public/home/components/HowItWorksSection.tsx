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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Simple Process</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            How Ridenest Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting a ride has never been easier. Follow these simple steps to
            reach your destination.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
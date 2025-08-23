import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Shield,
  Star,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import RideBooking from "./components/DestinationCard";

export default function Home() {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daily Commuter",
      rating: 5,
      content:
        "Ridenest has made my daily commute so much easier. The drivers are professional and the app is incredibly user-friendly.",
      avatar: "/avatars/01.png",
    },
    {
      name: "Mike Chen",
      role: "Business Traveler",
      rating: 5,
      content:
        "I use Ridenest for all my business trips. Reliable, clean cars, and always on time. Highly recommended!",
      avatar: "/avatars/02.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      rating: 4,
      content:
        "As a student, I appreciate the affordable pricing and safety features. It's my go-to transportation app.",
      avatar: "/avatars/03.png",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                🚗 Your Trusted Ride-Sharing Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Ride with Confidence,
                <span className="text-primary"> Arrive with Style</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience safe, reliable, and affordable transportation at your
                fingertips. Whether you're commuting to work or heading out for
                the night, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">1M+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-semibold">4.8 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Safe & Secure</span>
                </div>
              </div>
            </div>
            <RideBooking />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
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

      {/* How It Works */}
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

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">What Our Users Say</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Trusted by Millions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say
              about their experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Experience the Future of Transportation?
            </h2>
            <p className="text-xl opacity-90">
              Join millions of satisfied users who trust Ridenest for their
              daily transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Sign Up as Rider
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                Become a Driver
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

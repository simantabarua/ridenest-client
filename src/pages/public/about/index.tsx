import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Car,
  Shield,
  Globe,
  Award,
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Happy Users", value: "1M+", icon: Users },
    { label: "Cities Covered", value: "100+", icon: Globe },
    { label: "Active Drivers", value: "50K+", icon: Car },
    { label: "Safety Rating", value: "4.8/5", icon: Shield },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and safety above everything else.",
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description:
        "Every ride is verified and monitored to ensure maximum safety.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly innovate to provide the best transportation experience.",
    },
    {
      icon: Target,
      title: "Reliability",
      description:
        "Count on us for punctual and dependable service every time.",
    },
  ];

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in transportation technology.",
      avatar: "/avatars/01.png",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "Tech enthusiast driving innovation in ride-sharing platforms.",
      avatar: "/avatars/02.png",
    },
    {
      name: "Mike Chen",
      role: "COO",
      bio: "Operations expert ensuring smooth service delivery.",
      avatar: "/avatars/03.png",
    },
    {
      name: "Emily Davis",
      role: "Head of Safety",
      bio: "Dedicated to implementing the highest safety standards.",
      avatar: "/avatars/04.png",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <Badge variant="secondary">About Ridenest</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Revolutionizing Transportation,
              <span className="text-primary"> One Ride at a Time</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded in 2020, Ridenest has grown from a simple idea to a
              trusted transportation platform serving millions of users across
              the country. Our mission is to make transportation safe,
              affordable, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-medium">
                    {stat.label}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary">Our Mission</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Making Transportation Better for Everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Ridenest, we believe that everyone deserves access to safe,
                reliable, and affordable transportation. Our platform connects
                riders with professional drivers, creating a community built on
                trust and convenience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're committed to reducing traffic congestion, lowering carbon
                emissions, and providing economic opportunities for drivers
                while offering exceptional service to our riders.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-primary" />
                <span className="font-semibold">
                  Award-winning service since 2020
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-background rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Our Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span>Carbon Emissions Reduced</span>
                      <Badge variant="secondary">25%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span>Driver Income Generated</span>
                      <Badge variant="secondary">$50M+</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span>Customer Satisfaction</span>
                      <Badge variant="secondary">98%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">Our Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              The Principles That Guide Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values shape our decisions and define who we are as a
              company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">Leadership Team</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Meet the People Behind Ridenest
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of experts is dedicated to revolutionizing
              transportation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {member.bio}
                  </CardDescription>
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
              Join Us in Shaping the Future of Transportation
            </h2>
            <p className="text-xl opacity-90">
              Whether you're looking to ride, drive, or partner with us, we'd
              love to have you as part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Start Riding
                <ArrowRight className="ml-2 w-5 h-5" />
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

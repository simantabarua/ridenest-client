import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-2 border-foreground py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
              About Ridenest
            </span>
            <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-foreground">
              Revolutionizing Transportation,
              <span className="text-primary"> One Ride at a Time</span>
            </h1>
            <p className="text-base text-muted-foreground font-mono mx-auto">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] py-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
                <CardHeader>
                  <div className="w-16 h-16 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-black text-primary">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm font-mono uppercase font-bold">
                    {stat.label}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 border-y-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
                Our Mission
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                Making Transportation Better for Everyone
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                At Ridenest, we believe that everyone deserves access to safe,
                reliable, and affordable transportation. Our platform connects
                riders with professional drivers, creating a community built on
                trust and convenience.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We're committed to reducing traffic congestion, lowering carbon
                emissions, and providing economic opportunities for drivers
                while offering exceptional service to our riders.
              </p>
              <div className="flex items-center space-x-4 border-2 border-foreground p-4 bg-secondary/50 shadow-[2px_2px_0px_0px_var(--foreground)]">
                <Award className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="font-mono font-bold uppercase text-sm">
                  Award-winning service since 2020
                </span>
              </div>
            </div>
            <div>
              <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
                <CardHeader className="border-b-2 border-foreground">
                  <CardTitle className="text-xl font-black uppercase">Our Impact</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 border-2 border-foreground bg-secondary/30">
                    <span className="font-mono text-sm">Carbon Emissions Reduced</span>
                    <span className="border-2 border-foreground bg-primary text-primary-foreground px-3 py-0.5 text-xs font-mono font-bold uppercase">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-2 border-foreground bg-secondary/30">
                    <span className="font-mono text-sm">Driver Income Generated</span>
                    <span className="border-2 border-foreground bg-primary text-primary-foreground px-3 py-0.5 text-xs font-mono font-bold uppercase">$50M+</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-2 border-foreground bg-secondary/30">
                    <span className="font-mono text-sm">Customer Satisfaction</span>
                    <span className="border-2 border-foreground bg-primary text-primary-foreground px-3 py-0.5 text-xs font-mono font-bold uppercase">98%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
              Our Values
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
              The Principles That Guide Us
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-mono">
              Our core values shape our decisions and define who we are as a
              company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] py-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
                <CardHeader>
                  <div className="w-16 h-16 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-y-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
              Leadership Team
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
              Meet the People Behind Ridenest
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-mono">
              Our diverse team of experts is dedicated to revolutionizing
              transportation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] py-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
                <CardHeader>
                  <div className="w-20 h-20 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase">{member.name}</CardTitle>
                  <CardDescription className="font-mono font-bold text-primary uppercase text-xs">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto space-y-6 max-w-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Join Us in Shaping the Future of Transportation
            </h2>
            <p className="text-base opacity-80 font-mono">
              Whether you're looking to ride, drive, or partner with us, we'd
              love to have you as part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="border-2 border-background bg-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all px-8 py-6 text-base"
              >
                Start Riding
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-background bg-transparent text-background hover:bg-background hover:text-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all px-8 py-6 text-base"
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

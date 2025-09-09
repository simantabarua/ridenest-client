import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router";

export default function HeroSection() {
  return (
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                 Your Trusted Ride-Sharing Platform
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
              <Link to="/login">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
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
            <DestinationCard />
          </div>
        </div>
      </section>
  )
}

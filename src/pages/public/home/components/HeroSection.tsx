import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router";
import heroVideo from "../../../../assets/video/banner.mp4";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-slate-950">
      {/* Ticker tape banner */}
      <div className="absolute top-0 left-0 right-0 bg-primary py-2.5 overflow-hidden border-b-2 border-foreground z-30 select-none">
        <div className="flex whitespace-nowrap animate-marquee font-mono font-black text-xs uppercase tracking-widest text-primary-foreground">
          {Array(5).fill("DHAKA • CHITTAGONG • SYLHET • RAJSHAHI • KHULNA • BARISAL • RIDE IN STYLE • SAFE & SECURE • 24/7 SUPPORT • ").join("")}
        </div>
      </div>

      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white">
            <Badge variant="secondary" className="w-fit bg-secondary text-secondary-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] px-3 py-1 font-mono uppercase text-xs rotate-[-1.5deg]">
              Your Trusted Ride-Sharing Platform
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-black leading-none uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Ride with <span className="bg-primary text-primary-foreground px-2 py-0.5 inline-block border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[1.5deg]">Confidence</span>
              <br />
              Arrive in <span className="text-primary underline decoration-primary decoration-4 underline-offset-8">Style</span>
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
              Experience safe, reliable, and affordable transportation at your
              fingertips. Whether you're commuting to work or heading out for
              the night, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/login" className="w-fit">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary text-primary-foreground font-black border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-bold">1M+ Users</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 text-primary" />
                <span className="font-bold">4.8 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="font-bold">Safe & Secure</span>
              </div>
            </div>
          </div>

          <div className="relative z-20">
            <DestinationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

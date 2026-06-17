import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import PublicDestinationCard from "./PublicDestinationCard";
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

      {/* Decorative SVGs for Brutalist aesthetic */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {/* Animated route drawing line */}
        <svg className="absolute w-full h-full opacity-35" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="gsap-svg-route-line"
            d="M -100 150 C 300 120, 400 600, 800 450 C 1200 300, 1100 750, 1600 700"
            stroke="url(#route-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="20,15"
          />
          <defs>
            <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="#ff4500" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Brutalist Stars & Crosses */}
        <svg
          className="gsap-svg-floating-star absolute top-28 right-[12%] w-16 h-16 text-primary stroke-2 stroke-foreground fill-primary"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>

        <svg
          className="gsap-svg-floating-star-secondary absolute bottom-40 left-[10%] w-12 h-12 text-secondary stroke-2 stroke-foreground fill-secondary"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>

        <svg
          className="gsap-svg-spinning-wheel absolute top-[40%] left-[48%] w-20 h-20 text-white/10 fill-none stroke-current"
          strokeWidth="1.5"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="10,6" />
          <circle cx="50" cy="50" r="25" strokeDasharray="5,5" />
          <path d="M50 10 L50 90 M10 50 L90 50" />
        </svg>
      </div>
      <div className="relative z-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white">
            <Badge variant="secondary" className="gsap-hero-badge w-fit bg-secondary text-secondary-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] px-3 py-1 font-mono uppercase text-xs rotate-[-1.5deg]">
              Your Trusted Ride-Sharing Platform
            </Badge>

            <h1 className="gsap-hero-title text-4xl lg:text-6xl font-black leading-none uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex flex-wrap gap-x-3 gap-y-1">
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block">Ride</span></span>
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block">with</span></span>
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block bg-primary text-primary-foreground px-2 py-0.5 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[1.5deg]">Confidence</span></span>
              <span className="w-full h-0"></span>
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block">Arrive</span></span>
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block">in</span></span>
              <span className="inline-block overflow-hidden"><span className="gsap-word inline-block text-primary underline decoration-primary decoration-4 underline-offset-8">Style</span></span>
            </h1>

            <p className="gsap-hero-desc text-lg text-gray-200 leading-relaxed max-w-xl">
              Experience safe, reliable, and affordable transportation at your
              fingertips. Whether you're commuting to work or heading out for
              the night, we've got you covered.
            </p>

            <div className="gsap-hero-cta flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/login" className="w-fit gsap-magnetic block">
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
              <div className="gsap-hero-stats flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-bold">1M+ Users</span>
              </div>
              <div className="gsap-hero-stats flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 text-primary" />
                <span className="font-bold">4.8 Rating</span>
              </div>
              <div className="gsap-hero-stats flex items-center space-x-2 bg-black/80 text-white border-2 border-white/20 px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="font-bold">Safe & Secure</span>
              </div>
            </div>
          </div>

          <div className="gsap-hero-card relative z-20">
            <PublicDestinationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

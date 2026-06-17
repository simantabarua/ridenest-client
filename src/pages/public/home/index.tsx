import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CitiesSection from "./components/CitiesSection";
import ContactSection from "./components/ContactSection";
import DriverSection from "./components/DriverSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PricingSection from "./components/PricingSection";
import SafetySection from "./components/SafetySection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    heroTl.fromTo(
      ".gsap-hero-badge",
      { y: 30, opacity: 0, rotation: -5 },
      { y: 0, opacity: 1, rotation: -1.5, delay: 0.2 }
    );

    heroTl.fromTo(
      ".gsap-hero-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    );

    heroTl.fromTo(
      ".gsap-hero-desc",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.5"
    );

    heroTl.fromTo(
      ".gsap-hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.5"
    );

    heroTl.fromTo(
      ".gsap-hero-stats",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1 },
      "-=0.4"
    );

    heroTl.fromTo(
      ".gsap-hero-card",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1 },
      "-=0.6"
    );

    // 2. Features Section Scroll Animation
    gsap.fromTo(
      ".gsap-feature-statement",
      { y: 50, opacity: 0, rotation: -3 },
      {
        y: 0,
        opacity: 1,
        rotation: -1,
        scrollTrigger: {
          trigger: ".gsap-feature-statement",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".gsap-feature-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".gsap-feature-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // 3. How It Works Section Scroll Animation
    gsap.fromTo(
      ".gsap-step-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".gsap-step-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // 4. Cities Section Scroll Animation
    gsap.fromTo(
      ".gsap-city-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".gsap-city-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // 5. Pricing Section Scroll Animation
    gsap.fromTo(
      ".gsap-pricing-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".gsap-pricing-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power3.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CitiesSection />
      <SafetySection />
      <PricingSection />
      <DriverSection />
      <ContactSection />
    </>
  );
}

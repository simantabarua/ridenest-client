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

    // --- 1. Hero Section Entrance Animation ---
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.0 } });

    // Premium SplitText Slide Up for Heading
    heroTl.fromTo(
      ".gsap-hero-badge",
      { y: 30, opacity: 0, rotation: -6 },
      { y: 0, opacity: 1, rotation: -1.5, delay: 0.1 }
    );

    heroTl.fromTo(
      ".gsap-word",
      { y: "110%" },
      { y: "0%", stagger: 0.08, duration: 1.2, ease: "power4.out" },
      "-=0.7"
    );

    heroTl.fromTo(
      ".gsap-hero-desc",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.8"
    );

    heroTl.fromTo(
      ".gsap-hero-cta",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.8"
    );

    heroTl.fromTo(
      ".gsap-hero-stats",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
      "-=0.7"
    );

    heroTl.fromTo(
      ".gsap-hero-card",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=1.0"
    );

    // --- 1.5. Decorative SVGs animations ---
    gsap.to(".gsap-svg-route-line", {
      strokeDashoffset: -1000,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".gsap-svg-floating-star", {
      y: "+=20",
      rotation: "+=120",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".gsap-svg-floating-star-secondary", {
      y: "-=25",
      rotation: "-=95",
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".gsap-svg-spinning-wheel", {
      rotation: 360,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    // --- 2. Scroll Trigger Reveals ---
    
    // Features reveals
    gsap.fromTo(
      ".gsap-feature-statement",
      { y: 60, opacity: 0, rotate: -3 },
      {
        y: 0,
        opacity: 1,
        rotate: -1,
        scrollTrigger: {
          trigger: ".gsap-feature-statement",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1.0,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      ".gsap-feature-card",
      { y: 70, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".gsap-feature-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1.0,
        ease: "power4.out",
      }
    );

    // How it works reveals
    gsap.fromTo(
      ".gsap-step-card",
      { y: 70, opacity: 0, rotate: 2 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".gsap-step-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1.0,
        ease: "power4.out",
      }
    );

    // Cities reveals
    gsap.fromTo(
      ".gsap-city-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".gsap-city-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1.0,
        ease: "power3.out",
      }
    );

    // Pricing reveals
    gsap.fromTo(
      ".gsap-pricing-card",
      { y: 70, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".gsap-pricing-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 1.0,
        ease: "power4.out",
      }
    );

    // --- 3. Dynamic Magnetic Element delegation ---
    let activeMagnetic: HTMLElement | null = null;
    const handleDocumentMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".gsap-magnetic") as HTMLElement;
      
      if (target) {
        if (activeMagnetic && activeMagnetic !== target) {
          gsap.to(activeMagnetic, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        }
        activeMagnetic = target;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(target, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (activeMagnetic) {
        gsap.to(activeMagnetic, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        activeMagnetic = null;
      }
    };
    document.addEventListener("mousemove", handleDocumentMouseMove);

    // --- 4. Custom Follow Cursor Spell ---
    const cursor = document.createElement("div");
    cursor.className = "hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power1.out",
      });
    };
    document.addEventListener("mousemove", moveCursor);

    // Snap and expand custom cursor on interactive hover
    const handleCursorHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, input, select, .gsap-magnetic");
      if (target) {
        gsap.to(cursor, { scale: 1.6, backgroundColor: "rgba(255, 190, 0, 0.3)", duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.2 });
      }
    };
    document.addEventListener("mouseover", handleCursorHover);

    // Cleanup all triggers, elements, and listeners
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleCursorHover);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
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

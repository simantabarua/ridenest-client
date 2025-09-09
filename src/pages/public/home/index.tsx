import AppSection from "./components/AppSection";
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
      <AppSection />
      <ContactSection />
    </>
  );
}

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  MessageCircle,
  User,
  Car,
  Shield,
  CreditCard,
  MapPin,
  Clock,
  Star,
  HelpCircle,
  Settings,
  DollarSign,
  Phone,
} from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "rider", label: "For Riders", icon: User },
    { id: "driver", label: "For Drivers", icon: Car },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "technical", label: "Technical", icon: Settings },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I create a Ridenest account?",
      answer:
        'Creating an account is easy! Download our app, click "Sign Up", and follow the prompts. You\'ll need to provide your name, email address, phone number, and create a password.',
      category: "rider",
      icon: User,
    },
    {
      id: 2,
      question: "How do I request a ride?",
      answer:
        "Open the app, enter your pickup location and destination, select your ride type, and confirm your booking. You'll see the estimated fare and pickup time before confirming.",
      category: "rider",
      icon: MapPin,
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash in select cities. You can add multiple payment methods in the app.",
      category: "payment",
      icon: CreditCard,
    },
    {
      id: 4,
      question: "How are fares calculated?",
      answer:
        "Fares are calculated based on base fare, distance, time, and demand. You'll always see the estimated fare before booking. Surge pricing may apply during high-demand periods.",
      category: "payment",
      icon: DollarSign,
    },
    {
      id: 5,
      question: "How do I become a Ridenest driver?",
      answer:
        "To become a driver, you must be at least 21 years old, have a valid driver's license, a 4-door vehicle, and pass a background check. Apply through our website or driver app.",
      category: "driver",
      icon: Car,
    },
    {
      id: 6,
      question: "What are the requirements to become a driver?",
      answer:
        "Requirements include: minimum age 21, valid driver's license, clean driving record, eligible 4-door vehicle, vehicle insurance, and passing a background check.",
      category: "driver",
      icon: Shield,
    },
    {
      id: 7,
      question: "How much can I earn as a driver?",
      answer:
        "Earnings vary based on location, hours worked, and demand. Drivers typically earn between $15-25 per hour before expenses. You can see your earnings in real-time in the driver app.",
      category: "driver",
      icon: DollarSign,
    },
    {
      id: 8,
      question: "How does Ridenest ensure safety?",
      answer:
        "We implement multiple safety measures: driver background checks, vehicle inspections, real-time ride tracking, emergency button, ride sharing features, and 24/7 support.",
      category: "safety",
      icon: Shield,
    },
    {
      id: 9,
      question: "What should I do if I feel unsafe during a ride?",
      answer:
        "Use the emergency button in the app, share your trip status with emergency contacts, call 911 if immediate danger, and report the incident to our support team afterward.",
      category: "safety",
      icon: Shield,
    },
    {
      id: 10,
      question: "How do I report a problem with my ride?",
      answer:
        'Go to "Ride History" in the app, select the ride, and tap "Help" or "Report Issue". You can also contact support through the app or website.',
      category: "rider",
      icon: MessageCircle,
    },
    {
      id: 11,
      question: "Can I schedule a ride in advance?",
      answer:
        'Yes! You can schedule rides up to 30 days in advance. Select "Schedule" in the app, enter your pickup time, and we\'ll find a driver for you.',
      category: "rider",
      icon: Clock,
    },
    {
      id: 12,
      question: "How do I change my account information?",
      answer:
        'Go to "Profile" in the app settings, then tap "Edit Profile". You can update your name, email, phone number, and other personal information.',
      category: "technical",
      icon: Settings,
    },
    {
      id: 13,
      question: "What if I left something in the car?",
      answer:
        "Contact the driver through the app or contact support with your ride details. We'll help you coordinate with the driver to retrieve your lost item.",
      category: "rider",
      icon: HelpCircle,
    },
    {
      id: 14,
      question: "How do I rate my driver?",
      answer:
        "After each ride, you'll receive a notification to rate your driver. You can rate from 1-5 stars and add optional comments about your experience.",
      category: "rider",
      icon: Star,
    },
    {
      id: 15,
      question: "Can I cancel a ride?",
      answer:
        "Yes, you can cancel a ride, but cancellation fees may apply if you cancel after a driver has accepted and is en route to your pickup location.",
      category: "rider",
      icon: MapPin,
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularQuestions = faqs.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background border-b-2 border-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div>
              <span className="inline-block border-2 border-foreground bg-secondary text-secondary-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Help Center
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Frequently Asked
              <span className="text-primary block sm:inline"> Questions</span>
            </h1>
            <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about RideNest. Can't find what
              you're looking for? Our support team is here to help 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-background text-foreground border-2 border-foreground rounded-none focus-visible:ring-0 focus:bg-secondary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 border-b-2 border-foreground bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 border-2 border-foreground font-mono font-bold uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:translate-x-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-secondary"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      {searchQuery === "" && activeCategory === "all" && (
        <section className="py-16 bg-background border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <div>
                <span className="inline-block border-2 border-foreground bg-secondary text-secondary-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Popular Questions
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">Most Frequently Asked</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQuestions.map((faq) => (
                <Card
                  key={faq.id}
                  className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none cursor-pointer hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all py-4"
                >
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <faq.icon className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <CardTitle className="text-lg leading-tight font-black uppercase tracking-tight text-foreground">
                        {faq.question}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <CardDescription className="line-clamp-3 font-mono text-xs text-muted-foreground uppercase leading-relaxed">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Accordion */}
      <section className="py-20 border-b-2 border-foreground bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "Question" : "Questions"} Found
              </h2>
              <p className="text-md font-mono text-muted-foreground">
                {searchQuery && `Showing results for "${searchQuery}"`}
                {activeCategory !== "all" &&
                  ` in ${
                    categories.find((c) => c.id === activeCategory)?.label
                  }`}
              </p>
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${faq.id}`}
                    className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none px-6 py-2"
                  >
                    <AccordionTrigger className="hover:no-underline font-black text-lg uppercase tracking-tight text-foreground">
                      <div className="flex items-start space-x-3 text-left">
                        <div className="w-8 h-8 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0 rounded-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          <faq.icon className="w-4 h-4 text-secondary-foreground" />
                        </div>
                        <span>
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="ml-11 border-t border-foreground/10 pt-4 mt-2">
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed uppercase">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-foreground/30 rounded-none bg-muted/50 p-6">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
                  No questions found
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  Try adjusting your search or browse a different category.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="border-2 border-foreground bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:translate-x-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-lg font-mono uppercase opacity-90">
              Our support team is available 24/7 to help you with any questions
              or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="border-2 border-foreground bg-secondary hover:bg-secondary/80 text-secondary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-6 text-md"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button
                size="lg"
                className="border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] py-6 text-md"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

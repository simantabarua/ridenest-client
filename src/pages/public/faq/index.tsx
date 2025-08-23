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
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <Badge variant="secondary">Help Center</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Frequently Asked
              <span className="text-primary"> Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about Ridenest. Can't find what
              you're looking for? Our support team is here to help 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
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
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-8">
              <Badge variant="secondary">Popular Questions</Badge>
              <h2 className="text-3xl font-bold">Most Frequently Asked</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQuestions.map((faq) => (
                <Card
                  key={faq.id}
                  className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <faq.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {faq.question}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">
                {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "Question" : "Questions"} Found
              </h2>
              <p className="text-lg text-muted-foreground">
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
                    className="border-0 shadow-lg rounded-lg px-6"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start space-x-3 text-left">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <faq.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-lg font-medium">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="ml-11">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No questions found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or browse a different category.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
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
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Still Have Questions?
            </h2>
            <p className="text-xl opacity-90">
              Our support team is available 24/7 to help you with any questions
              or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
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

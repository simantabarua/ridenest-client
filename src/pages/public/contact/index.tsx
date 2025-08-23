"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Building,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@Ridenest.com",
      description: "Get help within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "1-800-Ridenest",
      description: "Available 24/7 for urgent matters",
    },
    {
      icon: MapPin,
      title: "Head Office",
      value: "123 Main St, City, State 12345",
      description: "Visit us during business hours",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM EST",
      description: "24/7 emergency support available",
    },
  ];

  const faqs = [
    {
      question: "How do I report an issue with my ride?",
      answer:
        "You can report issues through the app or contact our support team directly.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital wallets.",
    },
    {
      question: "How can I become a driver?",
      answer:
        "Visit our driver signup page and complete the registration process.",
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption to protect your data.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <Badge variant="secondary">Contact Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Get in Touch with
              <span className="text-primary"> Ridenest</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're here to help! Whether you have questions, feedback, or need
              support, our team is ready to assist you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-lg">{info.value}</p>
                  <CardDescription className="text-base">
                    {info.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary">Send us a message</Badge>
                <h2 className="text-3xl font-bold">
                  We'd Love to Hear From You
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    All fields are required unless marked optional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links & FAQ */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary">Quick Help</Badge>
                <h2 className="text-3xl font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find quick answers to common questions below.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start">
                        <MessageCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Need Immediate Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="opacity-90">
                    For urgent matters, please call our 24/7 support line.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold text-lg">
                      1-800-Ridenest
                    </span>
                  </div>
                  <Button variant="secondary" className="w-full" size="lg">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">Our Locations</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Visit Our Offices
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We have multiple locations to serve you better. Find the one
              nearest to you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">New York Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">123 Broadway, New York, NY 10001</p>
                <p className="text-muted-foreground">Phone: (212) 555-0123</p>
                <p className="text-muted-foreground">Hours: 9AM-6PM EST</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Los Angeles Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">
                  456 Sunset Blvd, Los Angeles, CA 90028
                </p>
                <p className="text-muted-foreground">Phone: (213) 555-0123</p>
                <p className="text-muted-foreground">Hours: 9AM-6PM PST</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Chicago Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">
                  789 Michigan Ave, Chicago, IL 60611
                </p>
                <p className="text-muted-foreground">Phone: (312) 555-0123</p>
                <p className="text-muted-foreground">Hours: 9AM-6PM CST</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90">
              Join Ridenest today and experience the future of transportation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Sign Up as Rider
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

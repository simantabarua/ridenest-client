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
      value: "1-800-4654897",
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background border-b-2 border-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div>
              <span className="inline-block border-2 border-foreground bg-secondary text-secondary-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Contact Us
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Get in Touch with
              <span className="text-primary block sm:inline"> RideNest</span>
            </h1>
            <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Whether you have questions, feedback, or need
              support, our team is ready to assist you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none py-6">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 bg-secondary border-2 border-foreground flex items-center justify-center mx-auto mb-4 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <info.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-mono font-bold text-base md:text-lg text-foreground break-all">{info.value}</p>
                  <CardDescription className="text-sm font-mono text-muted-foreground uppercase">
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
                <div>
                  <span className="inline-block border-2 border-foreground bg-accent text-accent-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Send us a message
                  </span>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                  We'd Love to Hear From You
                </h2>
                <p className="text-md font-mono text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <Card className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none py-6">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground">Contact Form</CardTitle>
                  <CardDescription className="font-mono text-xs uppercase text-muted-foreground">
                    All fields are required unless marked optional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-mono uppercase font-black text-foreground">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-background text-foreground border-2 border-foreground rounded-none focus-visible:ring-0 focus:bg-secondary/10"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-mono uppercase font-black text-foreground">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-background text-foreground border-2 border-foreground rounded-none focus-visible:ring-0 focus:bg-secondary/10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs font-mono uppercase font-black text-foreground">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-background text-foreground border-2 border-foreground rounded-none focus-visible:ring-0 focus:bg-secondary/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-mono uppercase font-black text-foreground">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="bg-background text-foreground border-2 border-foreground rounded-none focus-visible:ring-0 focus:bg-secondary/10"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full border-2 border-foreground bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-6 text-md" 
                    >
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
                <div>
                  <span className="inline-block border-2 border-foreground bg-accent text-accent-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Quick Help
                  </span>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="text-md font-mono text-muted-foreground">
                  Find quick answers to common questions below.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-2 border-foreground bg-card shadow-[3px_3px_0px_0px_var(--foreground)] rounded-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-black flex items-start text-foreground uppercase tracking-tight">
                        <MessageCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm font-mono text-muted-foreground uppercase">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Need Immediate Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-mono text-sm uppercase opacity-95">
                    For urgent matters, please call our 24/7 support line.
                  </p>
                  <div className="flex items-center space-x-2 border-2 border-primary-foreground bg-background text-foreground p-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Phone className="w-5 h-5" />
                    <span className="font-mono font-black text-lg">
                      1-800-Ridenest
                    </span>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-full border-2 border-foreground bg-secondary hover:bg-secondary/80 text-secondary-foreground font-mono font-bold uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:translate-x-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all py-6 text-md" 
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div>
              <span className="inline-block border-2 border-foreground bg-secondary text-secondary-foreground font-mono font-bold uppercase rounded-none px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Our Locations
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-foreground">
              Visit Our Offices
            </h2>
            <p className="text-lg font-mono text-muted-foreground max-w-2xl mx-auto">
              We have multiple locations to serve you better. Find the one
              nearest to you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none py-6">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary border-2 border-foreground flex items-center justify-center mb-4 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Building className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground">New York Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-xs uppercase">
                <p className="font-bold text-foreground">123 Broadway, New York, NY 10001</p>
                <p className="text-muted-foreground">Phone: (212) 555-0123</p>
                <p className="text-muted-foreground">Hours: 9AM-6PM EST</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none py-6">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary border-2 border-foreground flex items-center justify-center mb-4 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Building className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground">Los Angeles Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-xs uppercase">
                <p className="font-bold text-foreground">
                  456 Sunset Blvd, Los Angeles, CA 90028
                </p>
                <p className="text-muted-foreground">Phone: (213) 555-0123</p>
                <p className="text-muted-foreground">Hours: 9AM-6PM PST</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_var(--foreground)] rounded-none py-6">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary border-2 border-foreground flex items-center justify-center mb-4 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Building className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground">Chicago Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-xs uppercase">
                <p className="font-bold text-foreground">
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
      <section className="py-20 bg-primary text-primary-foreground border-b-2 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg font-mono uppercase opacity-90">
              Join RideNest today and experience the future of transportation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="border-2 border-foreground bg-secondary hover:bg-secondary/80 text-secondary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] py-6 text-md"
              >
                Sign Up as Rider
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] py-6 text-md"
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

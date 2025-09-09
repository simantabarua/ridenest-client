import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Mail, MessageCircle, Globe } from "lucide-react";
import { Link } from "react-router";

const contactMethods = [
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is always here to help",
    action: "Call Now",
    value: "1-800-RIDENEST",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get detailed help via email",
    action: "Send Email",
    value: "support@ridenest.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us in real-time",
    action: "Start Chat",
    value: "Available in app",
  },
];

const faqs = [
  {
    question: "How do I book my first ride?",
    answer:
      "Download the app, enter your destination, and confirm your pickup location. Your driver will arrive shortly!",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash in select cities.",
  },
  {
    question: "How are drivers selected?",
    answer:
      "All drivers undergo thorough background checks, vehicle inspections, and must maintain high ratings.",
  },
  {
    question: "Can I schedule rides in advance?",
    answer:
      "Yes! You can schedule rides up to 30 days in advance through our app.",
  },
];

export default function ContactSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Get In Touch</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">We're Here to Help</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Our support team is available
            24/7 to ensure you have the best experience possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <method.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-muted-foreground mb-4">{method.description}</p>
              <p className="font-medium text-primary mb-4">{method.value}</p>
              <Button variant="outline" className="w-full">
                {method.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/faq">
                <Button variant="outline">
                  View All FAQs
                  <Globe className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Need Immediate Help?</h3>
            <p className="text-muted-foreground mb-6">
              For urgent matters, please use our emergency support line or the
              in-app emergency button. Our safety team is available 24/7.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">Emergency Support</h4>
                <p className="text-2xl font-bold text-primary mb-2">
                  1-800-EMERGENCY
                </p>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 for urgent safety concerns
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">Business Inquiries</h4>
                <p className="text-lg font-medium mb-2">
                  partnerships@ridenest.com
                </p>
                <p className="text-sm text-muted-foreground">
                  For business partnerships and corporate accounts
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">Media Contact</h4>
                <p className="text-lg font-medium mb-2">media@ridenest.com</p>
                <p className="text-sm text-muted-foreground">
                  For press inquiries and media opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

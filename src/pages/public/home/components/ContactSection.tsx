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
    value: "+880 9612-445566",
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
    value: "Available in App",
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
      "We accept Bkash, Nagad, Rocket, major debit/credit cards, and cash payment directly to the driver.",
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
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            Get In Touch
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">We're Here to Help</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Our support team is available
            24/7 to ensure you have the best experience possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-card border-2 border-foreground p-6 text-center shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-primary/20 border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-extrabold uppercase tracking-tight mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                <p className="font-mono font-bold text-foreground mb-6">{method.value}</p>
              </div>
              <Button variant="outline" className="w-full border-2 border-foreground hover:bg-foreground hover:text-background font-extrabold uppercase transition-colors">
                {method.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary/35 border-2 border-foreground p-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                  <h4 className="font-extrabold uppercase text-sm mb-2">{faq.question}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link to="/faq">
                <Button variant="outline" className="border-2 border-foreground hover:bg-foreground hover:text-background font-extrabold uppercase transition-colors">
                  View All FAQs
                  <Globe className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border-2 border-foreground p-8 shadow-[6px_6px_0px_0px_var(--foreground)]">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 border-b-2 border-foreground/10 pb-2">Need Immediate Help?</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              For urgent safety issues, please use our emergency support line or the
              in-app emergency button. Our safety team is available 24/7.
            </p>

            <div className="space-y-4">
              <div className="bg-card border-2 border-foreground p-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <h4 className="font-extrabold uppercase text-xs mb-1">Emergency Support</h4>
                <p className="text-xl font-black text-red-600 mb-1">
                  999 (Bangladesh SOS)
                </p>
                <p className="text-xs text-muted-foreground">
                  Available 24/7 for urgent safety concerns
                </p>
              </div>

              <div className="bg-card border-2 border-foreground p-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <h4 className="font-extrabold uppercase text-xs mb-1">Business Inquiries</h4>
                <p className="text-sm font-mono font-bold mb-1">
                  partnerships@ridenest.com
                </p>
                <p className="text-xs text-muted-foreground">
                  For business partnerships and corporate accounts
                </p>
              </div>

              <div className="bg-card border-2 border-foreground p-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <h4 className="font-extrabold uppercase text-xs mb-1">Media Contact</h4>
                <p className="text-sm font-mono font-bold mb-1">media@ridenest.com</p>
                <p className="text-xs text-muted-foreground">
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

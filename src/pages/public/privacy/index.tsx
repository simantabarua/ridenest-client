import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Trash2, Settings } from "lucide-react";

export default function PrivacyPage() {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      content:
        "We collect information you provide directly to us, such as when you create an account, use our service, or contact us for support.",
      details: [
        "Personal identification information (name, email, phone number)",
        "Location data for ride matching and navigation",
        "Payment information processed securely by third-party providers",
        "Device information and usage data",
        "Communications and support requests",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Settings,
      content:
        "We use the information we collect to provide, maintain, and improve our services.",
      details: [
        "To facilitate ride matching and transactions",
        "To communicate with you about your account and rides",
        "To improve our services and develop new features",
        "To ensure safety and security for all users",
        "To comply with legal obligations",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content:
        "We implement appropriate technical and organizational measures to protect your personal information.",
      details: [
        "Encryption of sensitive data in transit and at rest",
        "Secure authentication and access controls",
        "Regular security assessments and updates",
        "Employee training on data protection",
        "Limited access to personal information on a need-to-know basis",
      ],
    },
    {
      title: "Your Privacy Rights",
      icon: Eye,
      content: "You have certain rights regarding your personal information.",
      details: [
        "Access to your personal information",
        "Correction of inaccurate information",
        "Deletion of your account and data",
        "Object to processing of your data",
        "Data portability to other services",
      ],
    },
    {
      title: "Data Retention",
      icon: Trash2,
      content:
        "We retain your information only as long as necessary to provide our services.",
      details: [
        "Account information: While your account is active",
        "Ride history: Up to 7 years for legal compliance",
        "Payment data: As required by financial regulations",
        "Support communications: Up to 3 years",
        "Marketing data: Until you opt out or delete your account",
      ],
    },
    {
      title: "Third-Party Sharing",
      icon: Shield,
      content:
        "We only share your information with trusted third parties as necessary for our service.",
      details: [
        "Payment processors for transaction processing",
        "Service providers who assist in operating our platform",
        "Legal authorities when required by law",
        "Business partners only with your explicit consent",
        "Never for marketing purposes without your permission",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center md:text-left space-y-4">
          <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
            Privacy
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            LAST UPDATED: AUGUST 22, 2025
          </p>
        </div>

        {/* Overview */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] bg-card">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="flex items-center space-x-3 text-lg font-black uppercase">
              <div className="p-1.5 border-2 border-foreground bg-secondary">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span>Our Commitment to Privacy</span>
            </CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              At Ridenest, we take your privacy seriously. This policy explains
              how we collect, use, and protect your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. This Privacy Policy outlines our
              practices regarding the collection, use, and disclosure of your
              personal information when you use our ride-sharing platform. By
              using Ridenest, you agree to the practices described in this
              policy.
            </p>
          </CardContent>
        </Card>

        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-black uppercase">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Industry-standard encryption and security measures.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-black uppercase">Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Clear information about data collection and use.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-black uppercase">Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                You control your personal information and preferences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {privacySections.map((section, index) => (
            <Card key={index} className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
              <CardHeader className="border-b-2 border-foreground bg-secondary/15">
                <CardTitle className="flex items-center space-x-3 text-base font-black uppercase">
                  <div className="p-1.5 border-2 border-foreground bg-background">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span>{section.title}</span>
                </CardTitle>
                <CardDescription className="text-sm font-mono pt-1 text-foreground">{section.content}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {section.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                      <div className="mt-1 w-2.5 h-2.5 border-2 border-foreground bg-primary flex-shrink-0"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cookies and Tracking */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground bg-secondary/10">
            <CardTitle className="text-lg font-black uppercase">Cookies and Tracking Technologies</CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              How we use cookies and similar technologies on our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              experience, analyze usage patterns, and improve our services.
              You can control cookie preferences through your browser settings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-foreground bg-secondary/5">
                <h4 className="font-bold font-mono uppercase text-sm mb-1">Essential Cookies</h4>
                <p className="text-xs text-muted-foreground">Required for basic functionality and security</p>
              </div>
              <div className="p-4 border-2 border-foreground bg-secondary/5">
                <h4 className="font-bold font-mono uppercase text-sm mb-1">Analytics Cookies</h4>
                <p className="text-xs text-muted-foreground">Help us understand how you use our service</p>
              </div>
              <div className="p-4 border-2 border-foreground bg-secondary/5">
                <h4 className="font-bold font-mono uppercase text-sm mb-1">Marketing Cookies</h4>
                <p className="text-xs text-muted-foreground">Used for personalized advertising (optional)</p>
              </div>
              <div className="p-4 border-2 border-foreground bg-secondary/5">
                <h4 className="font-bold font-mono uppercase text-sm mb-1">Preference Cookies</h4>
                <p className="text-xs text-muted-foreground">Remember your settings and preferences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Users */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground bg-secondary/10">
            <CardTitle className="text-lg font-black uppercase">International Data Transfers</CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              How we handle data for users outside your country.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ridenest operates globally, and your information may be
              transferred to and processed in countries other than your country
              of residence. We ensure appropriate safeguards are in place for
              international data transfers, including standard contractual
              clauses and other legal mechanisms as required by applicable data
              protection laws.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="text-lg font-black uppercase">Contact Us</CardTitle>
            <CardDescription className="font-mono text-xs">
              Questions about our privacy practices? We're here to help.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground text-sm">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please don't hesitate to
              contact us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono text-muted-foreground">
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Email</strong>
                privacy@ridenest.com
              </div>
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Phone</strong>
                +1 (555) 123-4567
              </div>
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Address</strong>
                123 Privacy Lane, SF, CA 94105
              </div>
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Data Protection Officer</strong>
                dpo@ridenest.com
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-6">
          <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1.5 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
            © 2026 Ridenest. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

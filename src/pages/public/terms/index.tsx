import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Shield, Users, Car, DollarSign } from "lucide-react";

export default function TermsPage() {
  const termsSections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using Ridenest, you accept and agree to be bound by the terms and provision of this agreement.",
    },
    {
      title: "2. Use License",
      content:
        "Permission is granted to temporarily download one copy of Ridenest for personal, non-commercial transitory viewing only.",
    },
    {
      title: "3. Disclaimer",
      content:
        'The service is provided "as is" without warranty of any kind, express or implied, including but not limited to merchantability or fitness for a particular purpose.',
    },
    {
      title: "4. User Responsibilities",
      content:
        "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.",
    },
    {
      title: "5. Service Fees",
      content:
        "Ridenest charges service fees for each completed ride. Fees are clearly displayed before booking and vary based on distance, time, and demand.",
    },
    {
      title: "6. Prohibited Activities",
      content:
        "Users may not use the service for illegal activities, harassment, or any purpose that violates applicable laws or regulations.",
    },
    {
      title: "7. Privacy Policy",
      content:
        "Your use of Ridenest is also governed by our Privacy Policy, which can be found separately in our app.",
    },
    {
      title: "8. Termination",
      content:
        "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center md:text-left space-y-4">
          <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
            Legal
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            LAST UPDATED: JANUARY 15, 2024
          </p>
        </div>

        {/* Overview Card */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] bg-card">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="flex items-center space-x-3 text-lg font-black uppercase">
              <div className="p-1.5 border-2 border-foreground bg-secondary">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span>Overview</span>
            </CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              Welcome to Ridenest! These Terms of Service govern your use of our
              ride-sharing platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              Ridenest provides a platform connecting riders with drivers for
              transportation services. By using our service, you agree to these
              terms and conditions. Please read them carefully before using our
              platform.
            </p>
          </CardContent>
        </Card>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-base font-black uppercase">User Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Create and maintain secure accounts for all users.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-base font-black uppercase">Ride Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Connect riders with verified drivers.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-base font-black uppercase">Fair Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Transparent pricing with no hidden fees.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
            <CardHeader>
              <div className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-base font-black uppercase">Safety First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-mono">
                Committed to user safety and security.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          {termsSections.map((section, index) => (
            <Card key={index} className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
              <CardHeader className="border-b-2 border-foreground bg-secondary/20">
                <CardTitle className="text-lg font-black uppercase tracking-tight">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="text-lg font-black uppercase">Contact Information</CardTitle>
            <CardDescription className="font-mono text-xs">
              If you have questions about these Terms of Service, please contact us.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono text-muted-foreground">
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Email</strong>
                legal@ridenest.com
              </div>
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Phone</strong>
                +1 (555) 123-4567
              </div>
              <div className="p-3 border-2 border-foreground bg-secondary/10">
                <strong className="block text-foreground uppercase text-xs mb-1">Address</strong>
                123 Ridenest Street, SF, CA 94105
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

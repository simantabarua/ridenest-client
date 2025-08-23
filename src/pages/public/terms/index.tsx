import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Overview Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Overview</span>
            </CardTitle>
            <CardDescription>
              Welcome to Ridenest! These Terms of Service govern your use of our
              ride-sharing platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">User Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create and maintain secure accounts for all users
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Car className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Ride Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect riders with verified drivers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <DollarSign className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Fair Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Transparent pricing with no hidden fees
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Safety First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Committed to user safety and security
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {termsSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              If you have questions about these Terms of Service, please contact
              us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong> legal@Ridenest.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Ridenest Street, San Francisco, CA
                94105
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <Badge variant="secondary">
            © 2024 Ridenest. All rights reserved.
          </Badge>
        </div>
      </div>
    </div>
  );
}

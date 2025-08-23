"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: August 22, 2025</p>
        </div>

        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Our Commitment to Privacy</span>
            </CardTitle>
            <CardDescription>
              At Ridenest, we take your privacy seriously. This policy explains
              how we collect, use, and protect your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardHeader>
              <Lock className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Industry-standard encryption and security measures
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Clear information about data collection and use
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Settings className="w-8 h-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You control your personal information and preferences
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {privacySections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
                <CardDescription>{section.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cookies and Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
            <CardDescription>
              How we use cookies and similar technologies on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your
                experience, analyze usage patterns, and improve our services.
                You can control cookie preferences through your browser
                settings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for basic functionality and security
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how you use our service
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Used for personalized advertising (optional)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your settings and preferences
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Users */}
        <Card>
          <CardHeader>
            <CardTitle>International Data Transfers</CardTitle>
            <CardDescription>
              How we handle data for users outside your country
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
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
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Questions about our privacy practices? We're here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please don't hesitate to
                contact us.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p>
                  <strong>Email:</strong> privacy@Ridenest.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Privacy Lane, San Francisco, CA
                  94105
                </p>
                <p>
                  <strong>Data Protection Officer:</strong> dpo@Ridenest.com
                </p>
              </div>
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

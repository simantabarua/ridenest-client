"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Shield,
  Star,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: "Be Respectful",
      icon: Users,
      description: "Treat all users with respect and courtesy",
      points: [
        "Use polite language in all communications",
        "Respect personal boundaries and privacy",
        "Be patient during pickup and drop-off",
        "Avoid discriminatory behavior or language",
      ],
    },
    {
      title: "Safety First",
      icon: Shield,
      description: "Prioritize safety for everyone involved",
      points: [
        "Always wear seatbelts during rides",
        "Follow all traffic laws and regulations",
        "Maintain vehicle in good condition",
        "Report any safety concerns immediately",
      ],
    },
    {
      title: "Provide Excellent Service",
      icon: Star,
      description: "Strive for 5-star service experiences",
      points: [
        "Maintain clean and comfortable vehicles",
        "Be punctual for pickups",
        "Assist with luggage when needed",
        "Provide a pleasant riding experience",
      ],
    },
    {
      title: "Communicate Effectively",
      icon: MessageCircle,
      description: "Keep communication clear and professional",
      points: [
        "Use the in-app messaging system",
        "Confirm pickup details before arrival",
        "Notify about any delays or changes",
        "Be responsive to messages and calls",
      ],
    },
  ];

  const riderGuidelines = [
    {
      title: "For Riders",
      points: [
        "Be ready at the pickup location on time",
        "Provide accurate pickup and destination addresses",
        "Treat drivers and their vehicles with respect",
        "Follow safety guidelines during the ride",
        "Rate your experience honestly and fairly",
        "Report any issues through the app",
      ],
    },
  ];

  const driverGuidelines = [
    {
      title: "For Drivers",
      points: [
        "Maintain a valid driver's license and insurance",
        "Keep your vehicle clean and well-maintained",
        "Accept ride requests promptly when available",
        "Follow the most efficient routes",
        "Provide excellent customer service",
        "Adhere to all local transportation laws",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Community Guidelines</h1>
            <p className="text-muted-foreground">
              Building a safe and respectful community
            </p>
          </div>
        </div>

        {/* Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Our Community Standards</span>
            </CardTitle>
            <CardDescription>
              These guidelines help ensure Ridenest remains a safe, respectful,
              and enjoyable platform for everyone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              At Ridenest, we believe in creating a community where everyone
              feels safe and respected. These guidelines outline the behavior we
              expect from all users, including riders and drivers. By following
              these standards, we can maintain a positive experience for
              everyone.
            </p>
          </CardContent>
        </Card>

        {/* Core Guidelines */}
        <div className="space-y-6">
          {guidelines.map((guideline, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <guideline.icon className="w-6 h-6 text-primary" />
                  <span>{guideline.title}</span>
                </CardTitle>
                <CardDescription>{guideline.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guideline.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role-Specific Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riderGuidelines.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {driverGuidelines.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Prohibited Activities</span>
            </CardTitle>
            <CardDescription>
              The following activities are strictly prohibited on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Safety Violations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Driving under the influence</li>
                  <li>• Reckless or dangerous driving</li>
                  <li>• Vehicle not meeting safety standards</li>
                  <li>• Ignoring traffic laws</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Behavioral Issues</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Harassment or discrimination</li>
                  <li>• Verbal or physical abuse</li>
                  <li>• Unwanted advances</li>
                  <li>• Disrespectful behavior</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Policy Violations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Cash payments outside the app</li>
                  <li>• Sharing account credentials</li>
                  <li>• Fraudulent activities</li>
                  <li>• Spam or unsolicited communications</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Legal Issues</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Illegal activities during rides</li>
                  <li>• Transporting prohibited items</li>
                  <li>• Violating local laws</li>
                  <li>• Tax evasion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting Violations */}
        <Card>
          <CardHeader>
            <CardTitle>Reporting Guidelines Violations</CardTitle>
            <CardDescription>
              Help us maintain a safe community by reporting violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                If you witness or experience any violation of these guidelines,
                please report it immediately through our app. All reports are
                taken seriously and investigated promptly.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">How to Report:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use the "Report" button in the app after a ride</li>
                  <li>• Contact our support team through the Help Center</li>
                  <li>• Email us at support@Ridenest.com</li>
                  <li>• Call our 24/7 hotline: +1 (555) 123-4567</li>
                </ul>
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

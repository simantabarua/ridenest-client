import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Shield,
  Star,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

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
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center md:text-left space-y-4">
          <span className="inline-block border-2 border-foreground bg-secondary px-4 py-1 text-xs font-mono uppercase font-bold shadow-[2px_2px_0px_0px_var(--foreground)]">
            Community
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
            Community Guidelines
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            BUILDING A SAFE AND RESPECTFUL COMMUNITY
          </p>
        </div>

        {/* Overview */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] bg-card">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="flex items-center space-x-3 text-lg font-black uppercase">
              <div className="p-1.5 border-2 border-foreground bg-secondary">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <span>Our Community Standards</span>
            </CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              These guidelines help ensure Ridenest remains a safe, respectful,
              and enjoyable platform for everyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <Card key={index} className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all">
              <CardHeader className="border-b-2 border-foreground bg-secondary/15">
                <CardTitle className="flex items-center space-x-3 text-base font-black uppercase">
                  <div className="p-1.5 border-2 border-foreground bg-background">
                    <guideline.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span>{guideline.title}</span>
                </CardTitle>
                <CardDescription className="font-mono text-xs pt-1">{guideline.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {guideline.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                      <div className="mt-0.5 w-4 h-4 border border-foreground flex items-center justify-center bg-primary text-primary-foreground font-mono text-[9px] font-bold flex-shrink-0">✓</div>
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
            <Card key={index} className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
              <CardHeader className="border-b-2 border-foreground bg-secondary/10">
                <CardTitle className="flex items-center space-x-2 text-base font-black uppercase">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                      <div className="mt-0.5 w-4 h-4 border border-foreground flex items-center justify-center bg-primary text-primary-foreground font-mono text-[9px] font-bold flex-shrink-0">✓</div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {driverGuidelines.map((section, index) => (
            <Card key={index} className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
              <CardHeader className="border-b-2 border-foreground bg-secondary/10">
                <CardTitle className="flex items-center space-x-2 text-base font-black uppercase">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                      <div className="mt-0.5 w-4 h-4 border border-foreground flex items-center justify-center bg-primary text-primary-foreground font-mono text-[9px] font-bold flex-shrink-0">✓</div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Activities */}
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="flex items-center space-x-3 text-lg font-black uppercase">
              <div className="p-1.5 border-2 border-foreground bg-secondary">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <span>Prohibited Activities</span>
            </CardTitle>
            <CardDescription className="font-mono text-xs pt-1">
              The following activities are strictly prohibited on our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 border-2 border-foreground bg-destructive/5">
                <h4 className="font-bold font-mono uppercase text-sm border-b border-foreground pb-1 text-destructive">Safety Violations</h4>
                <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                  <li>• Driving under the influence</li>
                  <li>• Reckless or dangerous driving</li>
                  <li>• Vehicle not meeting safety standards</li>
                  <li>• Ignoring traffic laws</li>
                </ul>
              </div>
              <div className="space-y-3 p-4 border-2 border-foreground bg-destructive/5">
                <h4 className="font-bold font-mono uppercase text-sm border-b border-foreground pb-1 text-destructive">Behavioral Issues</h4>
                <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                  <li>• Harassment or discrimination</li>
                  <li>• Verbal or physical abuse</li>
                  <li>• Unwanted advances</li>
                  <li>• Disrespectful behavior</li>
                </ul>
              </div>
              <div className="space-y-3 p-4 border-2 border-foreground bg-destructive/5">
                <h4 className="font-bold font-mono uppercase text-sm border-b border-foreground pb-1 text-destructive">Policy Violations</h4>
                <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                  <li>• Cash payments outside the app</li>
                  <li>• Sharing account credentials</li>
                  <li>• Fraudulent activities</li>
                  <li>• Spam or unsolicited communications</li>
                </ul>
              </div>
              <div className="space-y-3 p-4 border-2 border-foreground bg-destructive/5">
                <h4 className="font-bold font-mono uppercase text-sm border-b border-foreground pb-1 text-destructive">Legal Issues</h4>
                <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
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
        <Card className="border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)]">
          <CardHeader className="border-b-2 border-foreground">
            <CardTitle className="text-lg font-black uppercase">Reporting Guidelines Violations</CardTitle>
            <CardDescription className="font-mono text-xs">
              Help us maintain a safe community by reporting violations.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground text-sm">
              If you witness or experience any violation of these guidelines,
              please report it immediately through our app. All reports are
              taken seriously and investigated promptly.
            </p>
            <div className="border-2 border-foreground p-4 bg-secondary/20">
              <h4 className="font-bold font-mono uppercase text-sm mb-3">How to Report:</h4>
              <ul className="space-y-2 text-xs font-mono text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0"></span>
                  <span>Use the "Report" button in the app after a ride</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0"></span>
                  <span>Contact our support team through the Help Center</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0"></span>
                  <span>Email us at support@ridenest.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0"></span>
                  <span>Call our 24/7 hotline: +1 (555) 123-4567</span>
                </li>
              </ul>
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

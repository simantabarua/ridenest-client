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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Phone,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  Bell,
  MessageCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
} from "lucide-react";

export default function DriverSafetyPage() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Mike Johnson",
      relationship: "Parent",
      phone: "+1 (555) 987-6543",
    },
    {
      id: 3,
      name: "Emily Davis",
      relationship: "Friend",
      phone: "+1 (555) 456-7890",
    },
  ]);

  const safetySettings = {
    shareLocation: true,
    emergencyAlerts: true,
    rideCheck: true,
    dashCamIntegration: false,
    audioRecording: false,
    anonymousMode: false,
    nightModeSafety: true,
  };

  const safetyFeatures = [
    {
      title: "Emergency Button",
      description: "Discreet emergency assistance button in the driver app",
      icon: AlertTriangle,
      status: "Enabled",
      color: "text-red-600",
    },
    {
      title: "Emergency Contacts",
      description: "Quick access to emergency contacts during rides",
      icon: Users,
      status: "3 Contacts",
      color: "text-blue-600",
    },
    {
      title: "RideCheck",
      description: "Automated safety notifications during unusual stops",
      icon: Bell,
      status: "Active",
      color: "text-purple-600",
    },
    {
      title: "Location Sharing",
      description: "Share your location with trusted contacts",
      icon: MapPin,
      status: "Enabled",
      color: "text-green-600",
    },
    {
      title: "Driver Verification",
      description: "Regular background checks and verification",
      icon: CheckCircle,
      status: "Verified",
      color: "text-green-600",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support for safety concerns",
      icon: MessageCircle,
      status: "Available",
      color: "text-blue-600",
    },
  ];

  const safetyTips = [
    {
      category: "Before Starting",
      tips: [
        "Verify your vehicle is in good condition",
        "Check your emergency contacts are up to date",
        "Ensure your phone is charged and the app is updated",
        "Review the route and destination before accepting",
      ],
    },
    {
      category: "During Rides",
      tips: [
        "Always follow traffic laws and drive safely",
        "Keep your phone mounted for easy access to the app",
        "Use the emergency button if you feel unsafe",
        "Maintain professional communication with passengers",
      ],
    },
    {
      category: "Emergency Procedures",
      tips: [
        "Use the emergency button for immediate assistance",
        "Call 911 if you are in immediate danger",
        "Pull over to a safe location if you need to make an emergency call",
        "Report any safety incidents to support immediately",
      ],
    },
  ];

  const vehicleSafety = {
    lastInspection: "2024-01-10",
    nextInspection: "2024-04-10",
    insuranceValid: true,
    insuranceExpiry: "2024-12-31",
    registrationValid: true,
    registrationExpiry: "2024-06-30",
  };

  const handleAddContact = () => {
    // Add contact logic would go here
    console.log("Add emergency contact");
  };

  const handleRemoveContact = (id: number) => {
    setEmergencyContacts(
      emergencyContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Driver Safety Center</h1>
            <p className="text-muted-foreground">
              Your safety is our top priority
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="features">Safety Features</TabsTrigger>
                  <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle Safety</TabsTrigger>
                  <TabsTrigger value="tips">Safety Tips</TabsTrigger>
                </TabsList>

                {/* Safety Features */}
                <TabsContent value="features" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Driver Safety Features</span>
                      </CardTitle>
                      <CardDescription>
                        Comprehensive safety features designed to protect you
                        during every ride
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {safetyFeatures.map((feature, index) => (
                          <Card key={index} className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center`}
                                >
                                  <feature.icon
                                    className={`w-5 h-5 ${feature.color}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-lg">
                                    {feature.title}
                                  </CardTitle>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="text-sm mb-3">
                                {feature.description}
                              </CardDescription>
                              <Badge variant="secondary" className="text-xs">
                                {feature.status}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Emergency Contacts */}
                <TabsContent value="contacts" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Emergency Contacts</CardTitle>
                          <CardDescription>
                            Add contacts who will be notified in case of
                            emergency
                          </CardDescription>
                        </div>
                        <Button onClick={handleAddContact}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Contact
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {emergencyContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {contact.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {contact.relationship} • {contact.phone}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveContact(contact.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {emergencyContacts.length === 0 && (
                          <div className="text-center py-8">
                            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                              No Emergency Contacts
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Add emergency contacts to enhance your safety
                              during rides.
                            </p>
                            <Button onClick={handleAddContact}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add First Contact
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Vehicle Safety */}
                <TabsContent value="vehicle" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Vehicle Safety Status</CardTitle>
                      <CardDescription>
                        Monitor your vehicle's safety compliance and maintenance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Inspection Status */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Inspection Status
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-900">
                                Last Inspection
                              </span>
                            </div>
                            <div className="text-sm text-green-700 mt-1">
                              {vehicleSafety.lastInspection}
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-blue-900">
                                Next Inspection
                              </span>
                            </div>
                            <div className="text-sm text-blue-700 mt-1">
                              {vehicleSafety.nextInspection}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Insurance & Registration */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Insurance & Registration
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-900">
                                Insurance
                              </span>
                            </div>
                            <div className="text-sm text-green-700 mt-1">
                              Valid until {vehicleSafety.insuranceExpiry}
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-900">
                                Registration
                              </span>
                            </div>
                            <div className="text-sm text-green-700 mt-1">
                              Valid until {vehicleSafety.registrationExpiry}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Safety Equipment */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Safety Equipment Check
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Seat Belts</span>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Airbags</span>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Fire Extinguisher</span>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">First Aid Kit</span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Update Vehicle Information
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Safety Tips */}
                <TabsContent value="tips" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Safety Tips & Guidelines</CardTitle>
                      <CardDescription>
                        Important safety information for every driver
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {safetyTips.map((category, index) => (
                          <div key={index} className="space-y-4">
                            <h3 className="text-xl font-semibold flex items-center space-x-2">
                              <Shield className="w-5 h-5 text-primary" />
                              <span>{category.category}</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              {category.tips.map((tip, tipIndex) => (
                                <div
                                  key={tipIndex}
                                  className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg"
                                >
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Emergency Assistance */}
              <Card className="border-0 shadow-lg border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Emergency Assistance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-red-700">
                    If you are in immediate danger during a ride:
                  </p>
                  <div className="space-y-3">
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Button
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call 911
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Settings */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Safety Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Share Location</div>
                        <div className="text-xs text-muted-foreground">
                          Share location with emergency contacts
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.shareLocation}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Emergency Alerts</div>
                        <div className="text-xs text-muted-foreground">
                          Receive emergency alerts and notifications
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.emergencyAlerts}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          RideCheck Notifications
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Get notified during unusual stops
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.rideCheck}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Dash Cam Integration</div>
                        <div className="text-xs text-muted-foreground">
                          Connect your dash cam for extra security
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.dashCamIntegration}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Audio Recording</div>
                        <div className="text-xs text-muted-foreground">
                          Record audio during rides for safety
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.audioRecording}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Anonymous Mode</div>
                        <div className="text-xs text-muted-foreground">
                          Hide your personal information from passengers
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.anonymousMode}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Night Mode Safety</div>
                        <div className="text-xs text-muted-foreground">
                          Enhanced safety features for night driving
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={safetySettings.nightModeSafety}
                        className="rounded"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Resources */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Safety Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Safety Handbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Safety Videos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Safety Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Driver Community
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Safety Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Safety Incidents
                    </span>
                    <span className="font-semibold">0.001%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Emergency Response Time
                    </span>
                    <span className="font-semibold">&lt; 2 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Driver Satisfaction
                    </span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Safety Training Complete
                    </span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

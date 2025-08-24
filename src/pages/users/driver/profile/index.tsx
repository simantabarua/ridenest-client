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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Car,
  CreditCard,
  Shield,
  Bell,
  Settings,
  Camera,
  Edit,
  Save,
  Plus,
  Trash2,
  Star,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Upload,
  Eye,
  MessageCircle,
  BookOpen,
} from "lucide-react";

export default function DriverProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    licenseNumber: "DL123456789",
    licenseExpiry: "2025-06-30",
    licenseState: "CA",
  });

  const vehicleInfo = {
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Silver",
    licensePlate: "ABC 123",
    insuranceProvider: "State Farm",
    insurancePolicy: "POL123456789",
    insuranceExpiry: "2024-12-31",
  };

  const documents = [
    { id: 1, name: "Driver License", status: "verified", expiry: "2025-06-30" },
    {
      id: 2,
      name: "Vehicle Registration",
      status: "verified",
      expiry: "2024-12-31",
    },
    {
      id: 3,
      name: "Insurance Certificate",
      status: "verified",
      expiry: "2024-12-31",
    },
    {
      id: 4,
      name: "Background Check",
      status: "verified",
      expiry: "2024-06-30",
    },
  ];

  const paymentMethods = [
    { id: 1, type: "Bank Account", last4: "1234", isDefault: true },
    { id: 2, type: "Debit Card", last4: "5678", isDefault: false },
  ];

  const stats = {
    totalRides: 1247,
    totalEarnings: "$28,456.80",
    memberSince: "January 2022",
    avgRating: 4.9,
    acceptanceRate: "85%",
    completionRate: "98%",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
    console.log("Profile saved:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Driver Profile</h1>
              <p className="text-muted-foreground">
                Manage your driver account and information
              </p>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-primary" />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="font-semibold">Profile Picture</h3>
                          <p className="text-sm text-muted-foreground">
                            This will be visible to passengers
                          </p>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">License Number</Label>
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseExpiry">License Expiry</Label>
                          <Input
                            id="licenseExpiry"
                            name="licenseExpiry"
                            type="date"
                            value={formData.licenseExpiry}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseState">License State</Label>
                          <Input
                            id="licenseState"
                            name="licenseState"
                            value={formData.licenseState}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Driver Stats */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Driver Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <Car className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {stats.totalRides}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Rides
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {stats.totalEarnings}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Earnings
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {stats.avgRating}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg Rating
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {stats.memberSince}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Member Since
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Vehicle Information */}
                <TabsContent value="vehicle" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Vehicle Information</CardTitle>
                      <CardDescription>
                        Your vehicle details and registration information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Make</Label>
                          <Input value={vehicleInfo.make} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Model</Label>
                          <Input value={vehicleInfo.model} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input value={vehicleInfo.year} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input value={vehicleInfo.color} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>License Plate</Label>
                          <Input value={vehicleInfo.licensePlate} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Insurance Provider</Label>
                          <Input
                            value={vehicleInfo.insuranceProvider}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Insurance Policy</Label>
                          <Input value={vehicleInfo.insurancePolicy} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Insurance Expiry</Label>
                          <Input value={vehicleInfo.insuranceExpiry} disabled />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600">
                            Vehicle verified
                          </span>
                        </div>
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Update Vehicle Info
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Required Documents</CardTitle>
                      <CardDescription>
                        Keep your documents up to date to maintain your driver
                        status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">
                                    {doc.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      doc.status === "verified"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {doc.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Expires: {doc.expiry}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment Methods */}
                <TabsContent value="payment" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>
                            Manage your payout methods and earnings
                          </CardDescription>
                        </div>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Method
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">
                                    {method.type}
                                  </span>
                                  {method.isDefault && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  •••• {method.last4}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {!method.isDefault && (
                                <Button variant="outline" size="sm">
                                  Set Default
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Driver Preferences</CardTitle>
                      <CardDescription>
                        Customize your driving experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Accept Long Trips</div>
                            <div className="text-sm text-muted-foreground">
                              Accept trips longer than 30 minutes
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              Accept Airport Rides
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Accept trips to and from airports
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Preferred Areas</div>
                            <div className="text-sm text-muted-foreground">
                              Set your preferred driving areas
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Driving Hours</div>
                            <div className="text-sm text-muted-foreground">
                              Set your available driving hours
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Set Hours
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Manage your notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Ride Requests</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified for new ride requests
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Surge Pricing Alerts
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when surge pricing is active
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Promotional Offers</div>
                          <div className="text-sm text-muted-foreground">
                            Receive promotional offers and bonuses
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Profile Complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Documents Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Vehicle Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Payment Method Added</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Acceptance Rate
                    </span>
                    <span className="font-semibold">
                      {stats.acceptanceRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-semibold">
                      {stats.completionRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Average Rating
                    </span>
                    <span className="font-semibold">{stats.avgRating}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Driver Guidelines
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-0 shadow-lg border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </Button>
                  <p className="text-xs text-red-600 text-center">
                    This action will temporarily disable your driver account
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

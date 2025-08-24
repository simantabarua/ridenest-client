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
  Car,
  DollarSign,
  BookOpen,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function RiderProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
  });

  const savedPlaces = [
    { id: 1, name: "Home", address: "123 Main St, City, State", icon: "🏠" },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave, City, State",
      icon: "🏢",
    },
    { id: 3, name: "Gym", address: "789 Fitness St, City, State", icon: "💪" },
    {
      id: 4,
      name: "Airport",
      address: "Airport Terminal, City, State",
      icon: "✈️",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Debit Card",
      last4: "5678",
      expiry: "08/24",
      isDefault: false,
    },
  ];

  const stats = {
    totalRides: 47,
    totalSpent: "$342.50",
    memberSince: "January 2023",
    avgRating: 4.8,
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
              <h1 className="text-3xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="places">Saved Places</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                            This will be visible to drivers
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
                        <div className="space-y-2 md:col-span-2">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Stats */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Account Statistics</CardTitle>
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
                            {stats.totalSpent}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Spent
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
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {stats.avgRating}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg Rating
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Saved Places */}
                <TabsContent value="places" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Saved Places</CardTitle>
                          <CardDescription>
                            Quick access to your frequent destinations
                          </CardDescription>
                        </div>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Place
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedPlaces.map((place) => (
                          <div
                            key={place.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-2xl">{place.icon}</span>
                              <div>
                                <div className="font-medium">{place.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {place.address}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
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

                {/* Payment Methods */}
                <TabsContent value="payment" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>
                            Manage your payment options and billing information
                          </CardDescription>
                        </div>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Payment Method
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
                                  •••• {method.last4} • Expires {method.expiry}
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

                {/* Preferences */}
                <TabsContent value="preferences" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Ride Preferences</CardTitle>
                      <CardDescription>
                        Customize your ride experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Default Ride Type</div>
                            <div className="text-sm text-muted-foreground">
                              Choose your preferred ride type
                            </div>
                          </div>
                          <select className="px-3 py-2 border rounded-md">
                            <option>Standard</option>
                            <option>Comfort</option>
                            <option>Premium</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Music Preference</div>
                            <div className="text-sm text-muted-foreground">
                              Set your default music choice
                            </div>
                          </div>
                          <select className="px-3 py-2 border rounded-md">
                            <option>No Preference</option>
                            <option>Quiet Ride</option>
                            <option>Pop</option>
                            <option>Rock</option>
                            <option>Jazz</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              Temperature Preference
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Your preferred car temperature
                            </div>
                          </div>
                          <select className="px-3 py-2 border rounded-md">
                            <option>Comfortable</option>
                            <option>Cool</option>
                            <option>Warm</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              Conversation Level
                            </div>
                            <div className="text-sm text-muted-foreground">
                              How much you'd like to chat
                            </div>
                          </div>
                          <select className="px-3 py-2 border rounded-md">
                            <option>No Preference</option>
                            <option>Quiet</option>
                            <option>Friendly</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        Manage your notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Ride Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified about your ride status
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
                          <div className="font-medium">Promotions</div>
                          <div className="text-sm text-muted-foreground">
                            Receive special offers and discounts
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
                          <div className="font-medium">Driver Messages</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when drivers message you
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
                    <span className="text-sm">Email Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Phone Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Payment Method Added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Profile Incomplete</span>
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
                    Terms of Service
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
                    Delete Account
                  </Button>
                  <p className="text-xs text-red-600 text-center">
                    This action cannot be undone
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

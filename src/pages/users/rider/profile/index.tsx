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
import {
  User,
  Camera,
  Edit,
  Save,
  Star,
  Calendar,
  Car,
  DollarSign,
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
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1 sm:text-3xl">
                My Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="w-full sm:w-auto"
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

          {/* Profile Picture */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                    disabled={!isEditing}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-lg">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This will be visible to drivers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="space-y-2 sm:col-span-2">
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

          {/* Account Statistics */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Car className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalRides}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Rides
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-lg font-bold">{stats.memberSince}</div>
                  <div className="text-sm text-muted-foreground">
                    Member Since
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Camera,
  Edit,
  Save,
  Lock,
  Car,
  Star,
  Shield,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  licensePlate?: string;
  vehicleType?: string;
  adminLevel?: string;
  department?: string;
  rating?: number;
  totalRides?: number;
};

type UserType = "rider" | "admin" | "driver";

interface ProfilePageProps {
  userType: UserType;
  initialData: UserData;
}

export default function Profile({ userType, initialData }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(initialData);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Password changed successfully");
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  // Get user type badge details
  const getUserBadge = () => {
    switch (userType) {
      case "admin":
        return {
          text: "Admin",
          variant: "default" as const,
          icon: <Shield className="w-3 h-3 mr-1" />,
        };
      case "driver":
        return {
          text: "Driver",
          variant: "secondary" as const,
          icon: <Car className="w-3 h-3 mr-1" />,
        };
      case "rider":
        return {
          text: "Rider",
          variant: "outline" as const,
          icon: <User className="w-3 h-3 mr-1" />,
        };
    }
  };

  const userBadge = getUserBadge();

  const renderUserSpecificInfo = () => {
    switch (userType) {
      case "driver":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Input
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </>
        );
      case "admin":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="adminLevel">Admin Level</Label>
              <Input
                id="adminLevel"
                name="adminLevel"
                value={formData.adminLevel || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </>
        );
    }
  };

  // Render user-specific stats
  const renderUserStats = () => {
    switch (userType) {
      case "driver":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Star className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">
                {formData.rating || "4.8"}
              </div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">
                {formData.totalRides || "142"}
              </div>
              <div className="text-xs text-muted-foreground">Trips</div>
            </div>
          </div>
        );
      case "rider":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Car className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">
                {formData.totalRides || "47"}
              </div>
              <div className="text-xs text-muted-foreground">Rides</div>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">
                {formData.adminLevel || "Level 2"}
              </div>
              <div className="text-xs text-muted-foreground">Access Level</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <User className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">24</div>
              <div className="text-xs text-muted-foreground">Users Managed</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your account</p>
            </div>
            <div className="flex gap-2">
              <Dialog
                open={isPasswordModalOpen}
                onOpenChange={setIsPasswordModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleChangePassword}
                    size="sm"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and a new password to update
                      your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <Input
                        id="current"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input
                        id="new"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsPasswordModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handlePasswordSubmit}>
                      Change Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
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
                <div className="text-center sm:text-left flex-1">
                  <h2 className="font-semibold text-lg">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.email}
                  </p>
                  <div className="mt-2">
                    <Badge variant={userBadge.variant}>
                      {userBadge.icon}
                      {userBadge.text}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
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
                {/* User-specific fields */}
                {renderUserSpecificInfo()}
              </div>
            </CardContent>
          </Card>

          {/* User-specific Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {userType === "admin"
                  ? "Admin Information"
                  : userType === "driver"
                  ? "Driver Statistics"
                  : "Rider Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderUserStats()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

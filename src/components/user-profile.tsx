import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  User,
  Camera,
  Edit,
  Save,
  Lock,
  Shield,
  Car,
  Phone,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateMutation } from "@/redux/features/user/user.api";

const profileSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z\s]+$/),
  phone: z.string().regex(/^(?:\+8801\d{9}|01\d{9})$/),
  dateOfBirth: z.date().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Z])/, "1 uppercase")
      .regex(/^(?=.*[!@#$%^&*])/, "1 special")
      .regex(/^(?=.*\d)/, "1 number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { data: user } = useUserInfoQuery(undefined);
  const [update] = useUpdateMutation();
  const userInfo = user?.data;
  const userType = userInfo?.role?.toLowerCase();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name || "",
        phone: userInfo.phone?.replace(/^\+88/, "") || "",
      });
    }
  }, [userInfo, form]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const res = await update(data).unwrap();
      if (res.success) toast.success("Profile updated successfully");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile");
    }
    setIsEditing(false);
  };

  const handlePasswordSubmit: SubmitHandler<PasswordFormData> = async (
    data
  ) => {
    try {
      setPasswordError(null);
      const res = await update(data).unwrap();
      if (res.success) {
        toast.success("Password updated successfully");
        setIsPasswordModalOpen(false);
        passwordForm.reset();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message) setPasswordError(error.data.message);
      else if (error?.data?.error) setPasswordError(error.data.error);
      else setPasswordError("Failed to update password");
      toast.error("Failed to update password");
    }
  };

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
      default:
        return {
          text: "Rider",
          variant: "outline" as const,
          icon: <User className="w-3 h-3 mr-1" />,
        };
    }
  };

  const userBadge = getUserBadge();

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
              {/* Password Modal */}
              <Dialog
                open={isPasswordModalOpen}
                onOpenChange={(open) => {
                  setIsPasswordModalOpen(open);
                  if (!open) {
                    passwordForm.reset();
                    setPasswordError(null);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4 mr-2" /> Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current and new password.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                      className="space-y-4 py-4"
                    >
                      {[
                        "currentPassword",
                        "newPassword",
                        "confirmPassword",
                      ].map((fieldName, idx) => (
                        <FormField
                          key={idx}
                          control={passwordForm.control}
                          name={fieldName as keyof PasswordFormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {fieldName === "currentPassword"
                                  ? "Current Password"
                                  : fieldName === "newPassword"
                                  ? "New Password"
                                  : "Confirm Password"}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={
                                      (fieldName === "currentPassword" &&
                                        showCurrentPassword) ||
                                      (fieldName === "newPassword" &&
                                        showNewPassword) ||
                                      (fieldName === "confirmPassword" &&
                                        showConfirmPassword)
                                        ? "text"
                                        : "password"
                                    }
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2"
                                    onClick={() => {
                                      if (fieldName === "currentPassword")
                                        setShowCurrentPassword(
                                          !showCurrentPassword
                                        );
                                      if (fieldName === "newPassword")
                                        setShowNewPassword(!showNewPassword);
                                      if (fieldName === "confirmPassword")
                                        setShowConfirmPassword(
                                          !showConfirmPassword
                                        );
                                    }}
                                  >
                                    {(fieldName === "currentPassword" &&
                                      showCurrentPassword) ||
                                    (fieldName === "newPassword" &&
                                      showNewPassword) ||
                                    (fieldName === "confirmPassword" &&
                                      showConfirmPassword) ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}

                      {passwordError && (
                        <div className="text-sm text-red-500 mt-2 bg-red-50 p-3 rounded-md">
                          {passwordError}
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsPasswordModalOpen(false);
                            setPasswordError(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Change</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() =>
                  isEditing ? form.handleSubmit(onSubmit)() : setIsEditing(true)
                }
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
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
                  <h2 className="text-xl font-semibold">
                    {form.watch("name")}
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start text-muted-foreground gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{userInfo?.email}</span>
                  </div>
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

          {/* Personal Info Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter full name"
                              className="pl-10"
                              disabled={!isEditing}
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                              +88
                            </span>
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
                              className="pl-16"
                              disabled={!isEditing}
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/^\+88\s*/, "")
                                )
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
} from "lucide-react";
import Logo from "@/components/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const registerSchema = z
  .object({
    name: z
      .string({ error: "Full name must be string" })
      .min(3, { message: "Full name must be at least 3 characters long." })
      .max(50, { message: "Full name cannot exceed 50 characters." })
      .regex(/^[A-Za-z\s]+$/, {
        message: "Full name can only contain letters and spaces",
      }),
    email: z
      .string({ error: "Email must be string" })
      .email({ message: "Invalid email address format." })
      .min(5, { message: "Email must be at least 5 characters long." })
      .max(100, { message: "Email cannot exceed 100 characters." }),
    phone: z
      .string({ error: "Phone Number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX ",
      }),
    password: z
      .string({ error: "Password must be string" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
    agreeToMarketing: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const savedData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("registrationForm") || "{}")
      : {};

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: savedData.name || "",
      email: savedData.email || "",
      phone: savedData.phone || "",
      password: savedData.password || "",
      confirmPassword: savedData.confirmPassword || "",
      agreeToTerms: savedData.agreeToTerms || false,
      agreeToMarketing: savedData.agreeToMarketing || false,
    },
  });

  const watchedValues = useWatch<RegisterFormData>({
    control: form.control,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("registrationForm", JSON.stringify(watchedValues));
    }
  }, [watchedValues]);

  const [register] = useRegisterMutation();
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    setError("");

    const userInfo = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      agreeToTerms: data.agreeToTerms,
      agreeToMarketing: data.agreeToMarketing,
    };

    try {
      const response = await register(userInfo).unwrap();
      if (!response.data?.isVerified) {
        navigate("/otp-verify", { state: { email: userInfo.email } });
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem("registrationForm");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorData = err.data || err.response?.data || {};
      const errorCode = errorData.code || "UNKNOWN_ERROR";
      const message = "Registration failed. Please try again.";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          setError(
            "Email is already registered. Please login or use another email."
          );
          break;
        case "VALIDATION_ERROR":
          setError("Please check your input and try again.");
          break;
        default:
          setError(message);
          break;
      }

      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="relative w-10 h-10">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Logo />
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">Ridenest</span>
            </Link>
            <h2 className="text-3xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join thousands of travelers exploring the world with us
            </p>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Fill in the details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {error}
                    </div>
                  )}

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
                              placeholder="John"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10"
                              {...field}
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
                    render={({ field, fieldState }) => (
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
                              placeholder="01XXXXXXXXX"
                              className="pl-16"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /^\+88\s*/,
                                  ""
                                );
                                field.onChange(value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-1">
                          Must be at least 8 characters with 1 uppercase, 1
                          number, and 1 special character
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field, fieldState }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="leading-none">
                            <div className="text-sm font-medium">
                              I agree to the
                              <Link
                                to="/terms"
                                className="text-primary hover:underline"
                              >
                                {" "}
                                Terms of Service{" "}
                              </Link>
                              and
                              <Link
                                to="/privacy"
                                className="text-primary hover:underline"
                              >
                                {" "}
                                Privacy Policy
                              </Link>
                            </div>
                            <FormMessage>
                              {fieldState.error?.message}
                            </FormMessage>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToMarketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I would like to receive travel deals and updates
                              (optional)
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Already have an account?
                  </span>
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:underline ml-1"
                  >
                    Sign in
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full mt-6"
                    type="button"
                    onClick={() => {
                      window.location.href = `${
                        import.meta.env.VITE_BASE_URL
                      }/auth/google`;
                    }}
                  >
                    <FcGoogle />
                    Signup with Google
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

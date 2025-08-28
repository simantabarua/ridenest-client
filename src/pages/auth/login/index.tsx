import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "@/components/logo";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import Loading from "@/components/loading";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useUserInfoQuery(undefined);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setError("");
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await login(userInfo).unwrap();
      if (response.success) {
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorData = err?.data || err?.error || err;
      const errorCode = errorData?.code || "UNKNOWN_ERROR";
      const message = errorData?.message || "Login failed. Please try again.";
      switch (errorCode) {
        case "AUTH_INVALID_CREDENTIALS":
          setError("Email or password does not match");
          break;
        case "AUTH_USER_NOT_FOUND":
          setError("User not found. Please register first.");
          break;
        case "AUTH_USER_NOT_VERIFIED":
          navigate("/otp-verify", { state: { email: userInfo.email } });
          break;
        default:
          setError(message);
          break;
      }
    }
  };

  if (isUserLoading || isLoginLoading) {
    return <Loading fullScreen={true} variant="bars" />;
  }

  if (user) {
    return <Loading fullScreen={true} variant="bars" />;
  }

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
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue your journey
            </p>
          </div>
          {/* Login Form */}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                              type="email"
                              placeholder="Enter your email"
                              className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter your email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-primary hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="w-full pl-10 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
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
                        <FormDescription className="sr-only">
                          Enter your password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Remember me
                        </FormDescription>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Remember me</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Don't have an account?
                  </span>
                  <Link
                    to="/register"
                    className="text-sm text-primary hover:underline ml-1"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Social Login */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => {
                    window.location.href = `${
                      import.meta.env.VITE_BASE_URL
                    }/auth/google`;
                  }}
                >
                  <FcGoogle />
                  Continue with Google
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Help Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Having trouble signing in?
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/guidelines" className="text-primary hover:underline">
                Help Center
              </Link>
              <Link to="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

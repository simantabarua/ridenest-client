import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Mail,
  Edit,
} from "lucide-react";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import Logo from "@/components/logo";

export default function OTPVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [showConfirmCard, setShowConfirmCard] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [sendOpt] = useSendOtpMutation();
  const [verifyOpt] = useVerifyOtpMutation();

  useEffect(() => {
    const email = location.state?.email;
    if (email) {
      setEmail(email);
      setShowConfirmCard(true);
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.key, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setEmailLoading(false);
      return;
    }

    setShowConfirmCard(true);
    setEmailLoading(false);
  };

  const handleConfirmEmail = async () => {
    setEmailLoading(true);
    setError("");

    try {
      await sendOpt({ email: email }).unwrap();
      setTimeLeft(120);
      setShowConfirmCard(false);
      setShowOtpCard(true);
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleEditEmail = () => {
    setShowConfirmCard(false);
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      setIsLoading(false);
      return;
    }
    try {
      const res = await verifyOpt({ email, otp: otpValue }).unwrap();
      if (res.success) {
        setIsVerified(true);
      } else {
        setError(res.message || "Verification failed");
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await sendOpt({ email: email }).unwrap();
      setTimeLeft(120);
      setOtp(["", "", "", "", "", ""]);
      const firstInput = document.getElementById("otp-0");
      if (firstInput) (firstInput as HTMLInputElement).focus();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOtpCard(false);
    setShowConfirmCard(true);
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-md w-full">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Verification Successful!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your email has been verified successfully.
                </p>
                <div className="space-y-3">
                  <Button className="w-1/2" asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
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
            <h2 className="text-3xl font-bold text-gray-300">
              {showOtpCard
                ? "Enter verification code"
                : showConfirmCard
                ? "Confirm your email"
                : "Verify your email"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {showOtpCard
                ? "We've sent a 6-digit code to your email"
                : showConfirmCard
                ? "Please confirm your email address"
                : "Enter your email to receive a verification code"}
            </p>
          </div>

          {/* Email Input Card */}
          {!showConfirmCard && !showOtpCard && (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Verification
                </CardTitle>
                <CardDescription>
                  We'll send a verification code to your email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={emailLoading}
                  >
                    {emailLoading ? "Processing..." : "Continue"}
                  </Button>
                </form>
                <div className="mt-6">
                  <Separator className="my-4" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Confirmation Card */}
          {showConfirmCard && !showOtpCard && (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Confirm Your Email
                </CardTitle>
                <CardDescription>
                  Is this the correct email address? We'll send the verification
                  code here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center mb-4">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}
                <div className="flex items-center justify-center gap-3 bg-muted/50 p-3 rounded-lg mb-6">
                  <p className="flex-1 font-medium">{email}</p>
                  <Button
                    variant="outline"
                    onClick={handleEditEmail}
                    disabled={emailLoading}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={handleConfirmEmail}
                    className="w-full"
                    disabled={emailLoading}
                  >
                    {emailLoading ? "Sending..." : "Confirm & Send Code"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* OTP Verification Card */}
          {showOtpCard && (
            <>
              {/* Back to Email Input */}
              <div className="text-center">
                <button
                  onClick={handleBackToEmail}
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to email confirmation
                </button>
              </div>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Verify Your Email
                  </CardTitle>
                  <CardDescription>
                    Enter the 6-digit verification code sent to your email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOtp} className="space-y-6">
                    {error && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {error}
                      </div>
                    )}
                    {/* OTP Input */}
                    <div className="space-y-2">
                      <Label>Verification Code</Label>
                      <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-lg font-semibold"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Timer */}
                    <div className="text-center">
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Code expires in: {formatTime(timeLeft)}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || otp.join("").length !== 6}
                    >
                      {isLoading ? "Verifying..." : "Verify Code"}
                    </Button>
                  </form>
                  <div className="mt-6">
                    <Separator className="my-4" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Didn't receive the code?
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResend}
                        disabled={resendLoading || timeLeft > 60}
                      >
                        {resendLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : timeLeft > 60 ? (
                          <>Resend enabled after {timeLeft - 0}s</>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Resend Code
                          </>
                        )}
                      </Button>

                      {timeLeft <= 0 && (
                        <p className="text-xs text-red-600 mt-2">
                          Code expired. Please request a new one.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

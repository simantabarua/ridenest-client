import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MessageCircle, User, Clock, Loader2, CreditCard, Wallet } from "lucide-react";
import { useParams } from "react-router";
import { useGetRideByIdQuery } from "@/redux/features/ride/ride.api";
import { formatDate, formatTime } from "@/utils/dateTimeFormater";
import Loading from "@/components/loading";
import TimeLine from "@/components/timeline";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/payment/StripeCheckoutForm";
import { useCreatePaymentIntentMutation, useConfirmPaymentMutation } from "@/redux/features/payment/payment.api";
import { toast } from "sonner";
import { useSocket } from "@/providers/SocketProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export default function RideDetailsPage() {
  const { rideId } = useParams<{ rideId: string }>();
  const { data: ride, isLoading: isRideLoading, refetch } = useGetRideByIdQuery(rideId);
  const { data: userInfo, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const [createPaymentIntent, { isLoading: isInitializingPayment }] = useCreatePaymentIntentMutation();
  const [confirmPaymentApi, { isLoading: isConfirmingWalletPayment }] = useConfirmPaymentMutation();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [showStripeForm, setShowStripeForm] = useState<boolean>(false);
  const { socket } = useSocket();

  useEffect(() => {
    const fareAmount = ride?.data?.totalFare || ride?.data?.fare || 0;
    if (walletBalance < fareAmount) {
      setShowStripeForm(true);
    } else {
      setShowStripeForm(false);
    }
  }, [walletBalance, ride]);

  useEffect(() => {
    if (userInfo?.data?._id) {
      const balanceKey = `ridenest_balance_${userInfo.data._id}`;
      const savedBalance = localStorage.getItem(balanceKey);
      if (savedBalance !== null) {
        setWalletBalance(parseFloat(savedBalance));
      } else {
        setWalletBalance(0); 
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (!socket || !rideId) return;

    socket.emit("join_ride", rideId);

    const handleStateChange = (updatedRide: any) => {
      if (updatedRide?._id === rideId) {
        refetch();
      }
    };

    socket.on("ride:state_change", handleStateChange);

    return () => {
      socket.off("ride:state_change", handleStateChange);
    };
  }, [socket, rideId, refetch]);
  
  const rideDetails = ride?.data;
  const userRole = userInfo?.data?.role;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "arrived":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "in_transit":
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isRideLoading || isUserLoading) return <Loading fullScreen variant="bars" />;

  if (!rideDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Ride Found</h1>
          <p className="text-muted-foreground">
            We couldn't find a ride with that ID
          </p>
        </div>
      </div>
    );
  }

  const {
    timestamps,
    _id,
    pickupLocation,
    destinationLocation,
    estimatedDistance,
    fare,
    driver,
    rider,
    totalFare,
    status,
    payment,
    paymentMethod,
  } = rideDetails;

  const handleInitializePayment = async () => {
    try {
      const response = await createPaymentIntent({ rideId: _id }).unwrap();
      if (response.success && response.data?.clientSecret) {
        setClientSecret(response.data.clientSecret);
      } else {
        toast.error("Failed to initialize payment gateway");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || "Could not start payment process");
    }
  };

  const handlePaymentSuccess = () => {
    setClientSecret("");
    refetch();
  };

  const handleWalletPayment = async () => {
    if (!userInfo?.data?._id) return;
    try {
      const fareAmount = totalFare || fare;
      if (walletBalance < fareAmount) {
        toast.error("Insufficient wallet balance!");
        return;
      }
      
      const newBalance = walletBalance - fareAmount;
      const balanceKey = `ridenest_balance_${userInfo.data._id}`;
      const extraTxKey = `ridenest_extra_tx_${userInfo.data._id}`;
      
      localStorage.setItem(balanceKey, newBalance.toString());
      setWalletBalance(newBalance);
      
      const paymentTx = {
        id: _id,
        type: "payment",
        amount: fareAmount,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description: `Payment for Ride to ${destinationLocation.split(",")[0]}`,
        status: "completed",
        method: "card",
      };
      
      const extraTxs = JSON.parse(localStorage.getItem(extraTxKey) || "[]");
      localStorage.setItem(extraTxKey, JSON.stringify([paymentTx, ...extraTxs]));

      const walletTransactionId = `wallet_${Math.random().toString(36).substring(4)}`;
      const confirmResult = await confirmPaymentApi({
        rideId: _id,
        transactionId: walletTransactionId,
      }).unwrap();

      if (confirmResult.success) {
        toast.success("Payment completed successfully from wallet balance!");
        refetch();
      } else {
        toast.error("Failed to complete ride payment.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || "Error processing wallet payment");
    }
  };

  const isDriverOrAdmin = userRole === "DRIVER" || userRole === "ADMIN";

  return (
    <div className="min-h-screen py-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-medium tracking-tight text-foreground">Ride Details</h1>
            <p className="text-muted-foreground text-lg">
              {isDriverOrAdmin ? "Detailed overview of the trip and rider" : "Detailed overview of your journey"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Ride Status Card */}
            <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="border-b border-border/50 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Trip #{_id.slice(-8).toUpperCase()}</CardTitle>
                    <CardDescription className="font-medium">
                      {formatDate(rideDetails.createdAt)} at {formatTime(rideDetails.createdAt)}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(status)} px-3 py-1 rounded-full font-bold uppercase tracking-wider border`}>
                    {status?.replace("_", " ") || "UNKNOWN"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {/* Route Visual */}
                  <div className="relative space-y-4 pl-8">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-muted-foreground/20 to-rose-500" />
                    
                    <div className="relative">
                      <div className="absolute -left-[26px] top-1 h-4 w-4 rounded-full border-4 border-background bg-emerald-500 shadow-sm" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Pickup Point</div>
                        <div className="text-lg font-semibold leading-snug">{pickupLocation}</div>
                        {timestamps?.requestedAt && (
                          <div className="text-xs text-muted-foreground font-medium">
                            Requested at: {new Date(timestamps.requestedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[26px] top-1 h-4 w-4 rounded-full border-4 border-background bg-rose-500 shadow-sm" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Destination</div>
                        <div className="text-lg font-semibold leading-snug">{destinationLocation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Info Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Distance</div>
                      <div className="text-2xl font-medium text-primary">{estimatedDistance} km</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Status</div>
                      <div className="text-lg font-bold text-foreground capitalize">{status?.replace("_", " ") || "N/A"}</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Base Fare</div>
                      <div className="text-2xl font-medium text-primary">৳{fare}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Trip Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <TimeLine items={timestamps || {}} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {/* Person Information (Driver or Rider) */}
            <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="text-lg font-bold">
                  {isDriverOrAdmin ? "Rider Information" : "Your Driver"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                    {isDriverOrAdmin && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">
                      {isDriverOrAdmin ? (rider?.name ?? "N/A") : (driver?.name ?? "No Driver Assigned")}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold">
                        {isDriverOrAdmin ? "4.9 (Rider Rating)" : (driver?.rating ?? "N/A")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {isDriverOrAdmin ? (rider?.email ?? "N/A") : (driver?.license ? `License: ${driver.license}` : "Contact for details")}
                    </p>
                  </div>

                  <div className="flex w-full gap-3 pt-2">
                    <Button className="flex-1 font-bold shadow-lg shadow-primary/20">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="text-lg font-bold">Pricing Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Base Fare</span>
                  <span>৳{fare}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Distance Charge</span>
                  <span>৳0.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Booking Fee</span>
                  <span>৳0.00</span>
                </div>
                <div className="pt-4 border-t border-border/50 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Total Amount</div>
                    <div className="text-3xl font-medium text-primary leading-none">৳{totalFare || fare}</div>
                  </div>
                  <div>
                    {payment?.paymentStatus === "complete" ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-bold uppercase border">
                        Paid
                      </Badge>
                    ) : payment?.paymentStatus === "failed" ? (
                      <Badge className="bg-rose-100 text-rose-800 border-rose-200 font-bold uppercase border">
                        Failed
                      </Badge>
                    ) : (payment?.paymentMethod || paymentMethod || "cash") === "card" ? (
                      <Badge className="bg-rose-100 text-rose-800 border-rose-200 font-bold uppercase border animate-pulse">
                        Unpaid
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-bold uppercase border">
                        Cash
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section (Stripe Gateway / Nest Wallet) */}
            {(payment?.paymentMethod || paymentMethod || "cash") === "card" && 
              payment?.paymentStatus !== "complete" && 
              (status?.toLowerCase() === "arrived" || status?.toLowerCase() === "completed") && 
              !isDriverOrAdmin && (
              <Card className="border-primary/20 bg-gradient-to-br from-card/60 via-card/40 to-background/50 backdrop-blur-md shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-300">
                <CardHeader className="bg-muted/10 border-b border-border/50">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Complete Ride Payment
                  </CardTitle>
                  <CardDescription>
                    Trip payment via Nest Wallet. Sufficient balance will be deducted from your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Current Wallet Balance Card */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/[0.03] border border-primary/10 shadow-inner">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nest Wallet Balance
                        </div>
                        <div className="text-2xl font-bold tracking-tight text-foreground">
                          ৳{walletBalance.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Fare Amount
                      </div>
                      <div className="text-lg font-bold text-primary">
                        ৳{(totalFare || fare || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Wallet Check and Options */}
                  {!showStripeForm ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        Sufficient wallet balance available for checkout.
                      </div>
                      <Button
                        onClick={handleWalletPayment}
                        disabled={isConfirmingWalletPayment}
                        className="w-full font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.99] h-11 flex items-center justify-center gap-2"
                      >
                        {isConfirmingWalletPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deducting & Confirming...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4" />
                            Pay ৳{(totalFare || fare || 0).toFixed(2)} with Wallet Balance
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center">
                        <button
                          onClick={() => setShowStripeForm(true)}
                          className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
                        >
                          Or pay with credit/debit card instead
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {walletBalance < (totalFare || fare || 0) && (
                        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-medium">
                          <p className="font-semibold mb-0.5">Insufficient Wallet Balance</p>
                          <p className="text-xs opacity-90">
                            Please use your card below to load the required amount (৳{((totalFare || fare || 0) - walletBalance).toFixed(2)}) into your Nest Wallet and complete payment.
                          </p>
                        </div>
                      )}

                      {!clientSecret ? (
                        <div className="space-y-3">
                          <Button
                            onClick={handleInitializePayment}
                            disabled={isInitializingPayment}
                            className="w-full font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.99] h-11 flex items-center justify-center gap-2"
                          >
                            {isInitializingPayment ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Initializing Gateway...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-4 h-4" />
                                Add Card & Pay ৳{(totalFare || fare || 0).toFixed(2)}
                              </>
                            )}
                          </Button>
                          
                          {walletBalance >= (totalFare || fare || 0) && (
                            <div className="text-center">
                              <button
                                onClick={() => setShowStripeForm(false)}
                                className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
                              >
                                Back to Pay with Wallet Balance
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="text-sm font-semibold text-muted-foreground">
                            Enter Card Details to Complete Transaction:
                          </div>
                          <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripeCheckoutForm
                              clientSecret={clientSecret}
                              rideId={_id}
                              amount={totalFare || fare || 0}
                              userId={userInfo?.data?._id || ""}
                              destinationLocation={destinationLocation}
                              onSuccess={handlePaymentSuccess}
                              onCancel={() => setClientSecret("")}
                            />
                          </Elements>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Paid Card Details */}
            {payment?.paymentStatus === "complete" && payment?.cardInfo && (
              <Card className="border-emerald-500/20 bg-emerald-500/[0.02] backdrop-blur-md shadow-xl">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-900/30">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    Payment Completed
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Paid with {payment.cardInfo.brand.toUpperCase()} ending in {payment.cardInfo.last4}
                  </div>
                  {payment.transactionId && (
                    <div className="text-xs text-muted-foreground font-mono truncate">
                      Transaction ID: {payment.transactionId}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

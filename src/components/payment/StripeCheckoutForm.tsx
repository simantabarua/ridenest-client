import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useConfirmPaymentMutation } from "@/redux/features/payment/payment.api";
import { Loader2 } from "lucide-react";

interface StripeCheckoutFormProps {
  clientSecret: string;
  rideId: string;
  amount: number;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function StripeCheckoutForm({
  clientSecret,
  rideId,
  amount,
  onSuccess,
  onCancel,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmPaymentApi] = useConfirmPaymentMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [themeColor, setThemeColor] = useState("#0f172a");
  const [placeholderColor, setPlaceholderColor] = useState("#94a3b8");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeColor(isDark ? "#f8fafc" : "#0f172a");
    setPlaceholderColor(isDark ? "#64748b" : "#94a3b8");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error("[Stripe Error]", error);
        toast.error(error.message || "Stripe payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const confirmResult = await confirmPaymentApi({
          rideId,
          transactionId: paymentIntent.id,
        }).unwrap();

        if (confirmResult.success) {
          toast.success("Payment successful!");
          onSuccess();
        } else {
          toast.error("Payment verified but updated status is invalid.");
        }
      } else {
        toast.error(`Payment status: ${paymentIntent?.status || "unknown"}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || err.message || "An unexpected error occurred during confirmation.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-muted-foreground">Card Details</label>
        <div className="p-4 rounded-lg border border-border bg-muted/20 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-200">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: themeColor,
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": {
                    color: placeholderColor,
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={!stripe || isProcessing} className="min-w-[120px]">
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing
            </>
          ) : (
            `Pay ৳${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  PlusCircle,
  Building,
  CreditCard,
  History,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IRide } from "@/redux/features/ride/ride.types";
import { toast } from "sonner";

interface ITransaction {
  id: string;
  type: "deposit" | "payment" | "payout";
  amount: number;
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
  method: string;
}

export default function WalletPage() {
  const { data: userData } = useUserInfoQuery(undefined);
  const user = userData?.data;
  const isDriver = user?.role === "DRIVER";

  const { data: ridesData } = useGetMyRidesQuery(undefined);
  const rides: IRide[] = ridesData?.data || [];

  // Persistent Balance States
  const [balance, setBalance] = useState<number>(0);
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  // Dialog Control
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Form Fields
  const [depositAmount, setDepositAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("bkash");
  const [payoutAccount, setPayoutAccount] = useState("");

  // Process States
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Initializing LocalStorage Balance
  useEffect(() => {
    if (!user) return;
    const balanceKey = `ridenest_balance_${user._id}`;
    const cashKey = `ridenest_cash_balance_${user._id}`;
    
    const savedBalance = localStorage.getItem(balanceKey);
    const savedCash = localStorage.getItem(cashKey);

    if (savedBalance !== null) {
      setBalance(parseFloat(savedBalance));
    } else {
      const defaultBal = isDriver ? 8450 : 1250;
      setBalance(defaultBal);
      localStorage.setItem(balanceKey, defaultBal.toString());
    }

    if (savedCash !== null) {
      setCashBalance(parseFloat(savedCash));
    } else {
      const defaultCash = isDriver ? 3500 : 500;
      setCashBalance(defaultCash);
      localStorage.setItem(cashKey, defaultCash.toString());
    }
  }, [user, isDriver]);

  // Syncing database rides history to wallet transaction list
  useEffect(() => {
    if (!user) return;

    // Load custom deposits/payouts from localStorage to prevent wiping on refresh
    const extraTxKey = `ridenest_extra_tx_${user._id}`;
    const extraTxs: ITransaction[] = JSON.parse(localStorage.getItem(extraTxKey) || "[]");

    // Map rides dynamically to transaction objects
    const rideTxs: ITransaction[] = rides.map((ride) => {
      const rideFare = ride.totalFare || ride.fare || 0;
      const isCompleted = ride.status === "completed";
      
      return {
        id: ride._id,
        type: isDriver ? "payout" : "payment",
        amount: isDriver ? rideFare * 0.8 : rideFare, // Driver receives 80% payout
        date: new Date(ride.createdAt || "").toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description: isDriver 
          ? `Fare earnings for Trip to ${ride.destinationLocation.split(",")[0]}`
          : `Payment for Ride to ${ride.destinationLocation.split(",")[0]}`,
        status: isCompleted ? "completed" : ride.status === "cancelled" ? "failed" : "pending",
        method: ride.paymentMethod || "cash",
      };
    });

    // Combine database rides with manual deposits
    const combined = [...extraTxs, ...rideTxs].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setTransactions(combined);
  }, [rides, user, isDriver]);

  // Handle deposit simulation
  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("Please enter a valid deposit amount.");
      return;
    }
    if (cardNumber.length < 16) {
      toast.error("Please enter a valid credit/debit card number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const amount = parseFloat(depositAmount);
      const newBalance = balance + amount;
      setBalance(newBalance);

      // Save new balance to localStorage
      const balanceKey = `ridenest_balance_${user?._id}`;
      localStorage.setItem(balanceKey, newBalance.toString());

      // Save new transaction record to localStorage list
      const extraTxKey = `ridenest_extra_tx_${user?._id}`;
      const extraTxs: ITransaction[] = JSON.parse(localStorage.getItem(extraTxKey) || "[]");
      const newTx: ITransaction = {
        id: Math.random().toString(36).substring(4),
        type: "deposit",
        amount: amount,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description: `Stripe Wallet Load (Card ending in ${cardNumber.slice(-4)})`,
        status: "completed",
        method: "card",
      };

      const updatedExtra = [newTx, ...extraTxs];
      localStorage.setItem(extraTxKey, JSON.stringify(updatedExtra));

      // Append to local state list immediately
      setTransactions((prev) => [newTx, ...prev]);

      toast.success(`৳${amount} deposited to your wallet successfully!`);
      setShowDepositModal(false);
      // Clean form fields
      setDepositAmount("");
      setCardNumber("");
      setCardHolder("");
      setExpiry("");
      setCvv("");
    }, 2000);
  };

  // Handle withdraw simulation (Driver cash out / Rider cash load)
  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid payout amount.");
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (amount > balance) {
      toast.error("Insufficient wallet balance.");
      return;
    }
    if (!payoutAccount) {
      toast.error("Please enter a valid account number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newBalance = balance - amount;
      setBalance(newBalance);

      // Save new balance to localStorage
      const balanceKey = `ridenest_balance_${user?._id}`;
      localStorage.setItem(balanceKey, newBalance.toString());

      // Save transaction record
      const extraTxKey = `ridenest_extra_tx_${user?._id}`;
      const extraTxs: ITransaction[] = JSON.parse(localStorage.getItem(extraTxKey) || "[]");
      const newTx: ITransaction = {
        id: Math.random().toString(36).substring(4),
        type: isDriver ? "payout" : "payment",
        amount: amount,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description: isDriver 
          ? `Earnings Payout to ${payoutMethod.toUpperCase()}`
          : `Bank cash-out withdrawal`,
        status: "completed",
        method: payoutMethod,
      };

      const updatedExtra = [newTx, ...extraTxs];
      localStorage.setItem(extraTxKey, JSON.stringify(updatedExtra));

      // Append to local state list immediately
      setTransactions((prev) => [newTx, ...prev]);

      toast.success(`৳${amount} payout processed successfully!`);
      setShowWithdrawModal(false);
      setWithdrawAmount("");
      setPayoutAccount("");
    }, 2200);
  };

  // Card Brand Recognizer
  const getCardBrand = (num: string) => {
    if (num.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(num)) return "Mastercard";
    if (num.startsWith("3")) return "Amex";
    return "Card";
  };

  return (
    <div className="pb-10 max-w-6xl mx-auto px-4">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-foreground">In-App Nest Wallet</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage digital card balances, cash earnings, and instant payment payouts.
        </p>
      </div>

      {/* Grid of Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Wallet Balance Card */}
        <Card className="border border-border relative overflow-hidden bg-primary text-primary-foreground shadow-lg shadow-primary/10">
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/5 rounded-full" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary-foreground/85">Nest Wallet Balance</span>
              <Wallet className="w-5 h-5 opacity-90" />
            </div>
            <h2 className="text-3xl font-black mb-1">৳{balance.toLocaleString()}</h2>
            <p className="text-[10px] opacity-80">Default payout gateway active.</p>

            <div className="flex items-center gap-2 mt-5">
              {!isDriver ? (
                <Button
                  onClick={() => setShowDepositModal(true)}
                  className="bg-white text-primary hover:bg-white/90 font-bold text-xs h-9 w-full shadow-md"
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                  Add Money
                </Button>
              ) : (
                <Button
                  onClick={() => setShowWithdrawModal(true)}
                  className="bg-white text-primary hover:bg-white/90 font-bold text-xs h-9 w-full shadow-md"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
                  Cash Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cash Balance Card */}
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">In-Hand Cash Balance</span>
              <ArrowDownLeft className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-foreground">৳{cashBalance.toLocaleString()}</h2>
            <p className="text-[10px] text-muted-foreground">Collected from physical cash-ride payments.</p>

            <Button
              variant="outline"
              disabled
              className="mt-5 w-full font-bold text-xs h-9"
            >
              Automatic Adjustment
            </Button>
          </CardContent>
        </Card>

        {/* Dynamic Analytics Visualizer Chart */}
        <Card className="border border-border md:col-span-1">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Activity Summary</span>
                <h4 className="text-sm font-extrabold text-foreground mt-0.5">Weekly Volume</h4>
              </div>
              <span className="text-[10px] text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-full">Active</span>
            </div>

            {/* Custom CSS Bar Graph */}
            <div className="flex items-end justify-between h-20 gap-2.5 pt-4">
              {[35, 60, 45, 80, 55, 95, 70].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    style={{ height: `${val}%` }} 
                    className="w-full bg-primary/20 hover:bg-primary rounded-t transition-all duration-300"
                  />
                  <span className="text-[8px] text-muted-foreground mt-1.5">
                    {["M", "T", "W", "T", "F", "S", "S"][idx]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Money Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border border-border bg-background shadow-2xl rounded-2xl animate-scale-up overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-5 pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-white" />
                <CardTitle className="text-base font-extrabold tracking-wide uppercase text-white">Deposit Funds via Stripe</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {loading ? (
                <div className="py-10 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm font-extrabold text-foreground">Processing secure transaction...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Amount (BDT)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 1000"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="font-bold h-11"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Cardholder Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="font-medium h-11"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">
                      Card Number ({getCardBrand(cardNumber)})
                    </label>
                    <Input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                      className="font-mono h-11"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground">Expiry (MM/YY)</label>
                      <Input
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="font-medium h-11 text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground">CVV</label>
                      <Input
                        type="password"
                        placeholder="***"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        className="font-medium h-11 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowDepositModal(false)}
                      className="flex-1 font-bold h-11"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeposit}
                      className="flex-1 font-bold h-11"
                      disabled={!depositAmount || cardNumber.length < 16}
                    >
                      Confirm Deposit
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payout Cash Out Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border border-border bg-background shadow-2xl rounded-2xl animate-scale-up overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-5 pb-4">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-white" />
                <CardTitle className="text-base font-extrabold tracking-wide uppercase text-white">Instant Wallet Payout</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {loading ? (
                <div className="py-10 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm font-extrabold text-foreground">Initiating secure mobile bank transfer...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Payout Method</label>
                    <select
                      value={payoutMethod}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="w-full bg-background border border-input h-11 rounded-md px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="bkash">bKash (Mobile Account)</option>
                      <option value="nagad">Nagad (Mobile Account)</option>
                      <option value="dbbl">DBBL Nexus Bank</option>
                      <option value="city">City Bank PLC</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Account / Wallet Number</label>
                    <Input
                      type="text"
                      placeholder="e.g. 017XXXXXXXX"
                      value={payoutAccount}
                      onChange={(e) => setPayoutAccount(e.target.value)}
                      className="font-bold h-11"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Amount (BDT)</label>
                    <Input
                      type="number"
                      placeholder={`Max ৳${balance}`}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="font-bold h-11"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowWithdrawModal(false)}
                      className="flex-1 font-bold h-11"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleWithdraw}
                      className="flex-1 font-bold h-11 text-white bg-emerald-600 hover:bg-emerald-700"
                      disabled={!withdrawAmount || parseFloat(withdrawAmount) > balance}
                    >
                      Process Transfer
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transaction History Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">Transaction Logs</h2>
        </div>

        {transactions.length === 0 ? (
          <Card className="border p-8 text-center text-muted-foreground">
            No transaction records found in logs. Complete a trip to see updates.
          </Card>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const isIncome = tx.type === "deposit" || (isDriver && tx.type === "payout");
              return (
                <Card key={tx.id} className="border border-border hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          tx.type === "deposit"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : tx.type === "payout"
                            ? "bg-primary/10 text-primary"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {tx.type === "deposit" ? (
                          <PlusCircle className="w-4 h-4" />
                        ) : isIncome ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground leading-tight truncate">
                          {tx.description}
                        </h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {tx.date} • {tx.method.toUpperCase()} Gateway
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-sm font-black block ${
                          isIncome ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {isIncome ? "+" : "-"}৳{tx.amount.toLocaleString()}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase ${
                          tx.status === "completed"
                            ? "text-emerald-500"
                            : tx.status === "failed"
                            ? "text-rose-500"
                            : "text-amber-500"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

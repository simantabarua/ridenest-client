import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Clock, Car, Target } from "lucide-react";

export default function EarningsPage() {
  const earningsData = {
    totalEarnings: 1250,
    change: "+12.5%",
    rides: 42,
    hoursOnline: 24,
    hourlyRate: 52.08,
    weeklyTarget: 89,
    isPositiveChange: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Earnings Dashboard</h1>
            <p className="text-muted-foreground">
              Track your income and performance
            </p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${earningsData.totalEarnings.toFixed(2)}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {earningsData.isPositiveChange ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                )}
                <span
                  className={
                    earningsData.isPositiveChange
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {earningsData.change}
                </span>
                <span>from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Rides
              </CardTitle>
              <Car className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{earningsData.rides}</div>
              <div className="text-xs text-muted-foreground">
                {earningsData.hoursOnline} hours online
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hourly Rate
              </CardTitle>
              <Clock className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${earningsData.hourlyRate.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                Average per hour
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Weekly Target
              </CardTitle>
              <Target className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {earningsData.weeklyTarget}%
              </div>
              <Progress value={earningsData.weeklyTarget} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

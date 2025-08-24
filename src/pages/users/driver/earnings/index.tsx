"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Car,
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  Star,
} from "lucide-react";

export default function EarningsPage() {
  const [timePeriod, setTimePeriod] = useState("week");

  const earningsData = {
    today: {
      total: "$156.80",
      rides: 8,
      hours: "6.5",
      hourly: "$24.12",
      change: "+12%",
    },
    week: {
      total: "$892.50",
      rides: 47,
      hours: "38.5",
      hourly: "$23.18",
      change: "+8%",
    },
    month: {
      total: "$3,247.80",
      rides: 186,
      hours: "142.5",
      hourly: "$22.79",
      change: "+15%",
    },
    year: {
      total: "$38,973.60",
      rides: 2156,
      hours: "1710",
      hourly: "$22.79",
      change: "+18%",
    },
  };

  const weeklyBreakdown = [
    { day: "Mon", earnings: 145.5, rides: 7, hours: 5.5 },
    { day: "Tue", earnings: 162.25, rides: 8, hours: 6.0 },
    { day: "Wed", earnings: 138.75, rides: 6, hours: 5.0 },
    { day: "Thu", earnings: 178.9, rides: 9, hours: 7.5 },
    { day: "Fri", earnings: 195.6, rides: 10, hours: 8.0 },
    { day: "Sat", earnings: 234.8, rides: 12, hours: 9.5 },
    { day: "Sun", earnings: 156.8, rides: 8, hours: 6.5 },
  ];

  const recentEarnings = [
    {
      id: "DR001",
      date: "2024-01-15",
      time: "2:30 PM",
      from: "123 Main St",
      to: "456 Oak Ave",
      earnings: "$18.50",
      duration: "15 min",
      distance: "5.2 mi",
      surge: 1.0,
    },
    {
      id: "DR002",
      date: "2024-01-15",
      time: "1:45 PM",
      from: "Downtown Office",
      to: "Airport",
      earnings: "$35.00",
      duration: "25 min",
      distance: "12.5 mi",
      surge: 1.5,
    },
    {
      id: "DR003",
      date: "2024-01-15",
      time: "12:20 PM",
      from: "Shopping Mall",
      to: "Residential Area",
      earnings: "$12.75",
      duration: "12 min",
      distance: "3.8 mi",
      surge: 1.0,
    },
  ];

  const performanceMetrics = {
    acceptanceRate: "85%",
    completionRate: "98%",
    avgRating: 4.9,
    onlineHours: "38.5",
    efficiency: "92%",
  };

  const earningsByTime = [
    { time: "12AM-4AM", earnings: 45.5, rides: 3 },
    { time: "4AM-8AM", earnings: 125.75, rides: 8 },
    { time: "8AM-12PM", earnings: 234.8, rides: 12 },
    { time: "12PM-4PM", earnings: 189.6, rides: 10 },
    { time: "4PM-8PM", earnings: 267.9, rides: 14 },
    { time: "8PM-12AM", earnings: 156.8, rides: 8 },
  ];

  const getCurrentData = () => {
    return earningsData[timePeriod as keyof typeof earningsData];
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
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Tabs value={timePeriod} onValueChange={setTimePeriod}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
                <TabsTrigger value="year">This Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
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
              <div className="text-2xl font-bold">{getCurrentData().total}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {getCurrentData().change.startsWith("+") ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span
                  className={
                    getCurrentData().change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {getCurrentData().change}
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
              <div className="text-2xl font-bold">{getCurrentData().rides}</div>
              <div className="text-xs text-muted-foreground">
                {getCurrentData().hours} hours online
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
                {getCurrentData().hourly}
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
                {timePeriod === "week"
                  ? "89%"
                  : timePeriod === "month"
                  ? "108%"
                  : timePeriod === "year"
                  ? "97%"
                  : "62%"}
              </div>
              <Progress
                value={
                  timePeriod === "week"
                    ? 89
                    : timePeriod === "month"
                    ? 108
                    : timePeriod === "year"
                    ? 97
                    : 62
                }
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Breakdown */}
            {timePeriod === "week" && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Weekly Breakdown</CardTitle>
                  <CardDescription>
                    Your earnings day by day this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyBreakdown.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{day.day}</div>
                            <div className="text-sm text-muted-foreground">
                              {day.rides} rides • {day.hours} hours
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            ${day.earnings.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${(day.earnings / day.hours).toFixed(2)}/hr
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Earnings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Earnings</CardTitle>
                    <CardDescription>
                      Your latest completed rides
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEarnings.map((earning, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{earning.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium">{earning.to}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{earning.date}</span>
                            <span>•</span>
                            <span>{earning.time}</span>
                            <span>•</span>
                            <span>{earning.duration}</span>
                            {earning.surge > 1 && (
                              <Badge variant="secondary" className="text-xs">
                                {earning.surge}x surge
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {earning.earnings}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {earning.distance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Earnings by Time */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Earnings by Time of Day</CardTitle>
                <CardDescription>
                  See which times are most profitable for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsByTime.map((timeSlot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-20">
                          <div className="font-medium">{timeSlot.time}</div>
                          <div className="text-sm text-muted-foreground">
                            {timeSlot.rides} rides
                          </div>
                        </div>
                        <div className="flex-1">
                          <Progress
                            value={(timeSlot.earnings / 300) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${timeSlot.earnings.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${(timeSlot.earnings / timeSlot.rides).toFixed(2)}
                          /ride
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Acceptance Rate
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.acceptanceRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.completionRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Average Rating
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {performanceMetrics.avgRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Online Hours
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.onlineHours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Efficiency
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.efficiency}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals & Targets */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Earnings Target
                      </span>
                      <span className="text-sm">$892.50 / $1,000</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Rides Target</span>
                      <span className="text-sm">47 / 50</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Hours Target</span>
                      <span className="text-sm">38.5 / 40</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Adjust Goals
                </Button>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 mb-1">
                    Best Performing Day
                  </div>
                  <div className="text-sm text-green-700">
                    Saturday - $234.80 (12 rides)
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-900 mb-1">
                    Peak Hours
                  </div>
                  <div className="text-sm text-blue-700">
                    4PM - 8PM (Highest earnings)
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-900 mb-1">
                    Efficiency Tip
                  </div>
                  <div className="text-sm text-purple-700">
                    Accept more requests during surge hours
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Detailed Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Rides
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

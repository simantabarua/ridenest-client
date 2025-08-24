"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  UserPlus,
  UserMinus,
  Settings,
  Bell,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = {
    totalUsers: "45,234",
    activeUsers: "38,456",
    totalDrivers: "2,847",
    activeDrivers: "2,156",
    totalRides: "124,567",
    todayRides: "3,456",
    totalRevenue: "$2,456,789",
    todayRevenue: "$89,234",
  };

  const recentActivities = [
    {
      id: 1,
      type: "user_signup",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "driver_verification",
      user: "Mike Chen",
      time: "5 minutes ago",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "ride_completed",
      user: "Alex Thompson",
      time: "8 minutes ago",
      icon: Car,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "payment_issue",
      user: "Emily Davis",
      time: "12 minutes ago",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      id: 5,
      type: "driver_suspended",
      user: "John Smith",
      time: "15 minutes ago",
      icon: UserMinus,
      color: "text-orange-600",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Server Downtime",
      description: "Main server experiencing high latency",
      time: "5 min ago",
      resolved: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Payment Gateway Issues",
      description: "Some transactions failing to process",
      time: "15 min ago",
      resolved: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Feature Released",
      description: "Driver verification system updated",
      time: "1 hour ago",
      resolved: true,
    },
  ];

  const performanceMetrics = {
    systemUptime: "99.9%",
    responseTime: "245ms",
    errorRate: "0.1%",
    activeConnections: "1,234",
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "info":
        return <Bell className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your ride-sharing platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+12%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Drivers
              </CardTitle>
              <Car className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDrivers}</div>
              <div className="text-xs text-muted-foreground">
                of {stats.totalDrivers} total drivers
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Rides
              </CardTitle>
              <Activity className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayRides}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+8%</span>
                <span>from yesterday</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayRevenue}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+15%</span>
                <span>from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Monthly revenue trends and growth
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        $2.4M
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Revenue
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        +18%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Growth Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        $295K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        This Month
                      </div>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Revenue Chart Visualization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Latest platform activities and events
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color} bg-opacity-10`}
                      >
                        <activity.icon
                          className={`w-5 h-5 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {activity.type.replace("_", " ")}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Growth */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Platform user acquisition and retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.totalUsers}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Users
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        85%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Retention Rate
                      </div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        User Growth Chart
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getAlertColor(
                      alert.type
                    )}`}
                  >
                    <div className="flex items-start space-x-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="text-xs opacity-75">
                          {alert.description}
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          {alert.time}
                        </div>
                      </div>
                      {!alert.resolved && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      System Uptime
                    </span>
                    <span className="font-semibold text-green-600">
                      {performanceMetrics.systemUptime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Response Time
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.responseTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Error Rate
                    </span>
                    <span className="font-semibold text-green-600">
                      {performanceMetrics.errorRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Active Connections
                    </span>
                    <span className="font-semibold">
                      {performanceMetrics.activeConnections}
                    </span>
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
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="w-4 h-4 mr-2" />
                  Manage Drivers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  View Rides
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Live Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Live Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Rides
                  </span>
                  <Badge variant="secondary">1,234</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Online Drivers
                  </span>
                  <Badge variant="secondary">2,156</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pending Requests
                  </span>
                  <Badge variant="secondary">456</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Support Tickets
                  </span>
                  <Badge variant="secondary">23</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

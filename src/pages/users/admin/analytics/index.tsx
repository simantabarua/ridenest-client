'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  Users, 
  Car, 
  DollarSign, 
  MapPin,
  Star,
  Calendar
} from 'lucide-react'

export default function AdminAnalytics() {
  const stats = [
    {
      title: 'Total Users',
      value: '45,231',
      change: '+12.5%',
      icon: Users,
      description: 'Active users this month'
    },
    {
      title: 'Total Drivers',
      value: '8,456',
      change: '+8.2%',
      icon: Car,
      description: 'Registered drivers'
    },
    {
      title: 'Total Rides',
      value: '156,789',
      change: '+15.3%',
      icon: MapPin,
      description: 'Completed rides'
    },
    {
      title: 'Revenue',
      value: '$2.4M',
      change: '+18.7%',
      icon: DollarSign,
      description: 'Monthly revenue'
    }
  ]

  const rideData = [
    { month: 'Jan', rides: 12000, revenue: 180000 },
    { month: 'Feb', rides: 15000, revenue: 225000 },
    { month: 'Mar', rides: 18000, revenue: 270000 },
    { month: 'Apr', rides: 22000, revenue: 330000 },
    { month: 'May', rides: 25000, revenue: 375000 },
    { month: 'Jun', rides: 28000, revenue: 420000 },
  ]

  const topDrivers = [
    { name: 'John Smith', rides: 342, rating: 4.9, earnings: '$12,450' },
    { name: 'Sarah Johnson', rides: 298, rating: 4.8, earnings: '$11,200' },
    { name: 'Mike Chen', rides: 276, rating: 4.9, earnings: '$10,800' },
    { name: 'Emily Davis', rides: 254, rating: 4.7, earnings: '$9,900' },
    { name: 'David Wilson', rides: 231, rating: 4.8, earnings: '$9,200' },
  ]

  const popularRoutes = [
    { route: 'Downtown → Airport', rides: 15420, avgFare: '$25.50' },
    { route: 'Airport → Downtown', rides: 14890, avgFare: '$24.80' },
    { route: 'University → Shopping Mall', rides: 12340, avgFare: '$12.30' },
    { route: 'Shopping Mall → University', rides: 11890, avgFare: '$11.90' },
    { route: 'Train Station → City Center', rides: 9870, avgFare: '$8.50' },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Calendar className="w-4 h-4 mr-1" />
              Last 30 days
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="rides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rides">Ride Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="rides" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Ride Trends</CardTitle>
                  <CardDescription>Number of rides over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{data.month}</span>
                          <span>{data.rides.toLocaleString()} rides</span>
                        </div>
                        <Progress value={(data.rides / 30000) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Routes</CardTitle>
                  <CardDescription>Most frequently traveled routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularRoutes.map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{route.route}</p>
                            <p className="text-sm text-muted-foreground">{route.rides.toLocaleString()} rides</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{route.avgFare}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{data.month}</span>
                          <span>${data.revenue.toLocaleString()}</span>
                        </div>
                        <Progress value={(data.revenue / 500000) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Breakdown of revenue sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Standard Rides</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Premium Rides</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Shared Rides</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Drivers</CardTitle>
                  <CardDescription>Drivers with highest performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topDrivers.map((driver, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{driver.rides} rides</span>
                              <span>•</span>
                              <span>{driver.rating} ★</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">{driver.earnings}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uptime</span>
                        <span>99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Response Time</span>
                        <span>245ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>User Satisfaction</span>
                        <span>4.8/5</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Driver Retention</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Navigation, 
  Star, 
  Phone,
  MessageCircle,
  Share,
  Shield,
  User,
  AlertTriangle,
  Timer,
  Route,
} from 'lucide-react'
import { Label } from '@/components/ui/label'

export default function TrackingPage() {
  const progress = 25

  const rideDetails = {
    driver: {
      name: 'John Smith',
      rating: 4.8,
      trips: 1247,
      car: 'Toyota Camry',
      license: 'ABC 123',
      color: 'Silver',
      phone: '+1 (555) 123-4567'
    },
    trip: {
      pickup: '123 Main St, City, State',
      destination: '456 Oak Ave, City, State',
      estimatedTime: '12 min',
      distance: '5.2 mi',
      price: '$20.90',
      eta: '2:45 PM'
    },
    status: {
      current: 'Driver is on the way',
      steps: [
        { id: 1, name: 'Driver assigned', completed: true, time: '2:30 PM' },
        { id: 2, name: 'Driver on the way', completed: true, time: '2:33 PM' },
        { id: 3, name: 'Arriving at pickup', completed: false, time: '' },
        { id: 4, name: 'Trip in progress', completed: false, time: '' },
        { id: 5, name: 'Arrived at destination', completed: false, time: '' }
      ]
    }
  }

  const handleEmergency = () => {
    // Emergency logic would go here
    console.log('Emergency button pressed')
  }

  const handleShareTrip = () => {
    // Share trip logic would go here
    console.log('Share trip pressed')
  }

  const handleContactDriver = (type: 'call' | 'message') => {
    // Contact driver logic would go here
    console.log(`Contact driver: ${type}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Map Area */}
      <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 to-green-50">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Navigation className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Live Map View</h3>
            <p className="text-muted-foreground">Driver location and route tracking</p>
          </div>
        </div>

        {/* Emergency Button */}
        <Button
          variant="destructive"
          size="lg"
          className="absolute top-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
          onClick={handleEmergency}
        >
          <AlertTriangle className="w-6 h-6" />
        </Button>

        {/* Share Trip Button */}
        <Button
          variant="outline"
          size="lg"
          className="absolute top-4 left-4 rounded-full w-14 h-14 p-0 shadow-lg bg-white"
          onClick={handleShareTrip}
        >
          <Share className="w-6 h-6" />
        </Button>

        {/* Driver Location Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Route Line */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
          <div className="w-full h-full border-2 border-dashed border-primary/30 rounded-lg"></div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Card */}
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{rideDetails.status.current}</CardTitle>
                  <CardDescription>
                    Estimated arrival: {rideDetails.trip.eta}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {rideDetails.trip.estimatedTime}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pickup: {rideDetails.trip.pickup}</span>
                <span>{rideDetails.trip.distance}</span>
                <span>{rideDetails.trip.destination}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Driver Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Your Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{rideDetails.driver.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rideDetails.driver.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>{rideDetails.driver.trips} trips</div>
                        <div>{rideDetails.driver.car} • {rideDetails.driver.color}</div>
                        <div>License: {rideDetails.driver.license}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleContactDriver('call')}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleContactDriver('message')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trip Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Trip Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideDetails.status.steps.map((step) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <Timer className="w-4 h-4" />
                          ) : (
                            <span className="text-sm">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${step.completed ? 'text-green-600' : ''}`}>
                            {step.name}
                          </div>
                          {step.time && (
                            <div className="text-sm text-muted-foreground">{step.time}</div>
                          )}
                        </div>
                        {step.completed && (
                          <div className="text-green-500">
                            <Timer className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trip Details */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Pickup</Label>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-sm">{rideDetails.trip.pickup}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Destination</Label>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span className="text-sm">{rideDetails.trip.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{rideDetails.trip.distance}</div>
                      <div className="text-sm text-muted-foreground">Distance</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{rideDetails.trip.estimatedTime}</div>
                      <div className="text-sm text-muted-foreground">Est. Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{rideDetails.trip.price}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Safety Features */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Safety</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Trip shared with contacts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Emergency contacts ready</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Driver verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 support available</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Safety Center
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={handleShareTrip}>
                    <Share className="w-4 h-4 mr-2" />
                    Share Trip Status
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleContactDriver('message')}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Driver
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleContactDriver('call')}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Driver
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Route className="w-4 h-4 mr-2" />
                    View Route Details
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency */}
              <Card className="border-0 shadow-lg border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Emergency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-red-700">
                    If you feel unsafe during your trip, use the emergency button.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleEmergency}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Assistance
                  </Button>
                  <div className="text-xs text-red-600 text-center">
                    This will alert authorities and our safety team
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
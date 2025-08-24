'use client'

import { useState } from 'react'
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, 
  Navigation, 
  DollarSign, 
  Car,
  Users,
  CreditCard,
  Calendar,
  X,
  ArrowRight,
  Shield,
  Timer
} from 'lucide-react'

export default function RequestRidePage() {
  const [rideType, setRideType] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [scheduleLater, setScheduleLater] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('Current Location')
  const [destination, setDestination] = useState('')

  const rideOptions = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Everyday rides',
      price: '$12-15',
      eta: '3 min',
      capacity: '4',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      id: 'comfort',
      name: 'Comfort',
      description: 'More space and comfort',
      price: '$18-22',
      eta: '5 min',
      capacity: '4',
      icon: Car,
      color: 'bg-green-500'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Luxury vehicles',
      price: '$25-30',
      eta: '7 min',
      capacity: '4',
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      id: 'xl',
      name: 'XL',
      description: 'For larger groups',
      price: '$20-25',
      eta: '8 min',
      capacity: '6',
      icon: Users,
      color: 'bg-orange-500'
    }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, last4: '4242' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, last4: '' },
    { id: 'cash', name: 'Cash', icon: DollarSign, last4: '' }
  ]

  const savedPlaces = [
    { name: 'Home', address: '123 Main St, City, State', icon: '🏠' },
    { name: 'Work', address: '456 Business Ave, City, State', icon: '🏢' },
    { name: 'Gym', address: '789 Fitness St, City, State', icon: '💪' },
    { name: 'Airport', address: 'Airport Terminal, City, State', icon: '✈️' }
  ]

  const recentDestinations = [
    'Downtown Office',
    'Shopping Mall',
    'Central Park',
    'Train Station'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Request a Ride</h1>
            <p className="text-muted-foreground">Where would you like to go?</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Inputs */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pickup Location */}
                  <div className="space-y-2">
                    <Label>Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="pl-10"
                        placeholder="Enter pickup location"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10"
                        placeholder="Where to?"
                      />
                      {destination && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setDestination('')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Schedule Toggle */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="schedule"
                      checked={scheduleLater}
                      onChange={(e) => setScheduleLater(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="schedule" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule for later</span>
                    </Label>
                  </div>

                  {scheduleLater && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input type="time" />
                      </div>
                    </div>
                  )}

                  {/* Saved Places */}
                  <div className="space-y-2">
                    <Label>Saved Places</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {savedPlaces.map((place, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="justify-start h-auto p-3"
                          onClick={() => setDestination(place.address)}
                        >
                          <span className="mr-2">{place.icon}</span>
                          <div className="text-left">
                            <div className="font-medium text-sm">{place.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {place.address}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Destinations */}
                  {recentDestinations.length > 0 && (
                    <div className="space-y-2">
                      <Label>Recent Destinations</Label>
                      <div className="flex flex-wrap gap-2">
                        {recentDestinations.map((dest, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setDestination(dest)}
                          >
                            {dest}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ride Options */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Choose Your Ride</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={rideType} onValueChange={setRideType} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      {rideOptions.map((option) => (
                        <TabsTrigger key={option.id} value={option.id} className="text-xs">
                          {option.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {rideOptions.map((option) => (
                      <TabsContent key={option.id} value={option.id} className="mt-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}>
                              <option.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">{option.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {option.description}
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center space-x-1">
                                  <Timer className="w-3 h-3" />
                                  <span>{option.eta}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{option.capacity} seats</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">{option.price}</div>
                            <div className="text-xs text-muted-foreground">estimated</div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          <div className="flex items-center space-x-2">
                            <method.icon className="w-4 h-4" />
                            <span>{method.name}</span>
                            {method.last4 && (
                              <span className="text-muted-foreground">•••• {method.last4}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trip Summary */}
              <Card className="border-0 shadow-lg sticky top-6">
                <CardHeader>
                  <CardTitle>Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Pickup</div>
                        <div className="text-xs text-muted-foreground">
                          {pickupLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Destination</div>
                        <div className="text-xs text-muted-foreground">
                          {destination || 'Not selected'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Base fare</span>
                      <span>$8.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Distance (5.2 mi)</span>
                      <span>$7.80</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time (12 min)</span>
                      <span>$3.60</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>$1.50</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$20.90</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!destination}
                  >
                    {scheduleLater ? 'Schedule Ride' : 'Request Ride'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  {!destination && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please enter a destination to continue
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Safety Features */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Safety Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Share trip status</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Emergency contacts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Driver verification</span>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Promo Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter code" className="flex-1" />
                    <Button variant="outline">Apply</Button>
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
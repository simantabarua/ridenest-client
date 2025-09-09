import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Star, Shield, Zap } from "lucide-react";
import { Link } from "react-router";

const appFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Book a ride in seconds with our optimized app",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Multiple payment options with bank-level security",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Help us improve with your feedback",
  },
];

export default function AppSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">Download Our App</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ridenest in Your Pocket
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the convenience of booking rides anytime, anywhere with
            our user-friendly mobile app.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ridenest App</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-1">
                      4.8 (50K+ reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {appFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">1M+</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-xs text-muted-foreground">Daily Rides</p>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-4">Available On</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="https://play.google.com/store/apps/details?id=com.ridenest">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download for iOS
                  </Button>
                </Link>
                <Link to="https://play.google.com/store/apps/details?id=com.ridenest">
                  <Button size="lg" variant="outline">
                    <Download className="mr-2 w-5 h-5" />
                    Get it on Android
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Free download • No hidden fees • Available worldwide
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-full">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center">App Features</h3>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold mb-4">Core Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Instant Booking</span>
                      </div>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Secure Payments</span>
                      </div>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Driver Ratings</span>
                      </div>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Real-time Tracking</span>
                      </div>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold mb-4">What Users Love</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium mb-1">
                        "So easy to use!"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Booked my first ride in under 30 seconds
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium mb-1">"Great prices"</p>
                      <p className="text-xs text-muted-foreground">
                        Much cheaper than traditional taxis
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium mb-1">
                        "Reliable service"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Never had a no-show driver
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

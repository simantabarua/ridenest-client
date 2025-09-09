import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    rating: 5,
    content:
      "Ridenest has made my daily commute so much easier. The drivers are professional and the app is incredibly user-friendly.",
    avatar: "/avatars/01.png",
  },
  {
    name: "Mike Chen",
    role: "Business Traveler",
    rating: 5,
    content:
      "I use Ridenest for all my business trips. Reliable, clean cars, and always on time. Highly recommended!",
    avatar: "/avatars/02.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    rating: 4,
    content:
      "As a student, I appreciate the affordable pricing and safety features. It's my go-to transportation app.",
    avatar: "/avatars/03.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary">What Our Users Say</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Trusted by Millions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say
            about their experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
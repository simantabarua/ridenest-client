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
    <section className="py-20 bg-background border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="border-2 border-foreground bg-secondary text-secondary-foreground font-mono uppercase px-2 py-0.5 shadow-[2px_2px_0px_0px_currentColor]">
            What Our Users Say
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Trusted by Millions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say
            about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? "fill-yellow-400 text-foreground" 
                          : "text-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-base font-semibold leading-relaxed mb-6 italic text-foreground">
                  "{testimonial.content}"
                </blockquote>
              </div>

              <div className="flex items-center space-x-3 border-t-2 border-foreground/10 pt-4">
                <div className="w-10 h-10 bg-primary/20 border-2 border-foreground rounded-none flex items-center justify-center">
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-extrabold uppercase text-sm">{testimonial.name}</p>
                  <span className="inline-block bg-secondary text-secondary-foreground border border-foreground font-mono text-[10px] uppercase px-1.5 py-0.5 mt-1">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Safety Tips for Nighttime Ridesharing in Dhaka",
    excerpt: "Navigating Dhaka streets at night requires extra precautions. Read our comprehensive safety guide for both riders and drivers.",
    category: "Safety",
    date: "June 15, 2026",
    author: "Zahid Hasan",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "How RideNest is Reducing Carbon Footprint with CNG Sharing",
    excerpt: "CNGs are a staple of Bangladeshi transport. Learn how we are optimizing route matching to make green transport affordable.",
    category: "Sustainability",
    date: "June 10, 2026",
    author: "Nabila Rahman",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "Understanding Dynamic Pricing: How Fare Calculation Works",
    excerpt: "Ever wondered how fares are calculated during peak hours? We break down the algorithms and traffic data driving our rates.",
    category: "Technology",
    date: "May 28, 2026",
    author: "Arif Chowdhury",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    title: "A Day in the Life of a Top-Rated RideNest Driver",
    excerpt: "Meet Rahim, one of our top-rated car partners. He shares his secrets to maintaining a 4.9-star rating and maximizing earnings.",
    category: "Stories",
    date: "May 15, 2026",
    author: "Sultana Kemal",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export default function Blog() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text">
            RideNest Publications
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest trends, safety features, driver stories, and engineering updates from the RideNest team.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16 bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto min-h-[350px]">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="self-start text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1.5" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <button className="flex items-center text-primary font-semibold hover:gap-2 transition-all">
                Read Article <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="self-start text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

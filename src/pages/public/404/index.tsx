import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary-foreground p-4">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-xl border-border">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-secondary p-3 rounded-full">
              <Search className="h-10 w-10 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Lost in Digital Space</CardTitle>
          <CardDescription className="text-muted-foreground">
            The page you're looking for has vanished into the void
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-foreground">
            Our quantum scanners couldn't locate the requested destination. 
            This digital realm might not exist or has been moved to another dimension.
          </p>
          
          <div className="bg-muted/50 border-l-4 border-info p-4 rounded">
            <p className="text-info-foreground text-sm">
              <span className="font-semibold">Navigation Tip:</span> Double-check the URL or 
              use the button below to return to familiar territory.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </Button>
            <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-accent">
              <a href="/contact">Report Issue</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
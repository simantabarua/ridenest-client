import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-2 border-foreground rounded-none shadow-[8px_8px_0px_0px_var(--foreground)]">
        <CardHeader className="text-center space-y-2 border-b-2 border-foreground bg-secondary/10">
          <div className="flex justify-center mb-2 pt-4">
            <div className="border-2 border-foreground bg-secondary p-3 rounded-none">
              <Search className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tight text-foreground">404 Error</CardTitle>
          <CardDescription className="font-mono text-xs text-muted-foreground uppercase">
            Page Vanished Into the Void
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 pt-6">
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Our scanners couldn't locate the requested destination. 
            This digital realm might not exist or has been moved to another coordinate.
          </p>
          
          <div className="bg-secondary/20 border-2 border-foreground p-4 rounded-none text-left">
            <p className="text-foreground text-xs font-mono">
              <span className="font-bold uppercase block mb-1">Navigation Tip:</span>
              Double-check the URL or use the button below to return to familiar territory.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              asChild
              className="flex-1 border-2 border-foreground bg-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all py-6"
            >
              <a href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-2 border-foreground bg-background text-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all py-6"
            >
              <a href="/contact">Report Issue</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
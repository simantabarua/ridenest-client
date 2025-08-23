import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary-foreground p-4">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-xl border-border">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-destructive/20 p-3 rounded-full">
              <Lock className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
          <CardDescription className="text-muted-foreground">
            You've ventured into a restricted digital dimension
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-foreground">
            This area is protected by quantum-level security protocols. Only
            authorized entities with proper clearance can access this content.
          </p>

          <div className="bg-muted/50 border-l-4 border-warning p-4 rounded">
            <p className="text-warning-foreground text-sm">
              <span className="font-semibold">Security Tip:</span> If you
              believe this is an error, please contact your system administrator
              to verify your permissions.
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Return to Safety
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-2 border-foreground rounded-none shadow-[8px_8px_0px_0px_var(--foreground)]">
        <CardHeader className="text-center space-y-2 border-b-2 border-foreground bg-destructive/5">
          <div className="flex justify-center mb-2 pt-4">
            <div className="border-2 border-foreground bg-destructive/15 p-3 rounded-none">
              <Lock className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tight text-foreground">Access Denied</CardTitle>
          <CardDescription className="font-mono text-xs text-muted-foreground uppercase">
            Restricted Digital Dimension
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-6 pt-6">
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            This area is protected by security protocols. Only authorized entities with proper clearance can access this content.
          </p>

          <div className="bg-destructive/5 border-2 border-foreground p-4 rounded-none text-left">
            <p className="text-foreground text-xs font-mono">
              <span className="font-bold uppercase block mb-1 text-destructive">Security Tip:</span>
              If you believe this is an error, please contact your system administrator to verify your permissions.
            </p>
          </div>

          <Button
            asChild
            className="w-full border-2 border-foreground bg-primary text-primary-foreground font-mono font-bold uppercase rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all py-6"
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

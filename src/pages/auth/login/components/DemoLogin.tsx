
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface DemoLoginProps {
  form: UseFormReturn<LoginFormData>;
}

export default function DemoLogin({ form }: DemoLoginProps) {
  const demoCredentials = [
    {
      role: "Admin",
      email: "admin@mail.com",
      password: "Admin@123",
    },
    {
      role: "Driver",
      email: "driver@mail.com",
      password: "Driver@123",
    },
    {
      role: "Rider",
      email: "rider@mail.com",
      password: "Rider@123",
    },
  ];

  const handleDemoLogin = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center">Demo Login</CardTitle>
        <CardDescription className="text-center">
          Quick access with demo credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {demoCredentials.map((credential) => (
            <Button
              key={credential.role}
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleDemoLogin(credential.email, credential.password)}
            >
              Login as {credential.role}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
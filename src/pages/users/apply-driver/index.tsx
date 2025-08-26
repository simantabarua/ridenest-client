import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useUpdateMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const driverSchema = z.object({
  role: z.literal("DRIVER"),
  licenseNumber: z
    .string()
    .min(5, "License Number must be at least 5 characters"),
  vehicleInfo: z.object({
    type: z.string().min(2, "Vehicle type is required"),
    model: z.string().min(2, "Vehicle model is required"),
    registrationNumber: z.string().min(2, "Registration Number is required"),
  }),
});

type DriverFormData = z.infer<typeof driverSchema>;
type FormErrors = Partial<Record<keyof DriverFormData | string, string>>;

export default function ApplyDriver() {
  const [update] = useUpdateMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDriver = userInfo?.data?.role === "DRIVER";

  const form = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      role: "DRIVER",
      licenseNumber: "",
      vehicleInfo: {
        type: "",
        model: "",
        registrationNumber: "",
      },
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<DriverFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      form.clearErrors();

      const payload = {
        role: "DRIVER",
        licenseNumber: data.licenseNumber.trim(),
        vehicleInfo: {
          type: data.vehicleInfo.type.trim(),
          model: data.vehicleInfo.model.trim(),
          registrationNumber: data.vehicleInfo.registrationNumber.trim(),
        },
      };

      const res = await update(payload).unwrap();

      if (res.success) {
        toast.success("Driver application submitted successfully!");
        form.reset();
      }
    } catch (err: unknown) {
      handleSubmissionError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmissionError = (error: unknown) => {
    const err = error as {
      data?: {
        errors?: FormErrors;
        message?: string;
      };
      status?: number;
    };

    if (err?.data?.errors) {
      Object.entries(err.data.errors).forEach(([field, message]) => {
        const fieldName = field.includes(".")
          ? field
          : (field as keyof DriverFormData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setError(fieldName as any, {
          type: "server",
          message: message as string,
        });
      });
    } else if (err?.data?.message) {
      toast.error(err.data.message);
    } else if (err?.status === 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error(
        "Failed to submit application. Please check your connection."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">
              {isDriver ? "Update Driver Details" : "Apply as a Driver"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {isDriver
                ? "Update your driver information and vehicle details"
                : "Complete this form to apply as a driver on our platform"}
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
                noValidate
              >
                <div className="space-y-4">
                  <h3 className="text-md font-medium">License Information</h3>

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DL-19378930"
                            {...field}
                            value={field.value || ""}
                            disabled={isSubmitting}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your valid driver's license number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium">Vehicle Information</h3>

                  <FormField
                    control={form.control}
                    name="vehicleInfo.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Car, SUV, Truck, etc."
                            {...field}
                            value={field.value || ""}
                            disabled={isSubmitting}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleInfo.model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Toyota Prius, Honda Civic, etc."
                            {...field}
                            value={field.value || ""}
                            disabled={isSubmitting}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleInfo.registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AZW-a98764"
                            {...field}
                            value={field.value || ""}
                            disabled={isSubmitting}
                            aria-required="true"
                          />
                        </FormControl>
                        <FormDescription>
                          Vehicle registration number as shown on documents
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : isDriver ? (
                    "Update Information"
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

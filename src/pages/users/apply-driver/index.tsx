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
} from "@/components/ui/form";
import { useUpdateMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

// Updated schema to match the API structure
const driverSchema = z.object({
  role: z.literal("DRIVER"),
  licenseNumber: z.string().min(5, "License Number is required"),
  vehicleInfo: z.object({
    type: z.string().min(2, "Vehicle type is required"),
    model: z.string().min(2, "Vehicle model is required"),
    registrationNumber: z.string().min(2, "Registration Number is required"),
  }),
});

type DriverFormData = z.infer<typeof driverSchema>;

export default function ApplyDriver() {
  const [update] = useUpdateMutation();
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
  });

  const onSubmit: SubmitHandler<DriverFormData> = async (data) => {
    try {
      form.clearErrors();
      const payload = {
        role: "DRIVER",
        licenseNumber: data.licenseNumber,
        vehicleInfo: {
          type: data.vehicleInfo.type,
          model: data.vehicleInfo.model,
          registrationNumber: data.vehicleInfo.registrationNumber,
        },
      };
      const res = await update(payload).unwrap();
      if (res.success) {
        toast.success("Driver application submitted successfully!");
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
      } else {
        toast.error("Failed to submit application");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Apply as Driver</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Fixed: Updated field names to match nested structure */}
                <FormField
                  control={form.control}
                  name="vehicleInfo.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Car"
                          {...field}
                          value={field.value || ""}
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
                          placeholder="Toyota Prius"
                          {...field}
                          value={field.value || ""}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit Application</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IDriverInfo } from "@/types/driver.type";

const ActionButton = ({
  label,
  onClick,
  variant = "outline",
}: {
  label: string;
  onClick: () => void;
  variant?: "outline" | "destructive" | "default";
}) => (
  <Button variant={variant} size="sm" onClick={onClick}>
    {label}
  </Button>
);

const DriverCard = ({
  driver,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}: {
  driver: IDriverInfo;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onSuspend: (userId: string) => void;
  onDelete: (userId: string) => void;
}) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{driver.driver?.name}</h3>
          <div className="flex gap-2 mt-1">
            <Badge
              variant={driver.driver?.isSuspend ? "destructive" : "default"}
            >
              {driver.driver?.isSuspend ? "Suspended" : "Active"}
            </Badge>
            <Badge variant={driver.driver?.isVerified ? "default" : "outline"}>
              {driver.driver?.isVerified ? "Verified" : "Unverified"}
            </Badge>
            <Badge
              variant={driver.driver?.isApproved ? "default" : "destructive"}
            >
              {driver.driver?.isApproved ? "Approved" : "Pending"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-2 space-y-1">
            <div>Email: {driver.driver?.email ?? "No email"}</div>
            <div>Phone: {driver.driver?.phone ?? "No phone"}</div>
            <div>License: {driver.licenseNumber ?? "N/A"}</div>
            <div>
              Vehicle: {driver.vehicleInfo?.model ?? "N/A"} (
              {driver.vehicleInfo?.type ?? "N/A"})
            </div>
            <div>
              Registration: {driver.vehicleInfo?.registrationNumber ?? "N/A"}
            </div>
            <div>Completed Rides: {driver.completedRides ?? 0}</div>
            <div>Earnings: ${driver.earnings ?? 0}</div>
            <div>Rating: {driver.rating ?? 0}</div>
            <div>Available: {driver.isAvailable ? "Yes" : "No"}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 lg:mt-0">
          <ActionButton
            label={driver.driver?.isApproved ? "Approved" : "Approve"}
            onClick={() => onApprove(driver.driver?._id ?? "")}
            variant="default"
          />
          <ActionButton
            label={driver.driver?.isApproved ? "Reject" : "Rejected"}
            onClick={() => onReject(driver.driver?._id ?? "")}
            variant="destructive"
          />
          <ActionButton
            label={driver.driver?.isSuspend ? "Unsuspend" : "Suspend"}
            onClick={() => onSuspend(driver.driver?._id ?? "")}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ActionButton
                label="Delete"
                onClick={() => {}}
                variant="destructive"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete{" "}
                  {driver.driver?.name ?? "this driver"} and their data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(driver.driver?._id ?? "")}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DriverCard;

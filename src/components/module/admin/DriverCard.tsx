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
import {
  Mail,
  Phone,
  FileText,
  Car,
  DollarSign,
  Star,
  Check,
  X,
  AlertTriangle,
  Trash2,
  User,
} from "lucide-react";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<Star key={i} className="size-3.5 fill-amber-500/40 text-amber-500" />);
    } else {
      stars.push(<Star key={i} className="size-3.5 text-muted-foreground/30" />);
    }
  }
  return (
    <div className="flex items-center gap-0.5">
      {stars}
      <span className="ml-1.5 text-xs font-bold text-foreground">{rating}</span>
    </div>
  );
};

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
  <Card className="border border-border/50 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:border-border/80 overflow-hidden">
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/50 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                {driver.driver?.picture ? (
                  <img
                    src={driver.driver.picture}
                    alt={driver.driver.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <User className="size-5 text-primary" />
                )}
              </div>
              {driver.isAvailable ? (
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
              ) : (
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-muted-foreground/40 ring-2 ring-background" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg tracking-tight text-foreground flex items-center gap-2">
                {driver.driver?.name || "Unnamed Driver"}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <Badge
                  className={
                    driver.driver?.isSuspend
                      ? "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/15"
                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15"
                  }
                  variant="outline"
                >
                  {driver.driver?.isSuspend ? "Suspended" : "Active"}
                </Badge>
                <Badge
                  className={
                    driver.driver?.isVerified
                      ? "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/15"
                  }
                  variant="outline"
                >
                  {driver.driver?.isVerified ? "Verified" : "Unverified"}
                </Badge>
                <Badge
                  className={
                    driver.driver?.isApproved
                      ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500/15"
                      : "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/15"
                  }
                  variant="outline"
                >
                  {driver.driver?.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {driver.driver?.isApproved ? (
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/30 bg-emerald-500/5 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 font-semibold gap-1.5 h-8"
                onClick={() => onApprove(driver.driver?._id ?? "")}
              >
                <Check className="size-3.5" />
                <span>Approved</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5 h-8 shadow-xs"
                onClick={() => onApprove(driver.driver?._id ?? "")}
              >
                <Check className="size-3.5" />
                <span>Approve</span>
              </Button>
            )}

            {driver.driver?.isApproved ? (
              <Button
                variant="destructive"
                size="sm"
                className="font-semibold gap-1.5 h-8 shadow-xs"
                onClick={() => onReject(driver.driver?._id ?? "")}
              >
                <X className="size-3.5" />
                <span>Reject</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-rose-500/30 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 font-semibold gap-1.5 h-8"
                onClick={() => onReject(driver.driver?._id ?? "")}
              >
                <X className="size-3.5" />
                <span>Rejected</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className={
                driver.driver?.isSuspend
                  ? "border-amber-500/30 bg-amber-500/5 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 font-semibold gap-1.5 h-8"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground font-semibold gap-1.5 h-8"
              }
              onClick={() => onSuspend(driver.driver?._id ?? "")}
            >
              <AlertTriangle className="size-3.5" />
              <span>{driver.driver?.isSuspend ? "Unsuspend" : "Suspend"}</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-semibold gap-1.5 h-8"
                >
                  <Trash2 className="size-3.5" />
                  <span>Delete</span>
                </Button>
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

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Column 1: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Contact Info
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-foreground/80">
                <Mail className="size-4 text-muted-foreground/70" />
                <span className="truncate" title={driver.driver?.email}>
                  {driver.driver?.email ?? "No email"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground/80">
                <Phone className="size-4 text-muted-foreground/70" />
                <span>{driver.driver?.phone ?? "No phone"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground/80">
                <FileText className="size-4 text-muted-foreground/70" />
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded border border-border/40">
                  License: {driver.licenseNumber ?? "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Vehicle Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Vehicle details
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-foreground/80">
                <Car className="size-4 text-muted-foreground/70" />
                <div>
                  <span className="font-medium text-foreground">
                    {driver.vehicleInfo?.model ?? "N/A"}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2 bg-muted px-1.5 py-0.5 rounded border border-border/40 capitalize">
                    {driver.vehicleInfo?.type ?? "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-foreground/80">
                <FileText className="size-4 text-muted-foreground/70" />
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded border border-border/40">
                  Plate: {driver.vehicleInfo?.registrationNumber ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`size-2 rounded-full ${
                    driver.isAvailable ? "bg-emerald-500" : "bg-muted-foreground/40"
                  }`}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status:{" "}
                  <span
                    className={
                      driver.isAvailable
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    }
                  >
                    {driver.isAvailable ? "Available" : "Offline / Busy"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Performance Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Performance
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-foreground/80">
                <Car className="size-4 text-muted-foreground/70" />
                <span>
                  Completed Rides:{" "}
                  <strong className="text-foreground">
                    {driver.completedRides ?? 0}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground/80">
                <DollarSign className="size-4 text-emerald-500" />
                <span>
                  Earnings:{" "}
                  <strong className="text-foreground text-base">
                    ${driver.earnings ?? 0}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-muted-foreground/75 text-xs">Rating:</span>
                {renderStars(driver.rating ?? 0)}
              </div>
            </div>
          </div>
      </div>
    </div>
  </CardContent>
</Card>
);

export default DriverCard;

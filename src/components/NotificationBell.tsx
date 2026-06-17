import { Bell, Check, Trash2, Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useGetMyNotificationsQuery,
  useMarkAllReadMutation,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  type INotification,
} from "@/redux/features/notification/notification.api";
import { toast } from "sonner";

export function NotificationBell() {
  const { data: notificationsData } = useGetMyNotificationsQuery(undefined, {
    pollingInterval: 10000, // Poll every 10 seconds for real-time feel
  });
  const [markAllRead] = useMarkAllReadMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification deleted");
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  const getIcon = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />;
      default:
        return <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />;
    }
  };

  // Simple relative time helper to avoid dependency issues
  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 6000);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 flex items-center justify-center cursor-pointer rounded-full"
        >
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground font-bold text-[9px] min-w-4 h-4 flex items-center justify-center rounded-full px-1 shadow-sm">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 bg-muted/30">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-[10px] font-medium rounded-full">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="h-8 text-xs font-medium hover:bg-accent rounded-md transition-all"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <Separator />
        <div className="overflow-y-auto max-h-[350px] divide-y divide-border">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                className={`flex items-start gap-3 p-4 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer ${
                  !notification.isRead ? "bg-muted/40 border-l-2 border-primary" : ""
                }`}
              >
                {getIcon(notification.type)}
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className={`text-xs md:text-sm font-semibold truncate leading-tight ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">
                      {getRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground break-words leading-normal">
                    {notification.message}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDelete(notification._id, e)}
                  className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md flex-shrink-0 self-center"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                No notifications yet
              </p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

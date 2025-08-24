import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  Home,
  Car,
  User,
  MapPin,
  History,
  DollarSign,
  Users,
  BarChart3,
  Info,
} from "lucide-react";
type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navigationConfig = {
  rider: [
    { href: "/rider/dashboard", label: "Dashboard", icon: Home },
    { href: "/rider/request-ride", label: "Request Ride", icon: Car },
    { href: "/rider/ride-history", label: "Ride History", icon: History },
    { href: "/rider/profile", label: "Profile", icon: User },
    { href: "/rider/tracking", label: "Tracking", icon: MapPin },
    { href: "/rider/ride/:rideId", label: "Ride Details", icon: Info },
  ] as NavLink[],
  driver: [
    { href: "/driver/dashboard", label: "Dashboard", icon: Home },
    { href: "/driver/incoming-requests", label: "Requests", icon: Car },
    { href: "/driver/active-ride", label: "Active Ride", icon: MapPin },
    { href: "/driver/earnings", label: "Earnings", icon: DollarSign },
    { href: "/driver/ride-history", label: "History", icon: History },
    { href: "/driver/profile", label: "Profile", icon: User },
  ] as NavLink[],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/user-management", label: "User Management", icon: Users },
    { href: "/admin/driver-management", label: "Driver Management", icon: Car },
    { href: "/admin/ride-management", label: "Ride Management", icon: MapPin },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/profile", label: "Profile", icon: User },
  ] as NavLink[],
};

export function AppSidebar() {
  const { data: userData } = useUserInfoQuery(undefined);
  const userRole = userData?.data?.role?.toLowerCase() || "";

  const navigationLinks =
    navigationConfig[userRole as keyof typeof navigationConfig] || [];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">Ridenest</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationLinks.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

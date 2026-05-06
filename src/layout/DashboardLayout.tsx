import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/user-drop-down";
import EmergencySOS from "@/pages/users/emergency/EmergencySOS";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    const { data: userData } = useUserInfoQuery(undefined);
    const userRole = userData?.data?.role?.toLowerCase() || "";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-muted/20 overflow-hidden">
        {/* Standardized Header */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-md transition-all sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">
              Dashboard
            </h1>
          </div>
          <UserDropdown />
        </header>

        {/* Standardized Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="space-y-8">
              <Outlet />
              {userRole === "rider" && <EmergencySOS />}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

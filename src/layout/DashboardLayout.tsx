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
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md transition-all">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg font-semibold tracking-tight hidden sm:block">
              Dashboard
            </h1>
          </div>
          <UserDropdown />
        </header>

        <main className="flex flex-1 flex-col  bg-muted/30">
          <div className="flex-1 rounded-xl bg-background md:p-6 shadow-sm">
            <Outlet />
            {userRole === "rider" && <EmergencySOS />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

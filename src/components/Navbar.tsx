import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, Settings, Menu, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { authApi } from "@/redux/features/auth/auth.api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { name, email } = userInfo?.data || {};
  const isLoggedIn = !!userInfo && !isLoading;
  const rawRole = userInfo?.data?.role ?? "";
  const role = rawRole.toLowerCase().replace(/^super_/, "");
  console.log(userInfo);
  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const riderLinks = [
    { href: "/rider/dashboard", label: "Dashboard" },
    { href: "/rider/request-ride", label: "Request Ride" },
    { href: "/rider/ride-history", label: "Ride History" },
    { href: "/rider/profile", label: "Profile" },
    { href: "/rider/safety", label: "Safety" },
  ];

  const driverLinks = [
    { href: "/driver/dashboard", label: "Dashboard" },
    { href: "/driver/incoming-requests", label: "Requests" },
    { href: "/driver/earnings", label: "Earnings" },
    { href: "/driver/ride-history", label: "History" },
    { href: "/driver/profile", label: "Profile" },
    { href: "/driver/safety", label: "Safety" },
  ];

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/user-management", label: "Users" },
    { href: "/admin/driver-management", label: "Drivers" },
    { href: "/admin/ride-management", label: "Rides" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/profile", label: "Profile" },
  ];

  const currentLinks =
    role === "rider"
      ? riderLinks
      : role === "driver"
      ? driverLinks
      : role === "admin"
      ? adminLinks
      : publicLinks;

  const NavLinks = ({ mobile = false }) => (
    <div
      className={`flex ${
        mobile ? "flex-col space-y-2" : "items-center space-x-6"
      }`}
    >
      {currentLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Ridenest
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="User" />
                        <AvatarFallback>
                          {role ? role.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex flex-col">
                      <p className="font-medium">{name || "User"}</p>
                      <p className="text-sm text-muted-foreground">
                        {email || "user@example.com"}
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size={"sm"}>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size={"sm"}>Sign Up</Button>
                </Link>
              </div>
            )}
            <ModeToggle />
            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-4">
                  {/* Navigation Links */}
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

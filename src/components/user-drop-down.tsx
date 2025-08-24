import { useState } from "react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Laptop,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { Badge } from "./ui/badge";

interface IUser {
  name?: string;
  email?: string;
  role?: string;
}

type ThemeType = "light" | "dark" | "system";

export function UserDropdown() {
  const { setTheme, theme } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { name, email, role }: IUser = userInfo?.data || {};

  const handleLogout = async (): Promise<void> => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleThemeMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsThemeOpen((prev) => !prev);
  };

  const handleThemeChange = (
    newTheme: ThemeType,
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(newTheme);
    setIsThemeOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>
                {role ? role.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="flex flex-col items-start">
            <div className="flex justify-between w-full">
              <p className="font-medium">{name || "User"}</p>
              {role && <Badge variant="secondary">{role.toLowerCase()}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {email || "user@example.com"}
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to={`/${role?.toLowerCase()}/dashboard`}
              className="flex items-center w-full"
            >
             <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to={`/${role?.toLowerCase()}/profile`}
              className="flex items-center w-full"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <div className="w-full">
            <div
              className="flex items-center justify-between w-full cursor-pointer px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={toggleThemeMenu}
            >
              <div className="flex items-center">
                <Moon className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </div>
              {isThemeOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {isThemeOpen && (
              <div className="pl-8 py-1 space-y-1">
                {(["light", "dark", "system"] as ThemeType[]).map((t) => (
                  <div
                    key={t}
                    className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                      theme === t ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={(e) => handleThemeChange(t, e)}
                  >
                    {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                    {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                    {t === "system" && <Laptop className="mr-2 h-4 w-4" />}
                    <span className="capitalize">{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

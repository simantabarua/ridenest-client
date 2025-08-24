import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { UserDropdown } from "./user-drop-down";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const isLoggedIn = !!userInfo && !isLoading;

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const NavLinks = ({ mobile = false }) => (
    <div
      className={`flex ${
        mobile ? "flex-col space-y-2" : "items-center space-x-6"
      }`}
    >
      {publicLinks.map((link) => (
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
              <UserDropdown />
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

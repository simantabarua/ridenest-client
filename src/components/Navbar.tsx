import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { UserDropdown } from "./user-drop-down";
import { NotificationBell } from "./NotificationBell";
import Logo from "./logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const isLoggedIn = !!userInfo && !isLoading;

  const links = isLoggedIn
    ? [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Drivers" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "Help Center" },
        { href: "/blog", label: "Blog" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Drivers" },
        { href: "/about", label: "About" },
        { href: "/faq", label: "Help Center" },
      ];

  const NavLinks = ({ mobile = false }) => (
    <div
      className={`flex ${
        mobile ? "flex-col space-y-3" : "items-center space-x-2"
      }`}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="px-3 py-1.5 border border-transparent hover:border-foreground hover:bg-secondary/40 font-mono text-xs font-bold uppercase tracking-wide transition-all"
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background supports-[backdrop-filter]:bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn && <NotificationBell />}
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="px-4 py-2 border-2 border-transparent hover:border-foreground hover:bg-secondary/40 font-extrabold uppercase text-xs tracking-wider transition-all rounded-none h-9">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="px-4 py-2 border-2 border-foreground bg-yellow-400 text-foreground hover:bg-foreground hover:text-background font-extrabold uppercase text-xs tracking-wider shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all rounded-none h-9">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-2 border-foreground hover:bg-secondary/40 transition-colors rounded-none w-9 h-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-2 border-foreground p-6">
                <div className="flex flex-col space-y-6 mt-6">
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

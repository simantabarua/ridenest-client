import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router";
import Logo from "./logo";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-background border-t-2 border-foreground mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex justify-start">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted ride-sharing platform, connecting riders and drivers
              across Bangladesh with complete safety, fair pricing, and convenience.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  to={social.href}
                  className="w-10 h-10 bg-card border-2 border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-background shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-y-0.5 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="font-black uppercase tracking-tight text-sm border-b-2 border-foreground/10 pb-2">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground font-medium hover:underline decoration-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="font-black uppercase tracking-tight text-sm border-b-2 border-foreground/10 pb-2">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground font-medium hover:underline decoration-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-black uppercase tracking-tight text-sm border-b-2 border-foreground/10 pb-2">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-foreground shrink-0" />
                <span className="font-mono">support@ridenest.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-foreground shrink-0" />
                <span className="font-mono">+880 9612-445566</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-foreground shrink-0" />
                <span>123 Kazi Nazrul Islam Ave, Dhaka 1215, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t-2 border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              © 2026 Ridenest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline decoration-2 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline decoration-2 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline decoration-2 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

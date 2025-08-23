'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Car, 
  User, 
  LogOut, 
  Shield,
  MapPin,
  History,
  DollarSign,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router'

interface SidebarProps {
  userRole: 'rider' | 'driver' | 'admin'
  isCollapsed?: boolean
  onToggle?: () => void
}

export default function Sidebar({ userRole, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()

  const riderLinks = [
    { href: '/rider/dashboard', label: 'Dashboard', icon: Home },
    { href: '/rider/request-ride', label: 'Request Ride', icon: Car },
    { href: '/rider/ride-history', label: 'Ride History', icon: History },
    { href: '/rider/profile', label: 'Profile', icon: User },
    { href: '/rider/safety', label: 'Safety', icon: Shield },
  ]

  const driverLinks = [
    { href: '/driver/dashboard', label: 'Dashboard', icon: Home },
    { href: '/driver/incoming-requests', label: 'Requests', icon: Car },
    { href: '/driver/active-ride', label: 'Active Ride', icon: MapPin },
    { href: '/driver/earnings', label: 'Earnings', icon: DollarSign },
    { href: '/driver/ride-history', label: 'History', icon: History },
    { href: '/driver/profile', label: 'Profile', icon: User },
    { href: '/driver/safety', label: 'Safety', icon: Shield },
  ]

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/user-management', label: 'User Management', icon: Users },
    { href: '/admin/driver-management', label: 'Driver Management', icon: Car },
    { href: '/admin/ride-management', label: 'Ride Management', icon: MapPin },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/profile', label: 'Profile', icon: User },
  ]

  const currentLinks = userRole === 'rider' ? riderLinks : 
                      userRole === 'driver' ? driverLinks :
                      adminLinks

  const isActive = (href: string) => pathname === href

  return (
    <div className={cn(
      "border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Car className="w-6 h-6 text-primary" />
              <span className="font-semibold">RideShare</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {currentLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive(link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <link.icon className={cn(
                "flex-shrink-0",
                isCollapsed ? "mx-auto" : ""
              )} />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-foreground",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className={cn(
              "flex-shrink-0",
              isCollapsed ? "" : "mr-2"
            )} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import MainLayout from "@/layout/MainLayout";
import { withAuth } from "@/utils/useAuth";
import DashboardLayout from "@/layout/DashboardLayout";
import type { TRole } from "@/types";

// Public pages
const Home = lazy(() => import("@/pages/public/home"));
const About = lazy(() => import("@/pages/public/about"));
const Contact = lazy(() => import("@/pages/public/contact"));
const FAQ = lazy(() => import("@/pages/public/faq"));
const Guidelines = lazy(() => import("@/pages/public/guidelines"));
const Privacy = lazy(() => import("@/pages/public/privacy"));
const Terms = lazy(() => import("@/pages/public/terms"));
const UnauthorizedPage = lazy(() => import("@/pages/public/unauthorized"));
const NotFoundPage = lazy(() => import("@/pages/public/404"));

// Auth pages
const Login = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));
const OTPVerifyPage = lazy(() => import("@/pages/auth/otp"));

// Profile pages
const ProfileAdmin = lazy(() => import("@/pages/users/admin"));
const ProfileDriver = lazy(() => import("@/pages/users/driver"));
const ProfileRider = lazy(() => import("@/pages/users/rider"));

// Dashboard pages
export const AdminDashboard = () => <h1>Admin Dashboard</h1>;
export const DriverDashboard = () => <h1>Driver Dashboard</h1>;
export const RiderDashboard = () => <h1>Rider Dashboard</h1>;

// Rider pages
export const RequestRide = () => <h1>Request Ride</h1>;
export const RideHistoryRider = () => <h1>Ride History (Rider)</h1>;
export const SafetyRider = () => <h1>Safety (Rider)</h1>;

// Driver pages
export const IncomingRequests = () => <h1>Incoming Requests</h1>;
export const ActiveRide = () => <h1>Active Ride</h1>;
export const Earnings = () => <h1>Earnings</h1>;
export const RideHistoryDriver = () => <h1>Ride History (Driver)</h1>;
export const SafetyDriver = () => <h1>Safety (Driver)</h1>;

// Admin pages
export const UserManagement = () => <h1>User Management</h1>;
export const DriverManagement = () => <h1>Driver Management</h1>;
export const RideManagement = () => <h1>Ride Management</h1>;
export const Analytics = () => <h1>Analytics</h1>;

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "guidelines", Component: Guidelines },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: RegisterPage },
  { path: "/otp-verify", Component: OTPVerifyPage },
  { path: "/unauthorized", Component: UnauthorizedPage },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, "ADMIN" as TRole),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "dashboard", Component: AdminDashboard },
      { path: "user-management", Component: UserManagement },
      { path: "driver-management", Component: DriverManagement },
      { path: "ride-management", Component: RideManagement },
      { path: "analytics", Component: Analytics },
      { path: "profile", Component: ProfileAdmin },
    ],
  },
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, "DRIVER" as TRole),
    children: [
      { index: true, Component: DriverDashboard },
      { path: "dashboard", Component: DriverDashboard },
      { path: "incoming-requests", Component: IncomingRequests },
      { path: "active-ride", Component: ActiveRide },
      { path: "earnings", Component: Earnings },
      { path: "ride-history", Component: RideHistoryDriver },
      { path: "profile", Component: ProfileDriver },
      { path: "safety", Component: SafetyDriver },
    ],
  },
  {
    path: "/rider",
    Component: withAuth(DashboardLayout, "RIDER" as TRole),
    children: [
      { index: true, Component: RiderDashboard },
      { path: "dashboard", Component: RiderDashboard },
      { path: "request-ride", Component: RequestRide },
      { path: "ride-history", Component: RideHistoryRider },
      { path: "profile", Component: ProfileRider },
      { path: "safety", Component: SafetyRider },
    ],
  },

  { path: "*", Component: NotFoundPage },
]);

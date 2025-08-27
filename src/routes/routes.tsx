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

// Dashboard pages
const AdminDashboard = lazy(() => import("@/pages/users/admin/dashboard"));
const DriverDashboard = lazy(() => import("@/pages/users/driver/dashboard"));
const RiderDashboard = lazy(() => import("@/pages/users/rider/dashboard"));

// Rider pages
const RequestRide = lazy(() => import("@/pages/users/rider/request-ride"));
const RideHistoryRider = lazy(() => import("@/pages/users/rider/ride-history"));
const ProfileRider = lazy(() => import("@/pages/users/rider/profile"));
const TrackingPage = lazy(() => import("@/pages/users/rider/tracking"));
const RideDetails = lazy(() => import("@/pages/users/rider/ride-details"));
const ApplyDriver = lazy(() => import("@/pages/users/apply-driver"));
// Driver pages
const IncomingRequests = lazy(
  () => import("@/pages/users/driver/incoming-requests")
);
const ActiveRide = lazy(() => import("@/pages/users/driver/active-ride"));
const RideHistoryDriver = lazy(
  () => import("@/pages/users/driver/ride-history")
);
const ProfileDriver = lazy(() => import("@/pages/users/driver/profile"));

// Admin pages
const UserManagement = lazy(
  () => import("@/pages/users/admin/user-management")
);
const DriverManagement = lazy(
  () => import("@/pages/users/admin/driver-management")
);
const RideManagement = lazy(
  () => import("@/pages/users/admin/ride-management")
);
const ProfileAdmin = lazy(() => import("@/pages/users/admin/profile"));

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
      { path: "profile", Component: ProfileAdmin },
      { path: "ride/:rideId", Component: RideDetails },
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
      { path: "ride-history", Component: RideHistoryDriver },
      { path: "profile", Component: ProfileDriver },
      { path: "update-driver-profile", Component: ApplyDriver },
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
      { path: "tracking", Component: TrackingPage },
      { path: "ride/:rideId", Component: RideDetails },
      { path: "apply-for-driver", Component: ApplyDriver },
    ],
  },

  { path: "*", Component: NotFoundPage },
]);

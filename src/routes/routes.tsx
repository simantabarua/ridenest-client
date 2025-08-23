import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import MainLayout from "@/layout/MainLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { withAuth } from "@/utils/useAuth";
import type { TRole } from "@/types";

const Home = lazy(() => import("@/pages/public/home"));
const About = lazy(() => import("@/pages/public/about"));
const Contact = lazy(() => import("@/pages/public/contact"));
const FAQ = lazy(() => import("@/pages/public/faq"));
const Guidelines = lazy(() => import("@/pages/public/guidelines"));
const Privacy = lazy(() => import("@/pages/public/privacy"));
const Terms = lazy(() => import("@/pages/public/terms"));
const UnauthorizedPage = lazy(() => import("@/pages/public/unauthorized"));
const NotFoundPage = lazy(() => import("@/pages/public/404"));

const Login = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));
const OTPVerifyPage = lazy(() => import("@/pages/auth/otp"));

const ProfileAdmin = lazy(() => import("@/pages/users/admin"));
const ProfileDriver = lazy(() => import("@/pages/users/driver"));
const ProfileRider = lazy(() => import("@/pages/users/rider"));

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
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: ProfileAdmin },
      {
        path: "admin/dashboard",
        Component: withAuth(ProfileAdmin, "admin" as TRole),
      },
      {
        path: "driver/dashboard",
        Component: withAuth(ProfileDriver, "driver" as TRole),
      },
      {
        path: "rider/dashboard",
        Component: withAuth(ProfileRider, "rider" as TRole),
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);

import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import MainLayout from "@/layout/MainLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import Loadable from "@/utils/loderpage";

const Home = lazy(() => import("@/pages/public/home"));
const About = lazy(() => import("@/pages/public/about"));
const Contact = lazy(() => import("@/pages/public/contact"));
const FAQ = lazy(() => import("@/pages/public/faq"));
const Guidelines = lazy(() => import("@/pages/public/guidelines"));
const Privacy = lazy(() => import("@/pages/public/privacy"));
const Terms = lazy(() => import("@/pages/public/terms"));
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
      { index: true, Component: Loadable(Home) },
      { path: "about", Component: Loadable(About) },
      { path: "contact", Component: Loadable(Contact) },
      { path: "faq", Component: Loadable(FAQ) },
      { path: "guidelines", Component: Loadable(Guidelines) },
      { path: "privacy", Component: Loadable(Privacy) },
      { path: "terms", Component: Loadable(Terms) },
    ],
  },
  { path: "/login", Component: Loadable(Login) },
  { path: "/register", Component: Loadable(RegisterPage) },
  { path: "/otp-verify", Component: Loadable(OTPVerifyPage) },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Loadable(ProfileAdmin) },
      { path: "admin/dashboard", Component: Loadable(ProfileAdmin) },
      { path: "driver/dashboard", Component: Loadable(ProfileDriver) },
      { path: "rider/dashboard", Component: Loadable(ProfileRider) },
    ],
  },
]);

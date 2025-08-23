import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import OTPVerifyPage from "@/pages/otp";
import RegisterPage from "@/pages/register";
import ProfileAdmin from "@/pages/users/admin";
import ProfileDriver from "@/pages/users/driver";
import ProfileRider from "@/pages/users/rider";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/otp-verify",
    Component: OTPVerifyPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: ProfileAdmin,
      },
      {
        path: "admin/dashboard",
        Component: ProfileAdmin,
      },
      {
        path: "driver/dashboard",
        Component: ProfileDriver,
      },
      {
        path: "rider/dashboard",
        Component: ProfileRider,
      },
    ],
  },
]);

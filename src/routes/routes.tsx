import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import RegisterPage from "@/pages/register";
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
]);

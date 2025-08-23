import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <main>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}

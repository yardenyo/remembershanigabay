import HeroSection from "@/components/HeroSection";
import BackgroundSound from "@/components/BackgroundSound";
import ToTop from "@/components/ToTop";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="font-body relative">
      <HeroSection />
      <BackgroundSound />
      <ToTop />
      <Outlet />
    </main>
  );
};

export default Layout;

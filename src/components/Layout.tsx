import HeroSection from "@/components/HeroSection";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="font-body">
      <HeroSection />
      <Outlet />
    </main>
  );
};

export default Layout;

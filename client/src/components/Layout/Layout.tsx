import HeroSection from "@/components/Layout/HeroSection";
import BackgroundSound from "@/components/Layout/BackgroundSound";
import ToTop from "@/components/Layout/ToTop";
import NoTimeForDrama from "@/components/Layout/NoTimeForDrama";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  }, []);

  return (
    <main className="font-body relative overflow-x-hidden">
      {isPlaying ? (
        <NoTimeForDrama />
      ) : (
        <>
          <HeroSection />
          <BackgroundSound />
          <ToTop />
          <Outlet />
        </>
      )}
    </main>
  );
};

export default Layout;

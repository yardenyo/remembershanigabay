import HeroSection from "@/components/HeroSection";
import BackgroundSound from "@/components/BackgroundSound";
import ToTop from "@/components/ToTop";
import NoTimeForDrama from "@/components/NoTimeForDrama";
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
    <main className="font-body relative">
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

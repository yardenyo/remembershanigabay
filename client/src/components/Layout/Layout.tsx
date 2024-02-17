import HeroSection from "@/components/Layout/HeroSection";
import BackgroundSound from "@/components/Layout/BackgroundSound";
import ToTop from "@/components/Layout/ToTop";
import NoTimeForDrama from "@/components/Layout/NoTimeForDrama";
import Footer from "@/components/Layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      scroll.scrollToTop({
        duration: 500,
        smooth: "easeInOutQuad",
      });
    }
  }, [pathname]);

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
          <Footer />
        </>
      )}
    </main>
  );
};

export default Layout;

import { useEffect, useState } from "react";

const ToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-3 lg:bottom-16 right-5 z-50 bg-gray-300 bg-opacity-50 px-4 py-3 rounded-full hover:bg-opacity-100 transition duration-500 ease-in-out cursor-pointer ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={handleScrollToTop}
    >
      <i className="pi pi-arrow-up text-lg transition duration-500 ease-in-out"></i>
    </div>
  );
};

export default ToTop;

import Navbar from "@/components/Layout/Navbar";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] flex flex-col lg:flex-row border-b border-black border-opacity-5">
      <div className="absolute w-full z-50">
        <Navbar />
      </div>
      <div className="w-full lg:w-1/2">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1707639246/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_gmfy2u.webp"
          alt="shani's picture"
          className="object-cover h-[80vh] lg:h-full w-full pointer-events-none"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 absolute top-1/2 lg:relative lg:top-0 lg:border-none border border-black border-opacity-20 bg-white bg-opacity-80 py-8 lg:py-0">
        <h1 className="text-4xl font-semibold">
          זוכרים את <span className="text-red-500">שני</span> גבאי
        </h1>
        <div className="text-2xl">
          אתר הנצחה לזכרה של <span className="text-red-500">שני</span> גבאי הי"ד
        </div>
        <div className="flex mt-4 gap-4">
          <Link to="/memory-book">
            <button className="btn-hero btn-primary">ספר הזכרונות</button>
          </Link>
          <HashLink smooth to="/#donate">
            <button className="btn-hero btn-secondary">תרומה לעמותה</button>
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

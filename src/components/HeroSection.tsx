import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] flex flex-col md:flex-row border-b border-black shadow-lg">
      <div className="absolute top-4 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1702896957/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_kw2vxi.png"
          alt="shani's picture"
          className="object-cover h-[80vh] md:h-full w-full pointer-events-none"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 absolute top-1/2 md:relative md:top-0">
        <div className="text-4xl font-semibold">זוכרים את שני גבאי ז"ל</div>
        <div className="text-2xl">אתר הנצחה לזכרה של שני גבאי הי"ד</div>
        <div className="flex mt-4 gap-4">
          <button className="btn btn-primary">
            <Link to="/memory-book">ספר הזכרונות</Link>
          </button>
          <button className="btn btn-secondary">
            <Link to="/contact">צרו קשר</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

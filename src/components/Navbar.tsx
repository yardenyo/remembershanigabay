import { Link } from "react-router-dom";
import NavbarLinks from "@/constants/NavbarLinks";
import { useState } from "react";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <div className="container mx-auto p-2 navbar">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold navbar-link">
          <Link to="/">
            דף הבית של <span className="text-red-500">שני</span>
          </Link>
        </div>
        <div className="lg:hidden flex" onClick={toggleNavbar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            ></path>
          </svg>
        </div>
        <div className={`lg:flex gap-4 hidden items-center`}>
          {NavbarLinks.map((link) => (
            <div key={link.key} className="navbar-link">
              <Link to={link.path}>{link.title}</Link>
            </div>
          ))}
        </div>
      </div>

      {navbarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 z-50">
          <div className="flex justify-end p-4">
            <div className="cursor-pointer" onClick={toggleNavbar}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            {NavbarLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className="navbar-link py-2 text-white"
                onClick={toggleNavbar}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

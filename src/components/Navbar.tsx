import { Link } from "react-router-dom";
import NavbarLinks from "@/constants/NavbarLinks";

const Navbar = () => {
  return (
    <div className="container mx-auto p-2 navbar">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold navbar-link">
          <Link to="/">הבית של שני</Link>
        </div>
        <div className="md:flex gap-4 hidden">
          {NavbarLinks.map((link) => (
            <div key={link.key} className="navbar-link">
              <Link to={link.path}>{link.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

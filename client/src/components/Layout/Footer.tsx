import NavbarLinks from "@/constants/NavbarLinks";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-gray-100/20 container mx-auto flex flex-col lg:flex-row justify-between py-8">
      <div className="logo-section">
        <Link smooth to="/">
          <div className="text-2xl font-semibold navbar-link text-center lg:text-right">
            דף הבית של <span className="text-red-500">שני</span>
          </div>
        </Link>
      </div>
      <div className="links-section flex-col p-4 lg:p-0">
        <div className="flex flex-col text-center lg:flex-row lg:text-right gap-4">
          {NavbarLinks.map((link) => (
            <div key={link.key} className="navbar-link">
              <Link smooth to={link.path}>
                {link.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="border-t border-black border-opacity-10 mt-4 pt-4 flex justify-center">
          <div className="navbar-link">
            <Link smooth to="https://linktr.ee/JorDigitall" target="_blank">
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div>&copy; {new Date().getFullYear()}, JorDigital.</div>
                <div>כל הזכויות שמורות.</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="social-media-section">
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://www.facebook.com/remember.shani.gabay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-facebook social-media-link text-2xl"></i>
          </a>
          <a
            href="https://www.instagram.com/remember_shani_gabay/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-instagram social-media-link text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

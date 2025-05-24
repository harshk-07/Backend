import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl animate-pulse">❤️</span>
            <span className="text-xl font-bold">
              <span className="text-red-600">Life</span>
              <span className="text-gray-800">Share</span>
            </span>
          </Link>

          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>

          <ul className="hidden lg:flex items-center space-x-8">
            {[
              { path: "/", label: "Home", icon: "🏠" },
              { path: "/about", label: "About Us", icon: "ℹ️" },
              { path: "/register", label: "Register", icon: "📝" },
              { path: "/donors", label: "Donor List", icon: "👥" },
              { path: "/patients", label: "Patients", icon: "🏥" },
              { path: "/contact", label: "Contact", icon: "📞" },
              { path: "/adminlogin", label: "Admin", icon: "🔐" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col space-y-2">
            {[
              { path: "/", label: "Home", icon: "🏠" },
              { path: "/about", label: "About Us", icon: "ℹ️" },
              { path: "/register", label: "Register", icon: "📝" },
              { path: "/donors", label: "Donor List", icon: "👥" },
              { path: "/patients", label: "Patients", icon: "🏥" },
              { path: "/contact", label: "Contact", icon: "📞" },
              { path: "/adminlogin", label: "Admin", icon: "🔐" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

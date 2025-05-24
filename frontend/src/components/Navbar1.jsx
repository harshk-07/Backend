import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar1 = () => {
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
      style={{ zIndex: 9999 }}
    >
      <nav className="container px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="" className="flex items-center space-x-2">
            <span className="text-2xl animate-pulse">❤️</span>
            <span className="text-xl font-bold">
              <span className="text-red-600">Life</span>
              <span className="text-gray-800">Share</span>
            </span>
          </Link>
          <Link to="/">
            <button>Logout</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar1;

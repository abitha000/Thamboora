import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Phone } from "lucide-react";

const Navigation = ({ scrolled }) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "reservations", label: "Reserve" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between py-6">
          <Link to="home" smooth={true} duration={500} className="cursor-pointer">
            <div className="font-playfair text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Thamboora
              <span className="block text-sm font-normal font-manrope tracking-widest text-[#66605B]">தம்புரா உணவகம்</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id}
                smooth={true}
                duration={500}
                spy={true}
                offset={-100}
                className="font-manrope text-sm tracking-wider uppercase cursor-pointer text-[#1A1A1A] hover:text-[#C7A17A] transition-colors duration-300"
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="tel:+919978956000"
            className="hidden md:flex items-center gap-2 bg-[#C7A17A] text-white px-6 py-3 rounded-none hover:bg-[#B08D69] transition-all duration-300"
            data-testid="nav-call-button"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call Now</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

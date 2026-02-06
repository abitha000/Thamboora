import React from "react";
import { Link } from "react-scroll";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-playfair text-3xl font-bold tracking-tight mb-2">
              Thamboora
            </div>
            <div className="font-manrope text-sm tracking-widest text-white/60 mb-4">தம்புரா உணவகம்</div>
            <p className="font-manrope text-sm text-white/80 leading-relaxed">
              A symphony of flavors where heritage meets refinement.
            </p>
          </div>

          <div>
            <h4 className="font-manrope text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <div className="space-y-3">
              {["home", "about", "menu", "gallery", "reservations", "contact"].map((link) => (
                <Link
                  key={link}
                  to={link}
                  smooth={true}
                  duration={500}
                  className="block font-manrope text-sm text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer capitalize"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-manrope text-sm uppercase tracking-widest mb-6">Contact</h4>
            <div className="space-y-3 font-manrope text-sm text-white/70">
              <p>Salem, Tamil Nadu</p>
              <a href="tel:+919978956000" className="block hover:text-[#D4AF37] transition-colors">
                +91 9978956000
              </a>
              <a href="mailto:thamboorasalem@gmail.com" className="block hover:text-[#D4AF37] transition-colors">
                thamboorasalem@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-manrope text-sm text-white/60">
            © {new Date().getFullYear()} Thamboora Restaurant. Crafted with <Heart className="inline w-4 h-4 text-[#D4AF37]" /> for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

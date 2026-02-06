import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/thambooraback.jpg"
          alt="Thamboora Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
            A Symphony of
            <br />
            <span className="text-[#D4AF37]">Flavors</span>
          </h1>
          <p className="font-manrope text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-12 tracking-wide">
            Where Indian heritage meets global refinement.
            <br />Experience culinary excellence in every bite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-testid="hero-cta-group">
            <Link
              to="menu"
              smooth={true}
              duration={500}
              className="cursor-pointer bg-[#C7A17A] text-white hover:bg-[#B08D69] transition-all duration-300 px-10 py-5 text-sm uppercase tracking-widest font-semibold"
              data-testid="hero-view-menu-btn"
            >
              View Menu
            </Link>
            <Link
              to="reservations"
              smooth={true}
              duration={500}
              className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 px-10 py-5 text-sm uppercase tracking-widest font-semibold"
              data-testid="hero-reserve-btn"
            >
              Reserve Table
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12"
        >
          <Link to="about" smooth={true} duration={500} className="cursor-pointer">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-8 h-8 text-white" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

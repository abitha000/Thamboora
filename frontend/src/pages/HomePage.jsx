import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SignatureSection from "@/components/SignatureSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ReservationSection from "@/components/ReservationSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <AboutSection />
      <SignatureSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default HomePage;

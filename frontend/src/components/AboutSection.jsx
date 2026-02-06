import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F9F5F0] grain-texture">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[500px] overflow-hidden">
              <img
                src="https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/pqxo02uk_Screenshot_2026-02-06-14-29-31-97_3d9111e2d3171bf4882369f490c087b4.jpg"
                alt="Signature tandoori kebabs"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-cormorant italic text-lg text-[#C7A17A] mb-4 tracking-wide">Our Story</p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-8 leading-none tracking-tight">
              Harmony in
              <br />Every Dish
            </h2>
            <div className="space-y-6 text-[#1A1A1A] font-manrope tracking-wide">
              <p className="text-base leading-relaxed">
                <span className="font-playfair text-xl italic">Thamboora</span> — a name rooted in rhythm and resonance. Just as the
                tamboura creates harmonic layers in classical music, our cuisine weaves together diverse culinary traditions into
                something extraordinary.
              </p>
              <p className="text-base leading-relaxed">
                From aromatic North Indian curries to refined Continental classics, from sizzling Oriental woks to our legendary
                Hyderabadi biryanis — each dish is crafted with precision, passion, and respect for heritage.
              </p>
              <p className="text-base leading-relaxed">
                We believe dining is more than sustenance. It's celebration. It's connection. It's an experience that lingers long
                after the last bite.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

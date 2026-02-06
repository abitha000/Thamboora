import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

const SignatureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const signatures = [
    {
      name: "Hyderabadi Dum Biryani",
      description: "Fragrant basmati layered with tender meat, slow-cooked to perfection in sealed earthen pots.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      badge: "Signature",
    },
    {
      name: "Tandoori Sizzlers",
      description: "Succulent kebabs kissed by charcoal fire, served with aromatic accompaniments.",
      image: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/pqxo02uk_Screenshot_2026-02-06-14-29-31-97_3d9111e2d3171bf4882369f490c087b4.jpg",
      badge: "Chef's Special",
    },
    {
      name: "Exotic Fondue",
      description: "Melted indulgence with fresh vegetables, a fusion experience like no other.",
      image: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/pm6h3nbw_Screenshot_2026-02-06-14-28-52-99_3d9111e2d3171bf4882369f490c087b4.jpg",
      badge: "Unique",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant italic text-lg text-[#C7A17A] mb-4 tracking-wide">Curated Excellence</p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-none">
            Signature Highlights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {signatures.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden bg-white border border-[#E5E0D8] hover:border-[#C7A17A]/30 transition-all duration-500"
              data-testid={`signature-dish-${index}`}
            >
              <div className="relative h-[350px] overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#D4AF37] text-[#1A1A1A] px-4 py-2 font-cormorant italic text-sm flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    {item.badge}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-3">{item.name}</h3>
                <p className="font-manrope text-sm text-[#66605B] leading-relaxed tracking-wide">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;

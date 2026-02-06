import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const galleryImages = [
    {
      url: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/2xu8qxci_Screenshot_2026-02-06-14-30-25-76_3d9111e2d3171bf4882369f490c087b4.jpg",
      alt: "Restaurant Interior",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/pm6h3nbw_Screenshot_2026-02-06-14-28-52-99_3d9111e2d3171bf4882369f490c087b4.jpg",
      alt: "Cheese Fondue",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/pqxo02uk_Screenshot_2026-02-06-14-29-31-97_3d9111e2d3171bf4882369f490c087b4.jpg",
      alt: "Tandoori Sizzlers",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/ouyci3qe_Screenshot_2026-02-06-14-29-21-25_3d9111e2d3171bf4882369f490c087b4.jpg",
      alt: "Crispy Fried Chicken",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://customer-assets.emergentagent.com/job_dine-thamboora/artifacts/rgmtou1y_Screenshot_2026-02-06-14-29-09-47_3d9111e2d3171bf4882369f490c087b4.jpg",
      alt: "Grilled Chicken Tikka",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant italic text-lg text-[#C7A17A] mb-4 tracking-wide">Visual Journey</p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-none">
            Experience
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group ${image.span}`}
              data-testid={`gallery-image-${index}`}
            >
              <motion.img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

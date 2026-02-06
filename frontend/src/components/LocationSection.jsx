import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9978956000",
      link: "tel:+919978956000",
    },
    {
      icon: Mail,
      title: "Email",
      value: "thamboorasalem@gmail.com",
      link: "mailto:thamboorasalem@gmail.com",
    },
    {
      icon: Clock,
      title: "Hours",
      value: "11:00 AM - 11:00 PM Daily",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F9F5F0] grain-texture">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant italic text-lg text-[#C7A17A] mb-4 tracking-wide">Find Us</p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-none">
            Visit Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white p-8 border border-[#E5E0D8] h-full">
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-6 h-6 text-[#C7A17A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">Address</h3>
                  <p className="font-manrope text-base text-[#66605B] leading-relaxed">
                    Thamboora Restaurant
                    <br />
                    Salem, Tamil Nadu
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <item.icon className="w-5 h-5 text-[#C7A17A] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-1">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="font-manrope text-base text-[#C7A17A] hover:text-[#B08D69] transition-colors"
                          data-testid={`contact-${item.title.toLowerCase()}`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-manrope text-base text-[#66605B]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#E5E0D8]">
                <a
                  href="https://wa.me/919978956000?text=Hello%20Thamboora!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] text-white hover:bg-[#20BA59] transition-all duration-300 px-8 py-4 text-center text-sm uppercase tracking-widest font-semibold"
                  data-testid="contact-whatsapp-btn"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full h-[500px] border border-[#E5E0D8] overflow-hidden" data-testid="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31255.42!2d78.15!3d11.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM5JzAwLjAiTiA3OMKwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thamboora Restaurant Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

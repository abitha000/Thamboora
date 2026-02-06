import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, Users, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReservationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    special_requests: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/reservations`, {
        ...formData,
        guests: parseInt(formData.guests),
      });

      if (response.status === 200) {
        toast.success("Reservation confirmed! We'll contact you shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "2",
          special_requests: "",
        });
      }
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error("Failed to submit reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappReserve = () => {
    const message = `Hi Thamboora! I'd like to make a reservation for ${formData.guests} guests on ${formData.date} at ${formData.time}.`;
    const whatsappUrl = `https://wa.me/919978956000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="reservations" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#2A2A2A] grain-texture">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant italic text-lg text-[#D4AF37] mb-4 tracking-wide">Your Table Awaits</p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
            Reserve Your Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8" data-testid="reservation-form">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  placeholder="Your name"
                  data-testid="reservation-name-input"
                />
              </div>

              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  placeholder="your@email.com"
                  data-testid="reservation-email-input"
                />
              </div>

              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  placeholder="+91 XXXXX XXXXX"
                  data-testid="reservation-phone-input"
                />
              </div>

              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C7A17A]" />
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  data-testid="reservation-guests-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C7A17A]" />
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  data-testid="reservation-date-input"
                />
              </div>

              <div>
                <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C7A17A]" />
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base"
                  data-testid="reservation-time-input"
                />
              </div>
            </div>

            <div>
              <label className="block font-manrope text-sm uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C7A17A]" />
                Special Requests
              </label>
              <textarea
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-4 border border-[#E5E0D8] focus:border-[#C7A17A] outline-none transition-colors font-manrope text-base resize-none"
                placeholder="Dietary restrictions, special occasions, seating preferences..."
                data-testid="reservation-requests-textarea"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C7A17A] text-white hover:bg-[#B08D69] transition-all duration-300 px-8 py-5 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                data-testid="reservation-submit-btn"
              >
                <Send className="w-4 h-4" />
                {loading ? "Submitting..." : "Confirm Reservation"}
              </button>

              <button
                type="button"
                onClick={whatsappReserve}
                className="flex-1 border-2 border-[#C7A17A] text-[#C7A17A] hover:bg-[#C7A17A] hover:text-white transition-all duration-300 px-8 py-5 text-sm uppercase tracking-widest font-semibold"
                data-testid="reservation-whatsapp-btn"
              >
                Reserve via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationSection;

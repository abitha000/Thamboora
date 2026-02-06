import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("biryani");

  const menuData = {
    biryani: {
      title: "Biryani Specials",
      items: [
        { name: "Hyderabadi Dum Biryani (Chicken)", price: "₹450" },
        { name: "Hyderabadi Dum Biryani (Mutton)", price: "₹550" },
        { name: "Vegetable Biryani", price: "₹350" },
        { name: "Paneer Biryani", price: "₹380" },
        { name: "Egg Biryani", price: "₹320" },
      ],
    },
    indian: {
      title: "Indian Main Course",
      items: [
        { name: "Butter Chicken", price: "₹420" },
        { name: "Chicken Tikka Masala", price: "₹440" },
        { name: "Mutton Rogan Josh", price: "₹520" },
        { name: "Paneer Butter Masala", price: "₹380" },
        { name: "Dal Makhani", price: "₹280" },
        { name: "Palak Paneer", price: "₹360" },
        { name: "Kadai Chicken", price: "₹430" },
        { name: "Chettinad Chicken Curry", price: "₹450" },
      ],
    },
    tandoor: {
      title: "Tandoor & Starters",
      items: [
        { name: "Chicken Tikka", price: "₹380" },
        { name: "Tandoori Chicken (Full)", price: "₹550" },
        { name: "Tandoori Chicken (Half)", price: "₹320" },
        { name: "Malai Chicken Tikka", price: "₹400" },
        { name: "Mutton Seekh Kebab", price: "₹480" },
        { name: "Paneer Tikka", price: "₹350" },
        { name: "Chicken 65", price: "₹360" },
        { name: "Crispy Fried Chicken", price: "₹340" },
      ],
    },
    continental: {
      title: "Continental Delights",
      items: [
        { name: "Grilled Chicken Steak", price: "₹520" },
        { name: "Herb Crusted Fish Fillet", price: "₹580" },
        { name: "Spaghetti Aglio e Olio", price: "₹380" },
        { name: "Penne Arrabbiata", price: "₹360" },
        { name: "Margherita Pizza", price: "₹420" },
        { name: "BBQ Chicken Pizza", price: "₹480" },
        { name: "Classic Caesar Salad", price: "₹320" },
      ],
    },
    oriental: {
      title: "Oriental & Asian",
      items: [
        { name: "Hakka Noodles (Veg)", price: "₹280" },
        { name: "Hakka Noodles (Chicken)", price: "₹340" },
        { name: "Schezwan Fried Rice", price: "₹320" },
        { name: "Chilli Chicken", price: "₹380" },
        { name: "Manchurian (Veg)", price: "₹300" },
        { name: "Sweet & Sour Chicken", price: "₹390" },
        { name: "Thai Green Curry", price: "₹420" },
      ],
    },
    breads: {
      title: "Breads & Rolls",
      items: [
        { name: "Butter Naan", price: "₹80" },
        { name: "Garlic Naan", price: "₹100" },
        { name: "Tandoori Roti", price: "₹60" },
        { name: "Cheese Naan", price: "₹140" },
        { name: "Laccha Paratha", price: "₹90" },
        { name: "Chicken Tikka Roll", price: "₹280" },
        { name: "Paneer Roll", price: "₹240" },
        { name: "Veg Spring Roll", price: "₹220" },
      ],
    },
    fondue: {
      title: "Fondue & Specials",
      items: [
        { name: "Cheese Fondue with Veggies", price: "₹680" },
        { name: "Chocolate Fondue (Dessert)", price: "₹480" },
        { name: "Exotic Fondue Platter", price: "₹750" },
      ],
    },
  };

  const categories = [
    { id: "biryani", label: "Biryani" },
    { id: "indian", label: "Indian" },
    { id: "tandoor", label: "Tandoor" },
    { id: "continental", label: "Continental" },
    { id: "oriental", label: "Oriental" },
    { id: "breads", label: "Breads & Rolls" },
    { id: "fondue", label: "Fondue" },
  ];

  return (
    <section id="menu" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F9F5F0] grain-texture">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant italic text-lg text-[#C7A17A] mb-4 tracking-wide">Explore Our Offerings</p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-none">
            Our Menu
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" data-testid="menu-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 font-manrope text-sm uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#C7A17A] text-white"
                  : "bg-white text-[#1A1A1A] border border-[#E5E0D8] hover:border-[#C7A17A]"
              }`}
              data-testid={`menu-tab-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 border border-[#E5E0D8]"
        >
          <h3 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-8 text-center">
            {menuData[activeCategory].title}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {menuData[activeCategory].items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-b border-[#E5E0D8]/50 pb-4 hover:border-[#C7A17A]/50 transition-colors duration-300 group"
                data-testid={`menu-item-${index}`}
              >
                <span className="font-manrope text-base text-[#1A1A1A] group-hover:text-[#C7A17A] transition-colors">
                  {item.name}
                </span>
                <span className="font-cormorant text-lg font-semibold text-[#C7A17A] ml-4">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;

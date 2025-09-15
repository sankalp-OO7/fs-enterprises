// src/components/Demo.jsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// You will place these images in your public/ folder
const imageNames = {
  "pvc-pipe-1": "/pvc-pipe-plumbing.jpg",
  "pvc-fittings-elbow": "/pvc-fitting-elbow.jpg",
  "pvc-pipe-2": "/pvc-pipe-heavy-duty.jpg",
  "pvc-fittings-reducer": "/pvc-fitting-reducer.jpg",
  tools: "/tools.jpg",
  fasteners: "/fasteners.jpg",
  building: "/building.jpg",
  paints: "/paints.jpg",
  drill: "/drill.png",
};

// Define your color palette and other utility functions here
const hardwareColors = {
  primary: {
    orange: "#f97316", // Orange-500
    gray: "#374151", // Gray-700
    darkGray: "#1f2937", // Gray-800
    lightGray: "#e5e7eb", // Gray-200
  },
  accent: {
    blue: "#2563eb",
    green: "#16a34a",
    red: "#dc2626",
  },
  background: {
    gradient: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)",
  },
};

const CategoryIcon = ({ type, className = "" }) => {
  // Your SVG icons from the previous code
  const icons = {
    tools: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.rect
          x="10"
          y="20"
          width="60"
          height="40"
          fill="#4b5563"
          rx="8"
          initial={{ height: 0, y: 60 }}
          animate={{ height: 40, y: 20 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.rect
          x="30"
          y="15"
          width="20"
          height="5"
          fill="#374151"
          rx="2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.path
          d="M 25 35 L 55 35 L 50 55 L 30 55 Z"
          fill="#f97316"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
      </motion.svg>
    ),
    fasteners: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.circle
          cx="40"
          cy="40"
          r="20"
          stroke="#4b5563"
          strokeWidth="3"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line
          x1="40"
          y1="20"
          x2="40"
          y2="60"
          stroke="#4b5563"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.line
          x1="20"
          y1="40"
          x2="60"
          y2="40"
          stroke="#4b5563"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.circle
          cx="40"
          cy="40"
          r="5"
          fill="#f97316"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
      </motion.svg>
    ),
    pipes: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.rect
          x="15"
          y="25"
          width="50"
          height="15"
          fill="#6b7280"
          rx="4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.rect
          x="30"
          y="40"
          width="40"
          height="15"
          fill="#9ca3af"
          rx="4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </motion.svg>
    ),
    building: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.rect
          x="20"
          y="30"
          width="40"
          height="30"
          fill="#f97316"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.line
          x1="20"
          y1="40"
          x2="60"
          y2="40"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.line
          x1="20"
          y1="50"
          x2="60"
          y2="50"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.polygon
          points="40,15 65,30 15,30"
          fill="#6b7280"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
      </motion.svg>
    ),
    electrical: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M40,20 L40,60 M20,40 L60,40 M30,30 L50,50 M30,50 L50,30"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.circle
          cx="40"
          cy="40"
          r="10"
          stroke="#f97316"
          strokeWidth="3"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </motion.svg>
    ),
    paints: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.rect
          x="20"
          y="25"
          width="40"
          height="40"
          fill="#94a3b8"
          rx="5"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d="M25,25 L25,20 C25,15 30,15 40,15 C50,15 55,15 55,20 L55,25"
          stroke="#4b5563"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.path
          d="M25,65 C30,68 50,68 55,65"
          stroke="#dc2626"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </motion.svg>
    ),
  };
  return icons[type] || icons.tools;
};

// Mock product data - to be replaced with an API call
const allProducts = [
  {
    id: "pvc-pipe-1",
    title: "PVC Plumbing Pipe (Class A)",
    category: "Plumbing",
    subCategory: "Pipes",
    description:
      "Durable and corrosion-resistant PVC pipe for a wide range of plumbing applications. Lightweight and easy to install.",
    fullDescription:
      "This premium-quality PVC pipe is designed for superior durability and corrosion resistance. It is lightweight, easy to install, and provides a leak-proof connection for all residential and commercial plumbing applications. It is non-toxic and safe for drinking water supply.",
    price: 600.0,
    iconType: "pipes",
    image: imageNames["pvc-pipe-1"],
    specifications: {
      material: "Unplasticized Polyvinyl Chloride (UPVC)",
      size: "4 inch diameter",
      length: "3 meters",
      pressureRating: "Class A (4 kg/cm²)",
      color: "Gray",
    },
  },
  {
    id: "pvc-fittings-elbow",
    title: "4-inch PVC Elbow (90°)",
    category: "Plumbing",
    subCategory: "Fittings",
    description:
      "High-quality 90-degree PVC elbow for making sharp turns in plumbing and drainage systems.",
    fullDescription:
      "This is a heavy-duty 90-degree PVC elbow fitting, essential for changing the direction of fluid flow in a piping system. Its smooth interior walls reduce flow restriction and turbulence, ensuring efficient performance.",
    price: 85.0,
    iconType: "pipes",
    image: imageNames["pvc-fittings-elbow"],
    specifications: {
      material: "Polyvinyl Chloride (PVC)",
      size: "4 inch",
      angle: "90 degrees",
      connection: "Slip joint",
      color: "White",
    },
  },
  {
    id: "pvc-pipe-2",
    title: "Heavy Duty PVC Pipe (Sch 40)",
    category: "Construction",
    subCategory: "Pipes",
    description:
      "A thicker, more rigid PVC pipe ideal for pressure applications and structural support.",
    fullDescription:
      "A thicker, more rigid PVC pipe ideal for pressure applications and structural support.",
    price: 850.0,
    iconType: "building",
    image: imageNames["pvc-pipe-2"],
    specifications: {
      material: "Polyvinyl Chloride (PVC)",
      size: "6 inch diameter",
      length: "3 meters",
      pressureRating: "Schedule 40",
      color: "White",
    },
  },
  {
    id: "pvc-fittings-reducer",
    title: 'PVC Pipe Reducer (4" to 2")',
    category: "Plumbing",
    subCategory: "Fittings",
    description:
      "A fitting used to connect pipes of different sizes, ensuring a tight and secure seal.",
    fullDescription:
      "A fitting used to connect pipes of different sizes, ensuring a tight and secure seal.",
    price: 120.0,
    iconType: "pipes",
    image: imageNames["pvc-fittings-reducer"],
    specifications: {
      material: "Polyvinyl Chloride (PVC)",
      size: "4 inch to 2 inch",
      connection: "Slip joint",
      color: "White",
    },
  },
  {
    id: "hand-tools-1",
    title: "Hand Tools Kit",
    category: "Professional Grade",
    description:
      "A comprehensive kit with essential hand tools for all professional and DIY projects.",
    fullDescription:
      "This kit includes everything from wrenches and pliers to screwdrivers and measuring tapes, all made from high-quality, durable materials for long-lasting use.",
    price: 1200.0,
    iconType: "tools",
    image: imageNames["tools"],
    specifications: {
      items: "Wrenches, Pliers, Screwdrivers, etc.",
      material: "Chrome Vanadium Steel",
      count: "25 pieces",
      warranty: "1 year",
    },
  },
  {
    id: "fasteners-1",
    title: "Assorted Fasteners Box",
    category: "Essentials",
    description:
      "A comprehensive assortment of nuts, bolts, screws, and washers in various sizes.",
    fullDescription:
      "This assorted fasteners box is perfect for general repair and construction. It includes a variety of sizes and types, all neatly organized in a durable storage box.",
    price: 350.0,
    iconType: "fasteners",
    image: imageNames["fasteners"],
    specifications: {
      material: "Galvanized Steel",
      finish: "Zinc-plated",
      count: "Approx. 500 pieces",
      box: "Plastic organizer case",
    },
  },
  {
    id: "paints-1",
    title: "Interior Wall Paint",
    category: "Finishing",
    description:
      "High-quality, water-based interior paint with a smooth matte finish.",
    fullDescription:
      "This interior wall paint provides excellent coverage and a durable, washable finish. Its low-odor, quick-drying formula makes it ideal for residential use.",
    price: 1500.0,
    iconType: "paints",
    image: imageNames["paints"],
    specifications: {
      type: "Water-based acrylic",
      finish: "Matte",
      coverage: "350 sq ft/gallon",
      size: "1 gallon",
    },
  },
  {
    id: "electrical-1",
    title: "Electric Drill Machine",
    category: "High Performance",
    description:
      "A powerful and reliable electric drill for all your drilling and screwing needs.",
    fullDescription:
      "This electric drill features a high-torque motor and variable speed control, making it suitable for drilling into wood, metal, and masonry. It comes with a comfortable grip for prolonged use.",
    price: 2500.0,
    iconType: "electrical",
    image: imageNames["drill"],
    specifications: {
      power: "600W",
      chuckSize: "13mm",
      speed: "0-2800 RPM",
      voltage: "220V",
    },
  },
];

// Individual Service Card Component
const ProductCard = ({ product, index, onCardClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative cursor-pointer group"
      onClick={() => onCardClick(product)}
      layoutId={`product-card-${product.id}`} // Added for magic motion
    >
      <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="relative w-40 h-40">
            <CategoryIcon type={product.iconType} />
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-full shadow-lg">
          {product.category}
        </span>
      </div>
      <div className="p-4 sm:p-6 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <button className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Product Details Modal Component
const ProductModal = ({ product, onClose }) => {
  const gstRate = 0.18; // 18% GST for PVC Pipes (HSN Code 3917)
  const gstAmount = product.price * gstRate;
  const totalPrice = product.price + gstAmount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`product-card-${product.id}`} // Added for magic motion
        initial={{ y: "100%", x: "-50%", left: "50%", borderRadius: "1.5rem" }} // Initial state for mobile bottom-up animation
        animate={{
          y: "0%",
          x: 0,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
        }} // Final state for full-screen on mobile
        exit={{ y: "100%", x: "-50%", left: "50%", borderRadius: "1.5rem" }} // Exit animation for mobile
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 h-full max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl bg-white rounded-t-3xl overflow-y-auto 
                   lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:h-auto lg:rounded-xl lg:max-w-4xl lg:w-full lg:p-6 lg:transform-none" // Responsive classes
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-center mb-6 lg:mb-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-80 object-contain rounded-lg"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center">
                <CategoryIcon
                  type={product.iconType}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
          {/* Product Details */}
          <div>
            <span className="inline-block mb-2 px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-full">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {product.fullDescription || product.description}
            </p>

            {/* Price Breakdown */}
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-semibold text-gray-800">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">GST ({gstRate * 100}%):</span>
                <span className="font-semibold text-gray-800">
                  ₹{gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-800">Total Price:</span>
                <span className="text-orange-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Specifications
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold capitalize">{key}:</span>{" "}
                        {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            <button className="mt-6 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function Demo() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Our Product Catalog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of high-quality hardware products. Click on any
          product to view details.
        </p>
      </div>

      {/* Scrollable Product Grid */}
      <div className="overflow-y-scroll max-h-[80vh] py-8 px-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
}

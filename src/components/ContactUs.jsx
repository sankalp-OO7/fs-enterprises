"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.05,
            color: "#2563eb",
            transition: { duration: 0.3 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 3D Card component with hover effects
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -100, null],
            x: [null, Math.random() * 100 - 50, null],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Contact Method Component
const ContactMethod = ({ icon, title, value, action, gradient, delay, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card3D className="h-full">
      <motion.div
        className="relative h-full p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl group cursor-pointer overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
        onClick={action}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          y: -5,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Icon container */}
        <motion.div
          className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
          animate={isHovered ? { 
            scale: 1.1, 
            rotate: [0, -5, 5, 0],
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)"
          } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-white text-2xl sm:text-3xl"
            animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-md opacity-30`}
            animate={isHovered ? { scale: 1.3, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base font-medium break-all">
            {value}
          </p>
        </motion.div>

        {/* Action indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
            →
          </div>
        </motion.div>

        {/* Decorative corner */}
        <motion.div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${gradient} opacity-5 rounded-bl-full`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
        />
      </motion.div>
    </Card3D>
  );
};

// Interactive Map Component
const InteractiveMap = ({ isInView }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <Card3D className="h-full">
      <motion.div
        className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          scale: 1.02,
        }}
      >
        {/* Map header */}
        <motion.div
          className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Visit Our Location</h3>
              <p className="text-sm opacity-90">Nanded, Maharashtra</p>
            </div>
            <motion.div
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📍
            </motion.div>
          </div>
        </motion.div>

        {/* Map container */}
        <motion.div
          className="relative h-80 sm:h-96"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <motion.div
                className="flex flex-col items-center space-y-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading map...</p>
              </motion.div>
            </div>
          )}
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.7446845654463!2d77.316874!3d19.1626501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d70415e923b3%3A0x28a8171b4d79491a!2sJindam%20Elevations!5e0!3m2!1sen!2sin!4v1753770412638!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className="rounded-b-2xl"
          />
        </motion.div>

        {/* Location details */}
        <motion.div
          className="p-4 bg-gradient-to-r from-gray-50 to-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">5878+3P Nanded, Maharashtra</p>
              <p className="text-xs text-gray-600">Click to open in Google Maps</p>
            </div>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://g.co/kgs/JEZafWC', '_blank')}
            >
              <span className="flex items-center">
                Get Directions
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </Card3D>
  );
};

// Quick Contact Form Component
const QuickContactForm = ({ isInView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create WhatsApp message
    const message = `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919637894561?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
<Card3D>
  <motion.div
    className="relative p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl"
    initial={{ opacity: 0, x: 50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.3 }}
    whileHover={{
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    }}
  >
    {/* Form header */}
    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Quick Contact</h3>
      <p className="text-gray-600">Send us a message and we'll get back to you soon!</p>
    </motion.div>
    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 transition-all duration-300 resize-none"
        />
      </motion.div>
      <motion.button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg group relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.6 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 40px -12px rgba(34, 197, 94, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <span className="relative z-10 flex items-center justify-center">
          <span className="mr-2">Send via WhatsApp</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💬
          </motion.span>
        </span>
      </motion.button>
    </form>
  </motion.div>
</Card3D>
  );
};

export default function ContactSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -30]);
  const y2 = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: "💬",
      title: "WhatsApp",
      value: "+91 96378 94561",
      action: () => window.open('https://wa.me/919637894561', '_blank'),
      gradient: "from-green-500 to-emerald-600",
      delay: 0.2
    },
    {
      icon: "📱",
      title: "Phone Call",
      value: "9637894561",
      action: () => window.open('tel:9637894561'),
      gradient: "from-blue-500 to-cyan-600",
      delay: 0.4
    },
    {
      icon: "✉️",
      title: "Email",
      value: "Jindamelevations@gmail.com",
      action: () => window.open('mailto:Jindamelevations@gmail.com'),
      gradient: "from-purple-500 to-pink-600",
      delay: 0.6
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile ? 
          `linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #e9d5ff 50%, #d8b4fe 75%, #c084fc 100%)` :
          `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(168, 85, 247, 0.08) 0%, 
          rgba(147, 51, 234, 0.05) 25%, 
          rgba(126, 34, 206, 0.03) 50%, 
          transparent 70%),
          linear-gradient(135deg, 
          #faf5ff 0%, 
          #f3e8ff 25%, 
          #e9d5ff 50%, 
          #d8b4fe 75%, 
          #c084fc 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <FloatingParticles />
      
      {/* Geometric shapes in background - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-28 h-28 border-2 border-purple-200/40 rounded-2xl rotate-12"
            animate={{
              rotate: [12, 102, 12],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />
          
          <motion.div
            className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-r from-violet-100/60 to-purple-100/60 rounded-full backdrop-blur-sm"
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ y: y2 }}
          />

          <motion.div
            className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-200/40 to-rose-200/40 rounded-xl rotate-45"
            animate={{
              rotate: [45, 225, 45],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/60 rounded-full text-sm font-medium text-purple-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
            Get In Touch
          </motion.div>

          <AnimatedText
            text="Contact Jindam Elevations"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-700 to-pink-800 mb-4 leading-tight"
            delay={0.5}
          />
          
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Ready to transform your building's exterior? Let's discuss your project and bring your architectural vision to life.
          </motion.p>
          
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: "8rem" } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {contactMethods.map((method, index) => (
            <ContactMethod
              key={method.title}
              {...method}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Interactive Map */}
          <InteractiveMap isInView={isInView} />
          {/* Quick Contact Form */}
          <QuickContactForm isInView={isInView} />
        </div>
      </div>
    </motion.section>
  );
}

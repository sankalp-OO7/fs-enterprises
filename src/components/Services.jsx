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
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 40 : 0,
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
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 16;
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
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -120, null],
            x: [null, Math.random() * 120 - 60, null],
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Service Icon Component (SVG-based icons for each service)
const ServiceIcon = ({ type, className = "" }) => {
  const icons = {
    acp: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ACP Panel Structure */}
        <motion.rect
          x="10"
          y="20"
          width="60"
          height="40"
          fill="url(#acpGradient)"
          rx="4"
          initial={{ height: 0, y: 40 }}
          animate={{ height: 40, y: 20 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.rect
          x="15"
          y="25"
          width="50"
          height="3"
          fill="rgba(255,255,255,0.3)"
          rx="1"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.rect
          x="15"
          y="35"
          width="50"
          height="3"
          fill="rgba(255,255,255,0.2)"
          rx="1"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.rect
          x="15"
          y="45"
          width="50"
          height="3"
          fill="rgba(255,255,255,0.1)"
          rx="1"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <defs>
          <linearGradient id="acpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
      </motion.svg>
    ),
    
    glass: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glass Window Structure */}
        <motion.rect
          x="15"
          y="15"
          width="50"
          height="50"
          fill="url(#glassGradient)"
          stroke="#e2e8f0"
          strokeWidth="2"
          rx="6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.line
          x1="40"
          y1="15"
          x2="40"
          y2="65"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.line
          x1="15"
          y1="40"
          x2="65"
          y2="40"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        {/* Glass shine effect */}
        <motion.polygon
          points="20,20 35,20 25,35"
          fill="rgba(255,255,255,0.4)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
          </linearGradient>
        </defs>
      </motion.svg>
    ),
    
    exterior: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Building Facade */}
        <motion.rect
          x="20"
          y="15"
          width="40"
          height="50"
          fill="url(#buildingGradient)"
          rx="4"
          initial={{ height: 0, y: 65 }}
          animate={{ height: 50, y: 15 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        {/* Windows */}
        {[0, 1, 2].map((row) => 
          [0, 1].map((col) => (
            <motion.rect
              key={`${row}-${col}`}
              x={28 + col * 16}
              y={22 + row * 12}
              width="8"
              height="8"
              fill="rgba(255,255,255,0.8)"
              rx="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (row * col * 0.2) }}
            />
          ))
        )}
        {/* Exterior paneling lines */}
        <motion.rect
          x="20"
          y="25"
          width="40"
          height="2"
          fill="rgba(16, 185, 129, 0.6)"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <motion.rect
          x="20"
          y="40"
          width="40"
          height="2"
          fill="rgba(16, 185, 129, 0.4)"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        <defs>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
      </motion.svg>
    ),
    
    custom: (
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Custom design elements */}
        <motion.circle
          cx="40"
          cy="40"
          r="25"
          fill="none"
          stroke="url(#customGradient)"
          strokeWidth="3"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.3 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.polygon
          points="40,25 50,35 40,45 30,35"
          fill="url(#diamondGradient)"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {/* Decorative elements */}
        <motion.circle cx="25" cy="25" r="3" fill="#f59e0b" 
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 1.2 }} />
        <motion.circle cx="55" cy="25" r="3" fill="#ef4444" 
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 1.4 }} />
        <motion.circle cx="25" cy="55" r="3" fill="#8b5cf6" 
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 1.6 }} />
        <motion.circle cx="55" cy="55" r="3" fill="#10b981" 
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 1.8 }} />
        <defs>
          <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </motion.svg>
    )
  };

  return icons[type] || icons.acp;
};

// Individual Service Card Component
const ServiceCard = ({ service, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card3D className="h-full">
      <motion.div
        className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden group"
        initial={{ opacity: 0, y: 50, rotateX: 45 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderColor: service.accentColor,
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        {/* Image placeholder with icon */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {service.image ? (
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              className="relative"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon type={service.iconType} />
              
              {/* Floating accent elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 ${service.accentColor} rounded-full opacity-40`}
                  style={{
                    top: `${20 + i * 15}%`,
                    right: `${10 + i * 8}%`,
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          )}
          
          {/* Service category badge */}
          <motion.div
            className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${service.badgeGradient} text-white text-xs font-semibold rounded-full shadow-lg`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          >
            {service.category}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {service.description}
            </p>
          </motion.div>

          {/* Features list */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
          >
            {service.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                className="flex items-center text-sm text-gray-700"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 1.2 + featureIndex * 0.1 
                }}
              >
                <motion.div
                  className={`w-2 h-2 ${service.accentColor} rounded-full mr-3 flex-shrink-0`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: featureIndex * 0.3 
                  }}
                />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 1.5 }}
          >
            <motion.button
              className={`w-full py-3 px-4 bg-gradient-to-r ${service.buttonGradient} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 group/btn`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center">
                Learn More
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative corner element */}
        <motion.div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${service.cornerGradient} opacity-10 rounded-bl-full`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        />
      </motion.div>
    </Card3D>
  );
};

export default function ServicesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -25]);

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

  // Services data
  const services = [
    {
      title: "Aluminium Composite Paneling (ACP)",
      category: "Premium Paneling",
      description: "Transform your building's exterior with high-quality ACP sheets that offer modern aesthetics combined with exceptional durability and weather resistance.",
      features: [
        "Weather-resistant aluminum composite panels",
        "Modern aesthetic appeal with various finishes",
        "Long-lasting protection against elements",
        "Energy-efficient insulation properties",
        "Easy maintenance and cleaning"
      ],
      iconType: "acp",
      bgGradient: "from-blue-500 to-indigo-600",
      badgeGradient: "from-blue-500 to-blue-600",
      buttonGradient: "from-blue-600 to-indigo-600",
      cornerGradient: "from-blue-500 to-indigo-500",
      accentColor: "bg-blue-500",
      image: "/vinuBro/al.png" // Add image URL here when available
    },
    {
      title: "Glass Glazing Solutions",
      category: "Modern Glazing",
      description: "Enhance your building's facade with our professional glass glazing systems that provide clarity, energy efficiency, and contemporary architectural appeal.",
      features: [
        "High-performance glazing systems",
        "Energy-efficient thermal insulation",
        "Crystal clear visibility and natural light",
        "UV protection and glare reduction",
        "Custom sizing and installation"
      ],
      iconType: "glass",
      bgGradient: "from-emerald-500 to-teal-600",
      badgeGradient: "from-emerald-500 to-emerald-600",
      buttonGradient: "from-emerald-600 to-teal-600",
      cornerGradient: "from-emerald-500 to-teal-500",
      accentColor: "bg-emerald-500",
      image:  "/vinuBro/glass.png" // Add image URL here when available
    },
    {
      title: "Exterior Composite Paneling",
      category: "Advanced Composites",
      description: "Revolutionary exterior composite panels that combine strength, beauty, and sustainability for comprehensive building facade solutions.",
      features: [
        "High-strength composite materials",
        "Sustainable and eco-friendly options",
        "Fire-resistant and safety compliant",
        "Wide range of colors and textures",
        "Professional installation and warranty"
      ],
      iconType: "exterior",
      bgGradient: "from-purple-500 to-pink-600",
      badgeGradient: "from-purple-500 to-purple-600",
      buttonGradient: "from-purple-600 to-pink-600",
      cornerGradient: "from-purple-500 to-pink-500",
      accentColor: "bg-purple-500",
      image: "/vinuBro/panal.png" // Add image URL here when available
    },
    {
      title: "Custom Exterior Solutions",
      category: "Bespoke Design",
      description: "Tailored architectural finishes designed specifically for your project needs, working closely with architects, engineers, and builders.",
      features: [
        "Personalized design consultations",
        "Custom architectural finishes",
        "Collaboration with design professionals",
        "Project-specific material selection",
        "Complete installation and support"
      ],
      iconType: "custom",
      bgGradient: "from-orange-500 to-red-600",
      badgeGradient: "from-orange-500 to-orange-600",
      buttonGradient: "from-orange-600 to-red-600",
      cornerGradient: "from-orange-500 to-red-500",
      accentColor: "bg-orange-500",
      image: "/vinuBro/exterior.png" // Add image URL here when available
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile ? 
          `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #4ade80 100%)` :
          `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(34, 197, 94, 0.08) 0%, 
          rgba(16, 185, 129, 0.05) 25%, 
          rgba(5, 150, 105, 0.03) 50%, 
          transparent 70%),
          linear-gradient(135deg, 
          #f0fdf4 0%, 
          #dcfce7 25%, 
          #bbf7d0 50%, 
          #86efac 75%, 
          #4ade80 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <FloatingParticles />
      
      {/* Geometric shapes in background - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-emerald-200/40 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />
          
          <motion.div
            className="absolute bottom-40 right-32 w-20 h-20 bg-gradient-to-r from-teal-100/60 to-emerald-100/60 rounded-xl backdrop-blur-sm rotate-45"
            animate={{
              rotate: [45, 135, 45],
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ y: y2 }}
          />
          <motion.div
            className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-b from-blue-100/60 to-indigo-100/60 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ y: y1 }}
          />
        </>
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our range of architectural finishes and solutions designed to elevate your building's aesthetics and functionality.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
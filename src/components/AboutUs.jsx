"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, color } from "framer-motion";

// Consistent color palette - using specific hex values for device consistency
const colors = {
  primary: {
    orange: '#f97316', // Orange-600
    red: '#dc2626',    // Red-600
    blue: '#2563eb',   // Blue-600
    indigo: '#4f46e5', // Indigo-600
    purple: '#9333ea', // Purple-600
    green: '#16a34a',  // Green-600
    cyan: '#0891b2',   // Cyan-600
    emerald: '#059669' // Emerald-600
  },
  light: {
    orange: '#fed7aa', // Orange-200
    red: '#fecaca',    // Red-200
    blue: '#bfdbfe',   // Blue-200
    indigo: '#c7d2fe', // Indigo-200
    purple: '#ddd6fe', // Purple-200
    green: '#bbf7d0',  // Green-200
    gray: '#e5e7eb'    // Gray-200
  },
  dark: {
    gray800: '#1f2937',
    gray700: '#374151',
    gray600: '#4b5563'
  },
  background: {
    gradient: 'linear-gradient( 45deg , #fef7ed 0%, #fed7aa 25%, #fdba74 50%, #fb923c 75%, #f97316 100%)'
  }
};

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
            color: colors.primary.blue,
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
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
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
          className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${colors.primary.orange}, ${colors.primary.red})`,
            opacity: 0.2
          }}
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

// Owner Portrait Component
const OwnerPortrait = () => (
  <motion.div
    className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    {/* Avatar placeholder with professional styling */}
    <motion.div
      className="w-full h-full rounded-full flex items-center justify-center shadow-2xl border-4"
      style={{
        background: `linear-gradient(135deg, ${colors.primary.blue} 0%, ${colors.primary.indigo} 50%, ${colors.primary.purple} 100%)`,
        borderColor: '#ffffff'
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        VJ
      </motion.div>
    </motion.div>
    
    {/* Glowing ring effect */}
    <motion.div
      className="absolute inset-0 rounded-full border-2"
      style={{ borderColor: `${colors.primary.blue}30` }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// Experience Timeline Component
const ExperienceStats = () => {
  const stats = [
    { number: "10+", label: "Years Experience", icon: "🏆" },
    { number: "500+", label: "Projects Completed", icon: "🏢" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🔧" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-4 rounded-xl border shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(229, 231, 235, 0.6)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <motion.div
            className="text-2xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          >
            {stat.icon}
          </motion.div>
          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1"
            style={{ color: colors.primary.blue }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10, 
              delay: 1.5 + index * 0.2 
            }}
          >
            {stat.number}
          </motion.div>
          <div className="text-xs sm:text-sm font-medium" style={{ color: colors.dark.gray600 }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Expertise Areas Component
const ExpertiseAreas = () => {
  const expertise = [
    { title: "ACP Solutions", desc: "Premium Aluminium Composite Paneling", colors: { from: colors.primary.blue, to: colors.primary.cyan } },
    { title: "Glass Glazing", desc: "Modern glazing systems & facades", colors: { from: colors.primary.green, to: colors.primary.emerald } },
    { title: "Exterior Design", desc: "Complete facade transformation", colors: { from: colors.primary.purple, to: '#ec4899' } },
    { title: "Custom Solutions", desc: "Tailored architectural finishes", colors: { from: colors.primary.orange, to: colors.primary.red } }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
      {expertise.map((item, index) => (
        <motion.div
          key={item.title}
          className="relative p-6 rounded-xl border shadow-lg overflow-hidden group"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(229, 231, 235, 0.6)'
          }}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 + index * 0.2 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
            style={{
              background: `linear-gradient(45deg, ${item.colors.from}, ${item.colors.to})`
            }}
          />
          <motion.div
            className="inline-flex items-center px-3 py-1 text-white text-xs font-semibold rounded-full mb-3"
            style={{
              background: `linear-gradient(45deg, ${item.colors.from}, ${item.colors.to})`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 2.2 + index * 0.2 }}
          >
            {item.title}
          </motion.div>
          <p className="text-sm sm:text-base font-medium" style={{ color: colors.dark.gray700 }}>
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 300], [0, -40]);

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

  const backgroundStyle = {
    background: isMobile ? 
      colors.background.gradient :
      `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(251, 146, 60, 0.08) 0%, 
      rgba(249, 115, 22, 0.05) 25%, 
      rgba(234, 88, 12, 0.03) 50%, 
      transparent 70%),
      ${colors.background.gradient}`,
  };

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={backgroundStyle}
    >
      {/* Animated Background Elements */}
      <FloatingParticles />
      
      {/* Geometric shapes in background - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-24 h-24 border-2 rounded-lg rotate-45"
            style={{ borderColor: `${colors.light.orange}66`,y: y1 }}
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
           />
          
          <motion.div
            className="absolute bottom-32 left-32 w-16 h-16 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${colors.primary.red}10, ${colors.primary.orange}10)`,
              backdropFilter: 'blur(10px)',y: y2
            }}
            animate={{
              x: [-10, 10, -10],
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 8,
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
            className="inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium mb-6"
            style={{
              background: `linear-gradient(45deg, #fff7ed, #fef2f2)`,
              borderColor: `${colors.light.orange}99`,
              color: colors.primary.orange
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: colors.primary.orange }}></span>
            About Jindam Elevations
          </motion.div>

          <AnimatedText
            text="Meet Our Founder"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black  mb-4 leading-tight"
            style={{
              background: `linear-gradient(45deg, ${colors.dark.gray800}, ${colors.primary.orange}, ${colors.primary.red})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
               
            }}
            delay={0.5}
          />
          
          <motion.div
            className="h-1 rounded-full mx-auto"
            style={{
              background: `linear-gradient(45deg, ${colors.primary.orange}, ${colors.primary.red})`,
              width: '8rem'
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: "8rem" } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column - Owner Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card3D>
              <div className="text-center lg:text-left">
                <OwnerPortrait />
                
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <AnimatedText
                    text="Vinay Vyankatesh Jindam"
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                    style={{
                      background: `linear-gradient(45deg, ${colors.primary.blue}, ${colors.primary.indigo})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    delay={1.8}
                  />
                  
                  <motion.p
                    className="text-lg sm:text-xl font-semibold mb-4"
                    style={{ color: colors.primary.orange }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.5 }}
                  >
                    Founder & Owner
                  </motion.p>
                  
                  <motion.div
                    className="inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium"
                    style={{
                      background: `linear-gradient(45deg, #f0fdf4, #ecfdf5)`,
                      borderColor: colors.light.green,
                      color: colors.primary.green
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, delay: 2.8 }}
                  >
                    <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: colors.primary.green }}></span>
                    Leading Since 2013
                  </motion.div>
                </motion.div>
              </div>
            </Card3D>

            {/* Experience Stats */}
            <ExperienceStats />
          </motion.div>

          {/* Right Column - Company Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card3D>
              <motion.div
                className="p-6 sm:p-8 rounded-2xl border shadow-xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(229, 231, 235, 0.6)'
                }}
                whileHover={!isMobile ? {
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  borderColor: `${colors.primary.orange}4D`,
                } : {}}
              >
                <motion.h3
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6"
                  style={{ color: colors.dark.gray800 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Our Story
                </motion.h3>
                
                <motion.div
                  className="space-y-4 leading-relaxed"
                  style={{ color: colors.dark.gray700 }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p className="text-sm sm:text-base lg:text-lg">
                    <strong style={{ color: colors.primary.orange }}>Jindam Elevations</strong> is a trusted name in exterior design solutions, specializing in <strong style={{ color: colors.primary.blue }}>Aluminium Composite Paneling (ACP)</strong>, <strong style={{ color: colors.primary.indigo }}>Exterior Composite Paneling</strong>, and <strong style={{ color: colors.primary.purple }}>Glass Glazing</strong>. With over a decade of hands-on experience, we help bring architectural visions to life by enhancing the exteriors of commercial and residential buildings with precision, durability, and style.
                  </p>
                  
                  <p className="text-sm sm:text-base lg:text-lg">
                    Our expertise lies in transforming building facades using high-quality ACP sheets, offering modern aesthetics along with long-lasting protection. We collaborate closely with architects, engineers, builders, and business owners to deliver custom exterior finishes for new shops, buildings, and commercial complexes.
                  </p>
                  
                  <motion.div
                    className="relative p-4 border-l-4 rounded-r-lg mt-6"
                    style={{
                      background: `linear-gradient(45deg, #fff7ed, #fef2f2)`,
                      borderLeftColor: colors.primary.orange
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <p className="text-sm sm:text-base lg:text-lg font-semibold italic" style={{ color: colors.dark.gray800 }}>
                      "At Jindam Elevations, we don't just build exteriors, we craft impressions"
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Card3D>

            {/* Expertise Areas */}
            <ExpertiseAreas />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.p
            className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto"
            style={{ color: colors.dark.gray700 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 3.3 }}
          >
            Ready to transform your building's exterior? Let's create something extraordinary together.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.6 }}
          >
            <motion.button
              className="relative px-8 py-4 text-white font-semibold rounded-xl overflow-hidden group shadow-lg"
              style={{
                background: `linear-gradient(45deg, ${colors.primary.orange}, ${colors.primary.red})`
              }}
              whileHover={!isMobile ? { 
                scale: 1.05,
                boxShadow: `0 20px 40px -12px ${colors.primary.orange}66`
              } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, ${colors.primary.red}, #ec4899)`
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                <span>Get Started Today</span>
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 group"
              style={{
                borderColor: colors.light.gray,
                color: colors.dark.gray700
              }}
              whileHover={!isMobile ? { 
                scale: 1.05,
                borderColor: colors.primary.orange,
                color: '#c2410c',
                backgroundColor: '#fff7ed'
              } : {
                borderColor: colors.primary.orange,
                color: '#c2410c',
                backgroundColor: '#fff7ed'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Contact Us
                <motion.span
                  className="ml-2 transform group-hover:rotate-90 transition-transform duration-300"
                >
                  ✦
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHardHat } from "react-icons/fa";

// Existing component imports
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
// import Projects from "@/components/Projects";
// import Career from "@/components/Gallery"; // Changed from Gallery to Career for clarity
import ContactUs from "@/components/ContactUs";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";

// --- ENHANCED Animation Variants ---
const contentFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sectionSlideIn = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// EPIC Loading Overlay Variants
const loadingOverlayVariants = {
  initial: {
    opacity: 1,
    background:
      "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)",
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.3,
    },
  },
};

// Animated Background Particles
const particleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// STUNNING Logo/Image Container
const logoContainerVariants = {
  initial: {
    opacity: 0,
    scale: 0.3,
    rotateY: -180,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 1.5,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotateY: 180,
    filter: "blur(10px)",
    transition: {
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

// MIND-BLOWING Text Animations
const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const wordVariants = {
  initial: {
    opacity: 0,
    y: 100,
    rotateX: -90,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 1.2,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    rotateX: 90,
    filter: "blur(5px)",
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

// Glowing Border Animation
const glowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0.7, 1],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Progress Bar Animation
const progressVariants = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: {
      duration: 3,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particleStyles, setParticleStyles] = useState([]);
  const [glassParticleStyles, setGlassParticleStyles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticleStyles = [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }));
      setParticleStyles(newParticleStyles);

      const newGlassParticleStyles = [...Array(10)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
      setGlassParticleStyles(newGlassParticleStyles);
    };

    generateParticles();

    // Hide body overflow to prevent scroll during loading
    document.body.style.overflow = "hidden";

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Main animation timer to control component rendering
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 3500); // Set to 3.5 seconds to ensure loading animations complete

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] overflow-hidden"
            variants={loadingOverlayVariants}
            initial="initial"
            exit="exit"
            style={{
              background:
                "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)",
            }}
          >
            <div className="absolute inset-0">
              {particleStyles.map((style, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-4 bg-slate-400/60 rounded-sm"
                  style={style}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: Math.random() * 2,
                    duration: 4 + Math.random() * 2,
                  }}
                />
              ))}
              {glassParticleStyles.map((style, i) => (
                <motion.div
                  key={`glass-${i}`}
                  className="absolute w-2 h-2 bg-blue-300/40 rounded-full"
                  style={style}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: Math.random() * 3,
                    duration: 3 + Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/30 to-black/60" />

            <div className="relative flex items-center justify-center min-h-screen p-4">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  className="relative mb-8 sm:mb-12"
                  variants={logoContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      background:
                        "linear-gradient(45deg, #c0c0c0, #e6e6fa, #f0f8ff, #c0c0c0)",
                      filter: "blur(25px)",
                      transform: "scale(1.3)",
                    }}
                  />

                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 mx-auto rounded-lg overflow-hidden border-4 border-white/30 backdrop-blur-sm shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center relative">
                      <div className="text-center">
                        <div className="text-white mb-2">
                          <FaHardHat className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-blue-400" />
                        </div>
                        <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wider">
                          F S Enterprises
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse" />
                    </div>

                    <div
                      className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-300 via-slate-300 to-blue-300 animate-spin opacity-60"
                      style={{ animationDuration: "4s" }}
                    />
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-slate-300/40"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-blue-300/30"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={textContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4 sm:space-y-6"
                >
                  <motion.div
                    variants={wordVariants}
                    className="overflow-hidden"
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none">
                      <span className="inline-block bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent drop-shadow-2xl">
                        F S Enterprises
                      </span>
                    </h1>
                  </motion.div>

                  <motion.div
                    variants={wordVariants}
                    className="overflow-hidden"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none">
                      <span className="inline-block bg-gradient-to-r from-blue-400 via-slate-200 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                        Hardware Wholesale
                      </span>
                    </h2>
                  </motion.div>

                  <motion.div
                    variants={wordVariants}
                    className="overflow-hidden"
                  >
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200/90 font-medium tracking-wide px-4">
                      Your Trusted Partner for Quality Hardware in Pune
                    </p>
                  </motion.div>

                  <motion.div
                    variants={wordVariants}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 px-4">
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-slate-700/50 border border-slate-500/30 rounded-full text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-sm">
                        Tools & Equipment
                      </span>
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-700/50 border border-blue-500/30 rounded-full text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-sm">
                        Building Materials
                      </span>
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-slate-700/50 border border-slate-500/30 rounded-full text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-sm">
                        Industrial Supplies
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={wordVariants}
                    className="overflow-hidden"
                  >
                    <div className="mt-4">
                      <p className="text-sm sm:text-base text-slate-300/80 font-light">
                        <span className="font-semibold text-blue-300">
                          15+ Years
                        </span>{" "}
                        of Supplying Pune&apos;s Industries
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div className="mt-12 sm:mt-16 max-w-md mx-auto">
                  <div className="relative h-1 bg-slate-700/30 rounded-full overflow-hidden backdrop-blur-sm border border-slate-600/20">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-slate-400 via-blue-400 to-slate-400 rounded-full"
                      variants={progressVariants}
                      initial="initial"
                      animate="animate"
                    />
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  </div>
                  <p className="text-center text-slate-300/70 text-sm mt-4 font-light tracking-wide">
                    Loading our catalog...
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-slate-400/40" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-400/40" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-slate-400/40" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-400/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={isLoading ? "hidden" : "visible"}
        animate={!isLoading ? "visible" : "hidden"}
        variants={contentFadeIn}
        className="min-h-screen text-gray-100"
      >
        <Navbar />
        <main>
          <motion.section
            id="hero"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <HeroSection />
          </motion.section>
          <motion.section
            id="about-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <AboutUs />
          </motion.section>
          <motion.section
            id="services"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            <Services />
          </motion.section>
          <motion.section
            id="projects"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={{ delay: 1.2 }}
          >
            <Projects />
          </motion.section>

          <motion.section
            id="contact-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={{ delay: 1.2 }}
          >
            <ContactUs />
          </motion.section>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

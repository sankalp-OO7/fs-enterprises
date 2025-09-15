"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// --- Nav items ---
const navItems = [
  { label: 'About', to: 'about-us' },
  { label: 'Services', to: 'services' },
  { label: 'Projects', to: 'projects' },
  { label: 'Gallery', to: 'career' },
  { label: 'Contact', to: 'contact-us' },
];

// --- Utility: Smooth scroll ---
function scrollToSection(id) {
  if (typeof window !== 'undefined') {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Per-letter gradient logo ---
const logo = "Jindam Elevations";

// --- Particle (floating circles) configuration ---
const PARTICLE_COUNT = 25;
const PARTICLE_COLORS = [
  "bg-purple-200/50",
  "bg-blue-100/60",
  "bg-pink-100/50"
];

// --- Variants ---
const navbarVariants = {
  initial: { y: -100, opacity: 0, filter: "blur(15px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 70, damping: 16, mass: 1.5, delay: 0.1 } }
};

const navItemVariants = {
  initial: { scale: 1, rotateX: 0, rotateY: 0, z: 0 },
  hover: {
    scale: 1.05,
    y: -3,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    boxShadow: "0 8px 24px rgba(120, 80, 255, 0.15)",
    transition: { type: "spring", stiffness: 220, damping: 20 }
  },
  tap: { scale: 0.97 }
};

const underlineVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { type: 'spring', stiffness: 350, damping: 25 } }
};

const logoLetterVariants = {
  hidden: { y: -25, opacity: 0, scale: 0.7 },
  visible: i => ({
    y: 0, opacity: 1, scale: 1,
    transition: { delay: i * 0.05, type: "spring", stiffness: 150, damping: 14 }
  }),
  hover: { y: -8, color: "#8b5cf6", scale: 1.15, transition: { type: "spring", stiffness: 200, damping: 10 } }
};

// --- Particle floating animation ---
const getParticleMotionProps = (i) => ({
  initial: { y: -40, opacity: 0.1, scale: 0.4, x: 0 },
  animate: {
    y: [0, 20, -15, 10, 0],
    opacity: [0.15, 0.35, 0.45, 0.35, 0.15],
    scale: [0.5, 0.9, 1.1, 0.8, 0.5],
    x: [0, 10, -15, 12, 0],
    transition: {
      duration: 8 + (i % 8),
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: (i * 0.18) % 3
    }
  }
});

// Particles component that only renders on client
const Particles = ({ isDesktop }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generatedParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      width: 6 + (i * 5) % 18,
      height: 6 + (i * 4) % 18,
      left: (i * 11) % 100,
      top: (i * 15) % 30 - 10,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isDesktop || particles.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-28 z-40 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          {...getParticleMotionProps(i)}
          className={`absolute rounded-full ${PARTICLE_COLORS[i % PARTICLE_COLORS.length]}`}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}px`,
            filter: 'blur(1.5px)',
            zIndex: 0
          }}
        />
      ))}
    </div>
  );
};

// --- Component ---
function NavbarComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const observerRef = useRef(null);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Handle mounting and responsive behavior
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, [mounted, isDesktop]);

  // Active section logic
  useEffect(() => {
    if (!mounted || navbarHeight === 0) return;
    
    const rootMarginTop = `-${navbarHeight + 10}px`;
    const options = { root: null, rootMargin: `${rootMarginTop} 0px -70% 0px`, threshold: 0 };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    
    observerRef.current = new IntersectionObserver(callback, options);
    const sections = ['hero', ...navItems.map(item => item.to)]
      .map(id => document.getElementById(id)).filter(Boolean);
    sections.forEach(sec => observerRef.current?.observe(sec));
    
    return () => {
      if (observerRef.current) {
        sections.forEach(sec => observerRef.current?.unobserve(sec));
        observerRef.current.disconnect();
      }
    };
  }, [mounted, navbarHeight]);

  // Propagate navbar height to a CSS variable for HeroSection
  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }, [navbarHeight]);

  // Pre-mount rendering (improved placeholder)
  if (!mounted) {
    return (
      <nav className="fixed top-0 z-50 w-full bg-purple-100/80 backdrop-blur-md shadow-lg transition-all duration-300 h-20 sm:h-24 flex items-center">
        <div className="mx-auto flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl relative z-10 w-full">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-xl animate-pulse">
            {logo}
          </div>
          <div className="h-8 w-8 bg-purple-300 rounded-md animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Floating animated particles (Desktop only for perf) */}
      <Particles isDesktop={isDesktop} />
      
      {/* Main Navbar */}
      <motion.nav
        ref={navbarRef}
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 z-50 w-full bg-gradient-to-b from-purple-50/60 to-purple-100/70 backdrop-blur-xl shadow-lg transition-all duration-300 border-b border-purple-200"
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl relative z-10 h-20 sm:h-24">
          {/* LOGO: Per-letter animation, gradient, hover */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-lg relative flex items-center h-full"
            aria-label="Scroll to Home section"
            whileTap={{ scale: 0.96 }}
            style={{ letterSpacing: '0.06em' }}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ staggerChildren: 0.03 }}
              className="inline-block"
            >
              {[...logo].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={logoLetterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            {/* Underline animation for logo when 'hero' is active */}
            {activeSection === 'hero' && (
              <motion.div
                layoutId="underline-logo"
                variants={underlineVariants}
                initial="initial"
                animate="animate"
                className="h-1 rounded bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400 mt-1"
              />
            )}
          </motion.button>
          
          {/* Desktop Navigation */}
          {isDesktop && (
            <ul className="flex gap-4 xl:gap-6 ml-4">
              {navItems.map(({ label, to }) => (
                <motion.li
                  key={to}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center relative"
                >
                  <motion.button
                    onClick={() => scrollToSection(to)}
                    className={`
                      px-6 py-3 rounded-xl font-medium relative transition-all duration-200 text-base xl:text-lg
                      ${activeSection === to
                        ? "text-purple-700 bg-purple-200/50 font-semibold border border-purple-300 shadow-md"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/50"}
                    `}
                    style={{
                      boxShadow: activeSection === to ? "0 4px 15px rgba(120, 80, 255, 0.15)" : "none"
                    }}
                  >
                    {label}
                    {/* Animated line for the active nav item */}
                    {activeSection === to && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-4/5 rounded-t-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
          
          {/* Hamburger (Mobile) - Animated icon - Only visible when drawer is NOT open */}
          {!isDesktop && !isDrawerOpen && (
            <motion.button
              onClick={() => setIsDrawerOpen(true)} // Only opens the drawer
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-700 hover:text-purple-600 focus:outline-none relative z-50"
              aria-label="Open navigation menu"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  initial={{ y: -6, rotate: 0 }}
                  animate={{ y: -6, rotate: 0 }} // Keep these static for the hamburger
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }} // Keep static
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  initial={{ y: 6, rotate: 0 }}
                  animate={{ y: 6, rotate: 0 }} // Keep static
                />
              </div>
            </motion.button>
          )}

          {/* Close Button (Mobile) - Only visible when drawer IS open */}
          {!isDesktop && isDrawerOpen && (
            <motion.button
              onClick={() => setIsDrawerOpen(false)} // Only closes the drawer
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute top-7 right-7 p-2 text-gray-700 hover:text-purple-600 focus:outline-none z-[101]" // Z-index higher than drawer
              aria-label="Close navigation menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.nav>
      
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && !isDesktop && (
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }}
            exit={{ x: "100vw", opacity: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }}
            className="fixed inset-0 z-[99] bg-purple-50/95 backdrop-blur-xl flex flex-col items-center justify-center pt-24 pb-8 overflow-y-auto"
          >
            {/* The close button is now outside this div but within the Navbar component for better z-indexing control */}
            <ul className="flex flex-col gap-6 text-center w-full max-w-xs px-4">
              {navItems.map(({ label, to }) => (
                <motion.li
                  key={to}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center w-full"
                >
                  <motion.button
                    onClick={() => {
                      scrollToSection(to);
                      setIsDrawerOpen(false); // Close drawer on item click
                    }}
                    className={`
                      px-10 py-5 text-2xl font-semibold rounded-xl transition-all duration-200 w-full
                      bg-purple-100/70 hover:bg-purple-200/80 shadow-lg hover:shadow-xl
                      ${activeSection === to
                        ? "text-purple-700 bg-purple-200/90 font-bold border border-purple-400"
                        : "text-gray-700 hover:text-purple-600"}
                    `}
                  >
                    {label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export as dynamic component with SSR disabled
const Navbar = dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
  loading: () => (
    <nav className="fixed top-0 z-50 w-full bg-purple-100/80 backdrop-blur-md shadow-lg transition-all duration-300 h-20 sm:h-24 flex items-center">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl relative z-10 w-full">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-transparent bg-clip-text drop-shadow-xl animate-pulse">
          Jindam Elevations
        </div>
        <div className="h-8 w-8 bg-purple-300 rounded-md animate-pulse"></div>
      </div>
    </nav>
  )
});

export default Navbar;
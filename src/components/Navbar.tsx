"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollTo = (target: number | string) => {
    let targetY = 0;
    const startY = window.scrollY;

    if (typeof target === 'number') {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      targetY = totalScroll * target;
    } else {
      const el = document.getElementById(target);
      if (el) {
        targetY = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for navbar
      } else return;
    }

    const distance = targetY - startY;
    const duration = 1500; // 1.5 seconds for a slow, elegant, premium glide
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // smooth easeOutQuart function
      const ease = 1 - Math.pow(1 - progress, 4);
      
      window.scrollTo(0, startY + distance * ease);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "bg-[#080a10]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent py-8"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo(0)}>
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_#06b6d4] flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-2.5 h-2.5 bg-violet-400 rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white/90 uppercase glow-text-cyan">
            Orbit Solutions
          </span>
        </div>

        {/* Right Side: Links & CTA */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Index 1 Center = 1.5 / 11 = 0.1363 */}
          <button onClick={() => scrollTo(0.1363)} className="text-sm font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors">
            Services
          </button>
          {/* Index 9 Center = 9.5 / 11 = 0.8636 */}
          <button onClick={() => scrollTo(0.8636)} className="text-sm font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors">
            Why Us
          </button>
          <button onClick={() => scrollTo('clients')} className="text-sm font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors">
            Clients
          </button>
          <button onClick={() => scrollTo(0)} className="text-sm font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors">
            About
          </button>
          <button onClick={onContactClick} className="text-sm font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 transition-colors">
            Contact
          </button>
          <button 
            onClick={onContactClick} 
            className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-50 text-sm font-bold tracking-widest uppercase hover:bg-cyan-500/20 transition-all glow-ring-cyan ml-2"
          >
            Get Started
          </button>
        </div>

      </div>
    </motion.nav>
  );
}

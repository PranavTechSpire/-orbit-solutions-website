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
          <img 
            src="/logo.png" 
            alt="Orbit Solutions" 
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        {/* Right Side: Links & CTA */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Services Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium uppercase tracking-widest text-white/60 group-hover:text-cyan-400 transition-colors py-2 flex items-center gap-1">
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 opacity-50"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-[#080a10]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-1">
                {[
                  { name: 'Web Dev', target: 0.1363 },
                  { name: 'Mobile Apps', target: 0.2272 },
                  { name: 'Graphics', target: 0.3181 },
                  { name: 'Digital Mkt', target: 0.4090 },
                  { name: 'Social Media', target: 0.5000 },
                  { name: 'WhatsApp Auto', target: 0.5909 },
                  { name: 'Enterprise SW', target: 0.6818 },
                  { name: 'AI Assistants', target: 0.7727 }
                ].map(service => (
                  <button 
                    key={service.name}
                    onClick={() => scrollTo(service.target)} 
                    className="text-left px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/60 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
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

"use client";

import { Hexagon, Triangle, Square, Circle, Cloud, Star } from "lucide-react";

const CLIENTS = [
  { name: "Nexus Data", icon: Hexagon },
  { name: "Quantum Innovations", icon: Triangle },
  { name: "AeroTech", icon: Circle },
  { name: "Vertex Solutions", icon: Square },
  { name: "CloudSync", icon: Cloud },
  { name: "Stellar Dynamics", icon: Star },
];

export default function TrustedClients() {
  // Duplicate array to ensure seamless infinite scroll (CSS translation to -50%)
  const duplicatedClients = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section id="clients" className="relative z-50 bg-[#05060a] border-t border-white/5 py-24 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-lg md:text-xl font-bold tracking-[0.3em] text-cyan-400/80 uppercase glow-text-cyan">
          Trusted By Innovative Teams
        </h3>
        <div className="w-12 h-px bg-cyan-500/50 mx-auto mt-4 shadow-[0_0_10px_#06b6d4]"></div>
      </div>

      {/* Marquee Container with fade masks */}
      <div 
        className="relative flex overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-16 md:gap-32 px-8">
          {duplicatedClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div key={index} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer group">
                <Icon size={32} className="text-white group-hover:text-cyan-400 transition-colors" strokeWidth={1.5} />
                <span className="text-2xl md:text-3xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors uppercase">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

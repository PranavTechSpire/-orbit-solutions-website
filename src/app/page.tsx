"use client";

import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useState } from 'react';
import OrbitalEcosystem from '@/components/OrbitalEcosystem';
import ContactModal from '@/components/ContactModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustedClients from '@/components/TrustedClients';

const BEATS_DATA = [
  {
    title: "ORBIT SOLUTIONS",
    subtitle: "We are a modern tech startup focused on delivering high-quality digital solutions. We help businesses transform their ideas into powerful products — combining creativity, technology, and strategy to drive meaningful results.",
  },
  {
    title: "WEB DEVELOPMENT",
    subtitle: "Fast, scalable websites that drive results. We architect cutting-edge, responsive web platforms using modern frameworks. Our solutions ensure lightning-fast load times, flawless SEO performance, and an intuitive user experience that seamlessly converts visitors into loyal clients.",
  },
  {
    title: "MOBILE APP DEVELOPMENT",
    subtitle: "User-friendly apps that engage and convert. We design and build native and cross-platform mobile applications that live in the pockets of your users. From seamless onboarding to complex backend integrations, we prioritize smooth performance and stunning UI to keep your audience hooked.",
  },
  {
    title: "GRAPHICS DESIGNING",
    subtitle: "Creative designs that elevate your brand. Our creative team crafts visual identities that leave a lasting impact. Whether it's high-end UI/UX prototyping, immersive 3D assets, or modern branding collateral, we ensure every pixel aligns perfectly with your enterprise vision.",
  },
  {
    title: "DIGITAL MARKETING",
    subtitle: "Strategies that bring real growth. Stop guessing and start scaling. We deploy data-driven marketing campaigns, precise SEO strategies, and targeted advertising to dominate your market sector and drastically increase your overall digital footprint and ROI.",
  },
  {
    title: "SOCIAL MEDIA MARKETING",
    subtitle: "Build your presence and connect with your audience. We transform your social channels into dynamic growth engines. By curating engaging content and leveraging advanced algorithmic targeting, we build powerful communities and foster deep, authentic connections with your core demographic.",
  },
  {
    title: "WHATSAPP AUTOMATION",
    subtitle: "Build your customized WhatsApp automation system. We engineer intelligent conversational flows where repetitive tasks, customer support queries, and lead generation happen completely hands-free. Scale your communication effortlessly with 24/7 automated engagement.",
  },
  {
    title: "ENTERPRISE SOFTWARES",
    subtitle: "Custom-built enterprise software solutions to streamline your complex business operations. We develop highly secure, robust internal tools and dashboards that eliminate bottlenecks. Experience absolute control over your logistics, data processing, and team management through a unified digital architecture.",
  },
  {
    title: "AI ASSISTANTS",
    subtitle: "Intelligent AI assistants tailored to enhance your productivity and customer engagement. We integrate next-generation Language Models directly into your ecosystem. From smart customer-facing chatbots to internal data-analysis agents, our AI solutions operate continuously to give you a definitive competitive edge.",
  },
  {
    title: "THE ORBIT ADVANTAGE",
    subtitle: "Modern technology, client-focused approach, and affordable end-to-end services from concept to launch and beyond.",
  },
  {
    title: "START YOUR PROJECT",
    subtitle: "Have an idea? Let's build it together. Turn your vision into reality with a team that cares about your success.",
    isButton: true
  }
];

function Beat({ 
  progress, 
  range, 
  title, 
  subtitle, 
  align = 'left',
  isButton = false,
  onClick,
  id
}: { 
  progress: MotionValue<number>, 
  range: [number, number], 
  title: string, 
  subtitle: string,
  align?: 'left' | 'right',
  isButton?: boolean,
  onClick?: () => void,
  id?: string
}) {
  const [start, end] = range;
  const fade = 0.02; // Adjusted for 11 sections so it doesn't overlap
  
  let opacityInput = [start, start + fade, end - fade, end];
  let opacityOutput = [0, 1, 1, 0];
  let yInput = [start, start + fade, end - fade, end];
  let yOutput = [20, 0, 0, -20];

  if (start === 0) {
    opacityInput = [0, end - fade, end];
    opacityOutput = [1, 1, 0];
    yInput = [0, end - fade, end];
    yOutput = [0, 0, -20];
  } else if (end === 1) {
    opacityInput = [start, start + fade, 1];
    opacityOutput = [0, 1, 1];
    yInput = [start, start + fade, 1];
    yOutput = [20, 0, 0];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  let alignClass = "items-center text-center";
  if (align === 'left') alignClass = "items-start text-left pl-6 md:pl-12 lg:pl-20";
  if (align === 'right') alignClass = "items-end text-right pr-6 md:pr-12 lg:pr-20";

  return (
    <motion.div 
      id={id}
      style={{ opacity, y }}
      className={`fixed inset-0 flex flex-col justify-end pb-6 md:pb-12 lg:pb-16 pointer-events-none z-40 w-full ${alignClass}`}
    >
      <div className="glass-panel p-8 md:p-10 lg:p-12 max-w-lg md:max-w-xl lg:max-w-2xl pointer-events-auto w-full">
        {isButton ? (
           <>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 glow-text-cyan tracking-tight mb-4 uppercase leading-tight">
               HAVE AN IDEA?
             </h2>
             <p className="text-lg md:text-xl lg:text-2xl text-blue-100/70 font-light tracking-wide mt-3 mb-8 leading-relaxed">
               {subtitle}
             </p>
             <button 
               onClick={onClick}
               className="px-8 py-5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 rounded-full text-cyan-50 text-xl md:text-2xl font-bold tracking-widest uppercase transition-all glow-ring-cyan pointer-events-auto cursor-pointer w-full"
             >
               {title}
             </button>
           </>
        ) : (
          <>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 glow-text-cyan tracking-tight mb-4 uppercase leading-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100/70 font-light tracking-wide mt-4 leading-relaxed">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 40, 
    damping: 15, 
    mass: 0.5 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative bg-[#080a10]">
      <Navbar onContactClick={() => setIsModalOpen(true)} />
      {/* 1100vh height to accommodate 11 individual beats */}
      <div className="relative h-[1100vh]">
        <OrbitalEcosystem smoothProgress={smoothProgress} />
        
        {BEATS_DATA.map((beat, index) => {
          const total = BEATS_DATA.length;
          const step = 1 / total;
          const start = index * step;
          const end = index === total - 1 ? 1 : start + step - 0.01;
          
          return (
            <Beat 
              key={index}
              id={beat.title.toLowerCase().replace(/ /g, '-')}
              progress={smoothProgress}
              range={[start === 0 ? 0 : start, end]}
              title={beat.title}
              subtitle={beat.subtitle}
              align={index % 2 === 0 ? 'left' : 'right'}
              isButton={beat.isButton}
              onClick={beat.isButton ? () => setIsModalOpen(true) : undefined}
            />
          );
        })}
      </div>
      
      <TrustedClients />
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

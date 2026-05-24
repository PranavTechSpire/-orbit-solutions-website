"use client";

import { motion, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_COUNT = 184;
const currentFrame = (index: number) => `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function OrbitalEcosystem({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!isMounted) break;
        const img = new Image();
        img.src = currentFrame(i);
        await new Promise((resolve) => {
          img.onload = () => {
            if (isMounted) setLoaded((prev) => prev + 1);
            resolve(null);
          };
          img.onerror = () => resolve(null); // handle missing gracefully
        });
        loadedImages.push(img);
      }
      if (isMounted) setImages(loadedImages);
    };
    loadImages();
    return () => { isMounted = false; };
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    
    const img = images[frameIndex];
    if (!img) return;
    
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Use Math.max for "cover" effect
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    context.drawImage(img, 0, 0, img.width, img.height,
                       centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  }, [images]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        drawFrame(Math.min(FRAME_COUNT - 1, Math.floor(smoothProgress.get() * FRAME_COUNT)));
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Draw initial frame
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawFrame, smoothProgress]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
    requestAnimationFrame(() => {
      drawFrame(frameIndex);
    });
  });

  // Radii for rings
  const [radii, setRadii] = useState({ r1: 200, r2: 350, r3: 500 });
  
  useEffect(() => {
    const updateRadii = () => {
      if (window.innerWidth < 768) {
        setRadii({ r1: 120, r2: 200, r3: 280 });
      } else {
        setRadii({ r1: 200, r2: 350, r3: 500 });
      }
    };
    updateRadii();
    window.addEventListener('resize', updateRadii);
    return () => window.removeEventListener('resize', updateRadii);
  }, []);

  // Angles mapped to scroll
  const angle1 = useTransform(smoothProgress, [0, 1], [0, Math.PI * 4]);
  const angle2 = useTransform(smoothProgress, [0, 1], [0, -Math.PI * 2]);
  const angle3 = useTransform(smoothProgress, [0, 1], [Math.PI, Math.PI * 5]);
  
  const x1_1 = useTransform(angle1, a => radii.r1 * Math.cos(a));
  const y1_1 = useTransform(angle1, a => radii.r1 * Math.sin(a));
  
  const x1_2 = useTransform(angle1, a => radii.r1 * Math.cos(a + Math.PI));
  const y1_2 = useTransform(angle1, a => radii.r1 * Math.sin(a + Math.PI));

  const x2_1 = useTransform(angle2, a => radii.r2 * Math.cos(a));
  const y2_1 = useTransform(angle2, a => radii.r2 * Math.sin(a));
  
  const x2_2 = useTransform(angle2, a => radii.r2 * Math.cos(a + Math.PI * 0.66));
  const y2_2 = useTransform(angle2, a => radii.r2 * Math.sin(a + Math.PI * 0.66));
  
  const x2_3 = useTransform(angle2, a => radii.r2 * Math.cos(a + Math.PI * 1.33));
  const y2_3 = useTransform(angle2, a => radii.r2 * Math.sin(a + Math.PI * 1.33));

  const x3_1 = useTransform(angle3, a => radii.r3 * Math.cos(a));
  const y3_1 = useTransform(angle3, a => radii.r3 * Math.sin(a));
  
  const x3_2 = useTransform(angle3, a => radii.r3 * Math.cos(a + Math.PI));
  const y3_2 = useTransform(angle3, a => radii.r3 * Math.sin(a + Math.PI));

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  if (loaded < FRAME_COUNT) {
    return (
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#080a10] z-0">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin glow-ring-cyan"></div>
          <span className="text-cyan-400 font-mono text-xl">{Math.round((loaded / FRAME_COUNT) * 100)}%</span>
        </div>
        <p className="mt-8 text-white/50 tracking-widest text-sm uppercase">Initializing Core sequence...</p>
      </div>
    );
  }

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#080a10]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full [filter:brightness(0.8)_contrast(1.3)_saturate(1.1)]" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#080a10_90%)]"></div>
      {/* Scroll indicator fades out */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 flex flex-col items-center z-50"
      >
        <span className="text-cyan-400/80 tracking-widest text-xs uppercase mb-3">Scroll to Initialize</span>
        <div className="w-px h-16 bg-gradient-to-b from-cyan-400/80 to-transparent"></div>
      </motion.div>

      {/* Orbital Rings */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div style={{ width: radii.r1 * 2, height: radii.r1 * 2 }} className="absolute rounded-full border border-violet-500/20 border-dashed glow-ring-violet" />
        <div style={{ width: radii.r2 * 2, height: radii.r2 * 2 }} className="absolute rounded-full border border-cyan-500/20 glow-ring-cyan" />
        <div style={{ width: radii.r3 * 2, height: radii.r3 * 2 }} className="absolute rounded-full border border-white/5 border-dashed" />
        
        {/* Nodes */}
        <motion.div style={{ x: x1_1, y: y1_1 }} className="absolute w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_15px_#8b5cf6]" />
        <motion.div style={{ x: x1_2, y: y1_2 }} className="absolute w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_15px_#8b5cf6]" />
        
        <motion.div style={{ x: x2_1, y: y2_1 }} className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#06b6d4]" />
        <motion.div style={{ x: x2_2, y: y2_2 }} className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#06b6d4]" />
        <motion.div style={{ x: x2_3, y: y2_3 }} className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#06b6d4]" />
        
        <motion.div style={{ x: x3_1, y: y3_1 }} className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
        <motion.div style={{ x: x3_2, y: y3_2 }} className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
      </div>
    </div>
  );
}

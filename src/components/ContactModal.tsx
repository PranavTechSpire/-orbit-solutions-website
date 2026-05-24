"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel w-full max-w-2xl p-6 md:p-8 relative z-10 max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 glow-text-cyan">Start Your Project</h3>
            <p className="text-blue-100/60 mb-6">Tell us about your project and we&apos;ll get back to you shortly.</p>
            
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Email *</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Phone</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Company</label>
                  <input type="text" placeholder="Your Company" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Service Required *</label>
                  <select className="w-full bg-[#080a10] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" required>
                    <option value="">Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="graphics">Graphics Designing</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="whatsapp">WhatsApp Automation</option>
                    <option value="enterprise">Enterprise Softwares</option>
                    <option value="ai">AI Assistants</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">Budget Range</label>
                  <select className="w-full bg-[#080a10] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors">
                    <option value="">Select budget</option>
                    <option value="under5k">Under ₹5,000</option>
                    <option value="5k-15k">₹5,000 - ₹15,000</option>
                    <option value="15k-50k">₹15,000 - ₹50,000</option>
                    <option value="50k+">₹50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-cyan-400 mb-1">Expected Timeline</label>
                <input type="text" placeholder="e.g. 2 months" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-cyan-400 mb-1">Project Description *</label>
                <textarea rows={4} placeholder="Describe your project idea, goals, and any specific requirements..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors resize-none" required></textarea>
              </div>

              <button type="submit" className="w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 rounded-lg text-cyan-50 font-bold tracking-widest uppercase transition-all glow-ring-cyan mt-4">
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

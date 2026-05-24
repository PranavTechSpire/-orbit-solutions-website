import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#05060a] border-t border-white/10 pt-24 pb-12 z-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/favicon.ico" 
                alt="Orbit Solutions" 
                className="h-12 md:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-white/50 font-light leading-relaxed mb-8 pr-4">
              Transforming ideas into powerful products. We combine creativity, technology, and strategy to drive meaningful results for your business.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="mailto:support.orbitservices@gmail.com" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-8">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Apps', 'Graphics Designing', 'Digital Marketing', 'WhatsApp Auto', 'Enterprise Softwares', 'AI Assistants'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-cyan-400 font-light flex items-center gap-2 group transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Why Choose Us', 'Our Process', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-cyan-400 font-light flex items-center gap-2 group transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li>
                <span className="block text-white/30 text-xs mb-1 uppercase tracking-widest font-bold">Email</span>
                <a href="mailto:contact@orbitsolutions.com" className="text-white/70 hover:text-cyan-400 font-light transition-colors text-lg">contact@orbitsolutions.com</a>
              </li>
              <li>
                <span className="block text-white/30 text-xs mb-1 uppercase tracking-widest font-bold">Phone</span>
                <span className="text-white/70 font-light text-lg">+91 98765 43210</span>
              </li>
              <li>
                <span className="block text-white/30 text-xs mb-1 uppercase tracking-widest font-bold">Location</span>
                <span className="text-white/70 font-light leading-relaxed">
                  Tech Park Hub, Innovation Block<br />
                  Cyber City, 10001
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-sm font-light">
            © {new Date().getFullYear()} Orbit Solutions. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 hover:text-white/70 text-sm font-light transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/70 text-sm font-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

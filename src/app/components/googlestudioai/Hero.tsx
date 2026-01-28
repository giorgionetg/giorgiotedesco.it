'use client';
import React from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Download } from 'lucide-react';

interface HeroProps {
  onBookCall: () => void;
  onDownloadCV: () => void;
}
// Engineering <span className="text-brand-blue">Resilient</span> Digital Products.
const HeroTitle = () => {
  return (
    <>
      <span>Senior Full-Stack </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">Architect</span>
      <span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">Tech Lead</span></span>
    </>
  );
};

const heroData = {
  title: <HeroTitle />,
  subtitle: "I'm Giorgio Tedesco, I design and lead scalable web platforms: frontend architectures, APIs, authentication systems, and cloud-native infrastructures.",
  skills: "React, Next.js, TypeScript, Node.js, Docker, Kubernetes. Building scalable full-stack platforms.",
}



const Hero: React.FC<HeroProps> = ({ onBookCall, onDownloadCV }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] max-w-none h-[600px] bg-sky-100/70 rounded-[100%] blur-[80px] -z-10 pointer-events-none opacity-80" />
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-ice-50/50 backdrop-blur-sm border border-ice-300 text-slate-600 text-sm font-medium tracking-wide">
            Based in Italy • Working Worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            {heroData.title}
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <p className="mt-4 text-sm text-slate-500 max-w-2xl mb-12 mx-auto leading-relaxed">
            {heroData.skills}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onBookCall} className="btn bg-brand-blue hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform border-none min-w-[180px] btn-lg">
              Book a Call <ArrowRight size={20} />
            </button>
            <a
              href="/download/giorgio-tedesco-resume.pdf"
              target="_blank"
              download
              onClick={onDownloadCV}
              className="btn btn-outline btn-lg hover:bg-ice-50/50 hover:text-brand-blue hover:border-brand-blue text-slate-700 min-w-[180px] bg-white/50 backdrop-blur-sm"
            >
              <Download size={20} /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
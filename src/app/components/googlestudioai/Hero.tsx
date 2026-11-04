'use client';
import React from 'react';
import { Download } from 'lucide-react';
import { siteRole } from '@/app/lib/site-role';
// Engineering <span className="text-brand-blue">Resilient</span> Digital Products.
const HeroTitle = () => {
  return (
    <span>{siteRole}</span>
  );
};

const heroData = {
  title: <HeroTitle />,
  subtitle: 'I design and build scalable and robust web platforms, from frontend and APIs to authentication and cloud infrastructure.',
  skills: 'React · Next.js · TypeScript · Node.js · Docker · Kubernetes',
}



const Hero: React.FC = () => {
  return (
    <section className="relative md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] max-w-none h-[600px] bg-sky-100/70 rounded-[100%] blur-[80px] -z-10 pointer-events-none opacity-80" />
      <div className="container mx-auto px-6 pt-24 md:pt-32 pb-16 relative z-10 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-10 md:mb-12 px-4 py-1.5 rounded-full bg-ice-50/50 backdrop-blur-sm border border-ice-300 text-slate-600 text-sm font-medium tracking-wide">
            Based in Italy • Working Worldwide
          </div>
          <h1 className="whitespace-nowrap text-[clamp(1.75rem,8vw,2.5rem)] md:whitespace-normal md:text-7xl font-bold text-[#24354f] tracking-tight mb-4 md:mb-8 leading-tight">
            Giorgio Tedesco
          </h1>
          <h2 className="text-[clamp(1.375rem,6vw,2rem)] md:text-[3.375rem] font-semibold text-brand-blue tracking-tight mb-8 md:mb-12 leading-tight">
            {heroData.title}
          </h2>
          <p className="text-base md:text-xl italic text-slate-600 mb-5 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </p>
          <p className="text-sm text-slate-700 max-w-2xl mb-8 md:mb-12 mx-auto leading-relaxed">
            {heroData.skills}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="/download/giorgio-tedesco-resume.pdf"
              target="_blank"
              download
              className="btn btn-outline sm:btn-lg min-h-11 hover:bg-ice-50/50 hover:text-brand-blue hover:border-brand-blue text-slate-700 min-w-[140px] sm:min-w-[180px] bg-white/50"
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

'use client';

import { useState } from 'react';
import AboutMe from '@/app/components/googlestudioai/AboutMe';
import BookingModal from '@/app/components/googlestudioai/BookingModal';
import Hero from '@/app/components/googlestudioai/Hero';

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <>
    <Hero
      onBookCall={() => setIsModalOpen((isOpen) => !isOpen)}
      onDownloadCV={() => console.log('Download CV clicked')}
    />
    <AboutMe />
    <div className="w-full bg-slate-900 text-white py-12 overflow-hidden border-b border-slate-800">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <p className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-400">Technologies & Core Competencies</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-lg text-slate-300">
          {['React', 'TypeScript', 'Next.js', 'Node.js', 'Docker', 'CI/DI Pipelines', 'K8s Architecture'].map((technology) => (
            <span key={technology} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">{technology}</span>
          ))}
        </div>
      </div>
    </div>
    <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>;
}

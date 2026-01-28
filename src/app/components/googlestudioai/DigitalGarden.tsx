'use client';
/* ... (Rest of the content from previous version, just adding 'use client') ... */
import React, { useState } from 'react';
import { Sprout, Leaf, TreeDeciduous, Search, Filter, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import { GardenNote } from '../types';

const notes: GardenNote[] = [
  { id: '1', title: 'Atomic Design in 2024', topic: 'Architecture', status: 'Evergreen', preview: 'Is Atomic Design still relevant with modern component libraries?' },
  { id: '2', title: 'React Server Components', topic: 'React', status: 'Budding', preview: 'My initial experiments with Next.js 14 and RSC. The mental model shift is significant.' },
  { id: '3', title: 'State Machines for UI', topic: 'XState', status: 'Seed', preview: 'Why booleans are the root of all evil in complex forms.' }
];

const StatusIcon = ({ status }: { status: GardenNote['status'] }) => {
  switch (status) {
    case 'Seed': return <Sprout size={16} className="text-slate-400" />;
    case 'Budding': return <Leaf size={16} className="text-emerald-500" />;
    case 'Evergreen': return <TreeDeciduous size={16} className="text-emerald-700" />;
  }
};

const DigitalGarden: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<GardenNote | null>(null);

  if (selectedNote) {
    return (
      <div className="bg-white/95 min-h-screen animate-in fade-in duration-300 pb-20">
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
            <button onClick={() => setSelectedNote(null)} className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors font-medium text-sm">
              <ArrowLeft size={16} /> Back to Garden
            </button>
            <div className="flex items-center gap-2">
              <span className="badge bg-ice-50 border-ice-100 text-brand-blue text-xs font-semibold">{selectedNote.topic}</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12 max-w-7xl">
           <article className="max-w-3xl mx-auto prose prose-slate">
              <h1 className="text-4xl font-bold text-slate-900 mb-6">{selectedNote.title}</h1>
              <p>Living documents that evolve over time. This is a simulation of the content.</p>
           </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-20">
      <div className="bg-white/80 backdrop-blur-sm border-b border-ice-100 py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Digital Garden</h1>
          <p className="text-lg text-slate-600 max-w-2xl">A collection of evolving thoughts, snippets, and notes.</p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} onClick={() => setSelectedNote(note)} className="card bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-blue/30 transition-all duration-300 group cursor-pointer">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className="badge bg-ice-50 border-ice-100 text-brand-blue text-xs font-semibold">{note.topic}</div>
                  <div className="flex items-center gap-1.5 text-xs font-medium bg-slate-50 px-2 py-1 rounded-md">
                    <StatusIcon status={note.status} /> {note.status}
                  </div>
                </div>
                <h3 className="card-title text-xl font-bold text-slate-800 mb-2">{note.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{note.preview}</p>
                <div className="card-actions justify-end mt-auto">
                   <button className="text-sm font-medium text-slate-400 group-hover:text-brand-blue flex items-center gap-1">
                      Read Note <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalGarden;
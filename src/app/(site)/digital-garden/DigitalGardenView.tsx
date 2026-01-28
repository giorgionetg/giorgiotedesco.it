'use client';

import React, { useState, useMemo } from 'react';
import { Sprout, Leaf, TreeDeciduous, Search, Link as LinkIcon, Calendar, Hash, ArrowUpRight, BookOpen, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GardenNote } from '@/app/lib/types';

// Extended GardenNote type for internal use within the View
interface ExtendedGardenNote extends GardenNote {
    lastUpdated: string;
    tags: string[];
    links: string[]; // IDs of outgoing links
    backlinks: string[]; // IDs of incoming links
    content?: string; // Optional full content override
}

interface DigitalGardenViewProps {
    initialMarkdown: string;
}

// Mock Data Graph - In a real app this would likely come from props or a context
const NOTE_GRAPH: Record<string, ExtendedGardenNote> = {
    'home': {
        id: 'home',
        title: 'Digital Garden Main Entrance',
        topic: 'Meta',
        status: 'Evergreen',
        preview: 'Welcome to my digital garden.',
        lastUpdated: '2024-05-20',
        tags: ['meta', 'garden', 'welcome'],
        links: ['atomic-design', 'rsc'],
        backlinks: []
    },
    'atomic-design': {
        id: 'atomic-design',
        title: 'Atomic Design in 2024',
        topic: 'Architecture',
        status: 'Evergreen',
        preview: 'Is Atomic Design still relevant with modern component libraries?',
        lastUpdated: '2024-04-15',
        tags: ['architecture', 'design-systems', 'react'],
        links: [],
        backlinks: ['home']
    },
    'rsc': {
        id: 'rsc',
        title: 'React Server Components',
        topic: 'React',
        status: 'Budding',
        preview: 'My initial experiments with Next.js 14 and RSC.',
        lastUpdated: '2024-05-10',
        tags: ['react', 'nextjs', 'performance'],
        links: [],
        backlinks: ['home']
    },
    'state-machines': {
        id: 'state-machines',
        title: 'State Machines for UI',
        topic: 'XState',
        status: 'Seed',
        preview: 'Why booleans are the root of all evil in complex forms.',
        lastUpdated: '2024-05-18',
        tags: ['state-management', 'xstate', 'c-sharp'],
        links: [],
        backlinks: []
    }
};

const StatusBadge = ({ status }: { status: GardenNote['status'] }) => {
    switch (status) {
        case 'Seed': return <span className="flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-full"><Sprout size={12} /> Seed</span>;
        case 'Budding': return <span className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full border border-emerald-100"><Leaf size={12} /> Budding</span>;
        case 'Evergreen': return <span className="flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full border border-emerald-200"><TreeDeciduous size={12} /> Evergreen</span>;
        default: return null;
    }
};

export default function DigitalGardenView({ initialMarkdown }: DigitalGardenViewProps) {
    const [activeNoteId, setActiveNoteId] = useState<string>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Derived state
    const activeNote = NOTE_GRAPH[activeNoteId] || NOTE_GRAPH['home'];

    const filteredNotes = useMemo(() => {
        return Object.values(NOTE_GRAPH).filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    const navigateTo = (noteId: string) => {
        setActiveNoteId(noteId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="min-h-screen text-slate-800 bg-transparent"> {/* Transparent to show body grid at top */}

                {/* GARDEN HERO SECTION (Transparent) */}
                <div className="relative w-full bg-transparent py-16 md:py-20">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10 py-16 md:py-20">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4 text-brand-blue font-mono text-xs font-bold uppercase tracking-widest">
                                <span className="w-6 h-[2px] bg-brand-blue"></span>
                                <span>Work In Progress</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 tracking-tight mb-6">
                                Digital Garden<span className="text-brand-blue">.</span>
                            </h1>
                            <p className="text-xl text-slate-600 font-light max-w-2xl leading-relaxed">
                                A public notebook where I cultivate ideas, document technical challenges, and grow my understanding of the web.
                                <span className="block mt-2 text-sm text-slate-400 italic">Not a blog. These notes are living documents.</span>
                            </p>
                        </div>
                    </div>

                    {/* Top Navigation Bar (Garden Specific - Sticky) MOVED BELOW HERO */}
                    <div className="sticky top-20 z-30 bg-[#fcfcfc]/90 backdrop-blur-md border-b border-slate-200 h-14 flex items-center transition-all duration-300 shadow-sm">
                        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
                            <div className="flex items-center gap-2 text-slate-500">
                                <BookOpen size={18} />
                                <span className="font-semibold text-sm tracking-wide uppercase">Giorgio's Brain Dump</span>
                            </div>

                            <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <Search size={14} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* FULL WIDTH CONTENT SECTION (White Background) */}
                    <div className="w-full bg-white min-h-[60vh]">
                        <div className="container mx-auto px-4 max-w-7xl py-12">
                            <div className="grid lg:grid-cols-12 gap-12">

                                {/* MAIN CONTENT AREA (Left/Center) */}
                                <main className="lg:col-span-8">
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">

                                        {/* Note Header */}
                                        <div className="mb-8 border-b border-slate-100 pb-6">
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <StatusBadge status={activeNote.status} />
                                                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 px-2 rounded-md">
                                                    <Calendar size={12} /> {activeNote.lastUpdated}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight font-serif">
                                                {activeNote.title}
                                            </h2>
                                            <div className="flex gap-2">
                                                {activeNote.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-bold text-brand-blue bg-blue-50/80 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer transition-colors border border-blue-100">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Note Body */}
                                        <article className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-code:text-brand-orange prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded max-w-none font-serif">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {activeNoteId === 'home' ? initialMarkdown : (activeNote.content || activeNote.preview)}
                                            </ReactMarkdown>
                                        </article>

                                        {/* "Logseq Style" Linked References Section (Bottom of note) 
                                        <div className="mt-16 pt-8 border-t-2 border-slate-100 border-dashed">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                                <LinkIcon size={14} /> Linked References
                                            </h3>
                                            {activeNote.backlinks.length > 0 ? (
                                                <div className="space-y-4">
                                                    {activeNote.backlinks.map(linkId => {
                                                        const linkedNote = NOTE_GRAPH[linkId];
                                                        if (!linkedNote) return null;
                                                        return (
                                                            <div
                                                                key={linkId}
                                                                onClick={() => navigateTo(linkId)}
                                                                className="group bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-brand-blue/30 p-4 rounded-lg cursor-pointer transition-all shadow-sm"
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="font-bold text-brand-blue text-sm group-hover:underline">{linkedNote.title}</span>
                                                                    <ArrowUpRight size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <p className="text-xs text-slate-500 line-clamp-2">
                                                                    Referenced within the context of {linkedNote.tags[0]}...
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-400 italic">No linked references found for this note yet.</p>
                                            )}
                                        </div>*/}

                                    </div>
                                </main>

                                {/* SIDEBAR (The "Shoulder" / Context) */}
                                <aside className="lg:col-span-4 space-y-8">

                                    {/* Quick Explorer / Search Results */}
                                    <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                                            <Hash size={14} /> Explorer
                                        </h4>
                                        <ul className="space-y-1">
                                            {filteredNotes.length > 0 ? filteredNotes.map(note => (
                                                <li key={note.id}>
                                                    <button
                                                        onClick={() => navigateTo(note.id)}
                                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center group ${activeNoteId === note.id ? 'bg-white shadow-sm font-semibold text-slate-900 border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        <span className="truncate">{note.title}</span>
                                                        {activeNoteId === note.id && <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>}
                                                    </button>
                                                </li>
                                            )) : (
                                                <li className="text-sm text-slate-400 px-3">No notes found.</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Knowledge Graph / Connections (Simulated) */}
                                    <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                                            <Share2 size={14} /> Connections
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Outgoing links */}
                                            {activeNote.links.map(linkId => (
                                                <button
                                                    key={linkId}
                                                    onClick={() => navigateTo(linkId)}
                                                    className="btn btn-xs btn-outline border-slate-200 text-slate-600 font-normal hover:bg-brand-blue hover:text-white hover:border-brand-blue bg-white"
                                                >
                                                    {NOTE_GRAPH[linkId]?.title} &rarr;
                                                </button>
                                            ))}
                                            {/* Incoming links that aren't already listed as outgoing */}
                                            {activeNote.backlinks.filter(id => !activeNote.links.includes(id)).map(linkId => (
                                                <button
                                                    key={linkId}
                                                    onClick={() => navigateTo(linkId)}
                                                    className="btn btn-xs btn-outline border-slate-200 text-slate-600 font-normal hover:bg-brand-orange hover:text-white hover:border-brand-orange bg-white"
                                                >
                                                    &larr; {NOTE_GRAPH[linkId]?.title}
                                                </button>
                                            ))}
                                            {activeNote.links.length === 0 && activeNote.backlinks.length === 0 && (
                                                <span className="text-xs text-slate-400 italic">Orphan note (No connections)</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sticky Project CTA */}
                                    <div className="sticky top-46">
                                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>

                                            <h4 className="font-bold text-lg mb-2 relative z-10">Need a Senior Engineer?</h4>
                                            <p className="text-slate-300 text-xs mb-6 relative z-10 leading-relaxed">
                                                I turn these chaotic thoughts into structured, production-grade code for your business.
                                            </p>

                                            <div className="flex flex-col gap-3 relative z-10">
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="btn btn-sm bg-white text-slate-900 border-none hover:bg-ice-50 font-bold w-full"
                                                >
                                                    Book a Call
                                                </button>
                                                <button className="btn btn-sm btn-outline text-white hover:bg-white/10 w-full">
                                                    Download CV
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </aside>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

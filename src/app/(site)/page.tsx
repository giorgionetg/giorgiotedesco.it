'use client';

import AboutMe from "@/app/components/googlestudioai/AboutMe";
import BookingModal from "@/app/components/googlestudioai/BookingModal";
import Hero from "@/app/components/googlestudioai/Hero";
import { useState } from "react";

import Link from "next/link";
import { ArrowRight, Layers, FileCode, Sprout } from "lucide-react";


export default function GStudio() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleBookCall = () => {
        setIsModalOpen(isModalOpen ? false : true);
    };

    const handleDownloadCV = () => {
        console.log('Download CV clicked');
    };

    const openBooking = () => setIsModalOpen(true);

    return (<>
        <Hero
            onBookCall={handleBookCall}
            onDownloadCV={handleDownloadCV}
        />
        <AboutMe />

        {/* Tech Stack Ticker */}
        <div className="w-full bg-slate-900 text-white py-12 overflow-hidden border-b border-slate-800">
            <div className="container mx-auto px-6 text-center max-w-7xl">
                <p className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-400">Technologies & Core Competencies</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-lg text-slate-300">
                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">React</span>
                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">TypeScript</span>
                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">Next.js</span>
                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">Node.js</span>

                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">Docker</span>

                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">CI/DI Pipelines</span>
                    <span className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors cursor-default">K8s Architecture</span>
                </div>
            </div>
        </div>

        {/* Home Teasers - Updated to use Link 
        <div className="pt-24 pb-40 bg-transparent border-t border-slate-200/60">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Latest Updates</h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <Link href="/cases" className="card bg-white border border-slate-200 hover:border-brand-blue hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col h-full">
                        <div className="card-body p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                    <Layers size={20} />
                                </div>
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-widest">Portfolio</div>
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">Selected Works</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Explore complex problems solved for FinTech and Logistics clients through rigorous engineering.
                            </p>
                            <div className="mt-auto flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">FinTech</span>
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">Logistics</span>
                            </div>
                            <span className="text-sm font-bold text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Projects <ArrowRight size={14} />
                            </span>
                        </div>
                    </Link>

                    <Link href="/blog" className="card bg-white border border-slate-200 hover:border-brand-blue hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col h-full">
                        <div className="card-body p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                    <FileCode size={20} />
                                </div>
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-widest">Tech Insights</div>
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">Engineering Blog</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Deep dives into frontend architecture, performance patterns, and scalable engineering practices.
                            </p>
                            <div className="mt-auto flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">Architecture</span>
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">Performance</span>
                            </div>
                            <span className="text-sm font-bold text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Articles <ArrowRight size={14} />
                            </span>
                        </div>
                    </Link>

                    <Link href="/digital-garden" className="card bg-white border border-slate-200 hover:border-brand-blue hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col h-full">
                        <div className="card-body p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                    <Sprout size={20} />
                                </div>
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-widest">Living Docs</div>
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">Digital Garden</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                A collection of raw notes, snippets, and works in progress. Watch ideas grow over time.
                            </p>
                            <div className="mt-auto flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">Notes</span>
                                <span className="badge bg-ice-50 border-ice-100 text-slate-600 text-xs font-medium">Drafts</span>
                            </div>
                            <span className="text-sm font-bold text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                                Enter Garden <ArrowRight size={14} />
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>*/}

        <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>);
}
